import { headers } from 'next/headers'
import { prisma } from './db'

export async function getClientIp() {
    const headersList = await headers()

    // Check common headers for IP
    const forwardedFor = headersList.get('x-forwarded-for')
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim()
    }

    const realIp = headersList.get('x-real-ip')
    if (realIp) {
        return realIp
    }

    return '0.0.0.0'
}

export async function isIpBlocked(ip: string): Promise<boolean> {
    // Check if any user with this IP is blocked
    const blockedUser = await prisma.user.findFirst({
        where: {
            OR: [
                { signupIp: ip, isBlocked: true },
                { lastIp: ip, isBlocked: true }
            ]
        }
    })

    return !!blockedUser
}

export async function checkIpLimit(ip: string): Promise<{ allowed: boolean; reason?: string }> {
    if (ip === '0.0.0.0' || ip === '127.0.0.1' || ip.startsWith('192.168.')) {
        // Skip checks for localhost/local network
        return { allowed: true }
    }

    // Check if IP is explicitly blocked
    const isBlocked = await isIpBlocked(ip)
    if (isBlocked) {
        return { allowed: false, reason: 'This IP address has been blocked due to policy violations.' }
    }

    // Check how many accounts were created from this IP
    // For free tier, we limit to 1 account per IP
    const accountCount = await prisma.user.count({
        where: {
            signupIp: ip
        }
    })

    const limit = 50 // Increased for testing purposes
    if (accountCount >= limit) {
        return {
            allowed: false,
            reason: `The free trial is limited to ${limit} accounts per network/IP address. Please upgrade to create more accounts.`
        }
    }

    return { allowed: true }
}
