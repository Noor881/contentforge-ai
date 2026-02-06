
import type { NextAuthConfig } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authConfig = {
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    trustHost: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') ||
                nextUrl.pathname.startsWith('/create') ||
                nextUrl.pathname.startsWith('/library') ||
                nextUrl.pathname.startsWith('/settings') ||
                nextUrl.pathname.startsWith('/billing') ||
                nextUrl.pathname.startsWith('/subscription')
            const isOnAdmin = nextUrl.pathname.startsWith('/admin')
            const isOnAuth = nextUrl.pathname.startsWith('/login') ||
                nextUrl.pathname.startsWith('/signup')

            // Protect admin routes - require login first
            if (isOnAdmin) {
                if (!isLoggedIn) {
                    return Response.redirect(new URL('/login', nextUrl))
                }
                // Admin check will be done at page level via requireAdmin()
                return true
            }

            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn && isOnAuth) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            return true
        },
        async jwt({ token, user }) {
            if (user?.id) {
                token.sub = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub!
            }
            return session
        }
    }
} satisfies NextAuthConfig
