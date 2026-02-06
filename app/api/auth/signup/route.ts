import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { startTrial } from '@/lib/trial'
import { sendWelcomeEmail } from '@/lib/email'
import { getClientIp, checkIpLimit } from '@/lib/ip-check'

export async function POST(req: NextRequest) {
    try {
        const { email, password, name, fingerprint } = await req.json()

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        // Get client IP
        const ip = await getClientIp()

        // Check IP limit
        const ipCheck = await checkIpLimit(ip)
        if (!ipCheck.allowed) {
            return NextResponse.json(
                { error: ipCheck.reason },
                { status: 403 }
            )
        }

        // Check fingerprint security if provided
        if (fingerprint) {
            const { checkFingerprintSecurity } = await import('@/lib/fingerprint')
            const fpCheck = await checkFingerprintSecurity(fingerprint, ip)

            if (!fpCheck.allowed) {
                // Log suspicious activity
                const { logSuspiciousActivity } = await import('@/lib/behavior-analysis')
                await logSuspiciousActivity(null, 'SIGNUP_BLOCKED', {
                    reason: fpCheck.reason,
                    riskScore: fpCheck.riskScore,
                    fingerprint,
                    ip,
                })

                return NextResponse.json(
                    { error: fpCheck.reason || 'Account creation blocked due to security concerns.' },
                    { status: 403 }
                )
            }
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Calculate initial risk score based on fingerprint
        let initialRiskScore = 0
        if (fingerprint) {
            const { checkFingerprintHistory } = await import('@/lib/fingerprint')
            const history = await checkFingerprintHistory(fingerprint)
            initialRiskScore = history.accountCount * 30 // 30 points per existing account
        }

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                signupIp: ip,
                lastIp: ip,
                deviceFingerprint: fingerprint ? (await import('@/lib/fingerprint')).hashFingerprint(fingerprint) : null,
                fingerprintHistory: fingerprint ? [{
                    fingerprint: (await import('@/lib/fingerprint')).hashFingerprint(fingerprint),
                    timestamp: new Date().toISOString(),
                }] : [],
                riskScore: initialRiskScore,
                isFlagged: initialRiskScore >= 60, // Flag if medium/high risk
                flagReason: initialRiskScore >= 60 ? 'Multiple accounts detected from same device' : null,
            },
        })

        // Start trial
        await startTrial(user.id)

        // Send welcome email
        if (user.email && user.name) {
            await sendWelcomeEmail(user.email, user.name)
        }

        // Check if should auto-block
        if (initialRiskScore >= 70) {
            const { shouldAutoBlock, flagUserForReview } = await import('@/lib/behavior-analysis')
            const blockCheck = await shouldAutoBlock(user.id)

            if (blockCheck.shouldBlock) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        isBlocked: true,
                        blockReason: blockCheck.reason,
                    },
                })

                await flagUserForReview(user.id, blockCheck.reason!, initialRiskScore)

                return NextResponse.json(
                    { error: 'Account flagged for review. Please contact support.' },
                    { status: 403 }
                )
            }
        }

        return NextResponse.json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        })
    } catch (error) {
        console.error('Signup error:', error)
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        )
    }
}
