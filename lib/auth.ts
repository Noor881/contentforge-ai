import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/db'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import bcrypt from 'bcryptjs'
import { startTrial } from '@/lib/trial'
import { sendWelcomeEmail } from '@/lib/email'

import { authConfig } from '@/auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        ...authConfig.callbacks,
        async signIn({ user, account, profile }) {
            try {
                // Get IP
                const { getClientIp, checkIpLimit } = await import('@/lib/ip-check')
                const ip = await getClientIp()

                // Check IP limit
                const { allowed, reason } = await checkIpLimit(ip)
                if (!allowed) {
                    console.log(`Blocked sign in from IP ${ip}: ${reason}`)
                    return false
                }

                if (account?.provider === 'google') {
                    // Check if this is a new user
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email! },
                    })

                    if (!existingUser) {
                        // New Google signup - fingerprint will be added in createUser event
                        // For now, just allow the sign-in (NextAuth creates the user)
                    }
                }
                return true
            } catch (error) {
                console.error('Sign in error:', error)
                return false
            }
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub!

                // Fetch fresh user data
                const user = await prisma.user.findUnique({
                    where: { id: token.sub! },
                    select: {
                        subscriptionStatus: true,
                        subscriptionTier: true,
                        isTrialActive: true,
                        trialEndDate: true,
                        totalGenerationCount: true,
                        isBlocked: true,
                        isFlagged: true,
                        riskScore: true,
                        isAdmin: true,
                    },
                })

                if (user) {
                    // Check if blocked
                    if (user.isBlocked) {
                        // User is blocked - they shouldn't be able to use the app
                        console.warn(`Blocked user ${token.sub} attempted to access`)
                    }

                    // Check if flagged with high risk
                    if (user.isFlagged && user.riskScore >= 70) {
                        console.warn(`High-risk user ${token.sub} (score: ${user.riskScore})`)
                    }

                    session.user.subscriptionStatus = user.subscriptionStatus
                    session.user.subscriptionTier = user.subscriptionTier
                    session.user.isTrialActive = user.isTrialActive
                    session.user.trialEndDate = user.trialEndDate
                    session.user.isAdmin = user.isAdmin ?? false
                }
            }
            return session
        },
        async jwt({ token, user }) {
            if (user?.id) {
                token.sub = user.id
            }
            return token
        },
    },
    events: {
        async createUser({ user }) {
            // New user created via Google OAuth - log IP and check fingerprint
            try {
                const { getClientIp } = await import('@/lib/ip-check')
                const ip = await getClientIp()

                // Initial update with IP
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        signupIp: ip,
                        lastIp: ip,
                    }
                })

                // Start trial
                await startTrial(user.id!)

                // Send welcome email
                if (user.email && user.name) {
                    await sendWelcomeEmail(user.email, user.name)
                }

                console.log('New user created with IP:', ip)

                // Note: Fingerprint will be added later via client-side capture
                // since NextAuth events don't have access to client request body
            } catch (e) {
                console.error('Error in createUser event:', e)
            }
        },
        async signIn({ user }) {
            // Update last IP on sign-in
            try {
                const { getClientIp } = await import('@/lib/ip-check')
                const ip = await getClientIp()

                await prisma.user.update({
                    where: { id: user.id },
                    data: { lastIp: ip }
                })

                // Check for suspicious IP switching
                const existingUser = await prisma.user.findUnique({
                    where: { id: user.id },
                    select: {
                        signupIp: true,
                        lastIp: true,
                        deviceFingerprint: true,
                        riskScore: true,
                    },
                })

                if (existingUser?.deviceFingerprint && existingUser.signupIp !== ip) {
                    // IP changed - check for VPN switching
                    const { detectVpnSwitching } = await import('@/lib/fingerprint')
                    const fpCheck = await detectVpnSwitching(existingUser.deviceFingerprint, ip)

                    if (fpCheck.isSuspicious) {
                        // Log suspicious activity
                        const { logSuspiciousActivity } = await import('@/lib/behavior-analysis')
                        await logSuspiciousActivity(user.id!, 'VPN_SWITCHING', {
                            details: fpCheck.details,
                            ipCount: fpCheck.ipCount,
                            previousIp: existingUser.signupIp,
                            currentIp: ip,
                        })

                        // Increase risk score
                        await prisma.user.update({
                            where: { id: user.id },
                            data: {
                                riskScore: Math.min(100, (existingUser.riskScore || 0) + 20),
                            },
                        })
                    }
                }
            } catch (e) {
                console.error('Error in signIn event:', e)
            }
        }
    },
})
