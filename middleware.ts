import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export default NextAuth(authConfig).auth

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/create/:path*',
        '/library/:path*',
        '/settings/:path*',
        '/billing/:path*',
        '/subscription/:path*',
        '/login',
        '/signup',
    ],
}
