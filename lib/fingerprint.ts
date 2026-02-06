import { prisma } from './db'
import crypto from 'crypto'

/**
 * Hash a fingerprint for secure storage
 */
export function hashFingerprint(fingerprint: string): string {
    return crypto.createHash('sha256').update(fingerprint).digest('hex')
}

/**
 * Check if a fingerprint has been used before
 * Returns all user IDs associated with this fingerprint
 */
export async function checkFingerprintHistory(fingerprint: string): Promise<{
    exists: boolean
    userIds: string[]
    accountCount: number
}> {
    const hashedFingerprint = hashFingerprint(fingerprint)

    // Find all users with this fingerprint
    const users = await prisma.user.findMany({
        where: {
            deviceFingerprint: hashedFingerprint,
        },
        select: {
            id: true,
            email: true,
            createdAt: true,
        },
    })

    return {
        exists: users.length > 0,
        userIds: users.map(u => u.id),
        accountCount: users.length,
    }
}

/**
 * Store fingerprint for a user
 */
export async function storeFingerprint(userId: string, fingerprint: string): Promise<void> {
    const hashedFingerprint = hashFingerprint(fingerprint)

    await prisma.user.update({
        where: { id: userId },
        data: {
            deviceFingerprint: hashedFingerprint,
            // Append to fingerprint history
            fingerprintHistory: {
                push: {
                    fingerprint: hashedFingerprint,
                    timestamp: new Date().toISOString(),
                },
            },
        },
    })
}

/**
 * Check if fingerprint matches stored value
 */
export async function validateFingerprint(userId: string, fingerprint: string): Promise<boolean> {
    const hashedFingerprint = hashFingerprint(fingerprint)

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { deviceFingerprint: true },
    })

    if (!user) return false

    return user.deviceFingerprint === hashedFingerprint
}

/**
 * Detect if same fingerprint is used across multiple IPs (VPN switching)
 */
export async function detectVpnSwitching(fingerprint: string, currentIp: string): Promise<{
    isSuspicious: boolean
    ipCount: number
    details: string
}> {
    const hashedFingerprint = hashFingerprint(fingerprint)

    // Get all users with this fingerprint
    const users = await prisma.user.findMany({
        where: {
            deviceFingerprint: hashedFingerprint,
        },
        select: {
            signupIp: true,
            lastIp: true,
        },
    })

    // Collect unique IPs
    const uniqueIps = new Set<string>()
    users.forEach(user => {
        if (user.signupIp) uniqueIps.add(user.signupIp)
        if (user.lastIp) uniqueIps.add(user.lastIp)
    })

    // Add current IP
    uniqueIps.add(currentIp)

    // If same fingerprint used from 3+ different IPs, highly suspicious
    const ipCount = uniqueIps.size
    const isSuspicious = ipCount >= 3

    return {
        isSuspicious,
        ipCount,
        details: isSuspicious
            ? `Same device detected from ${ipCount} different IP addresses (likely VPN switching)`
            : 'Normal activity',
    }
}

/**
 * Check fingerprint + IP combination for abuse
 */
export async function checkFingerprintSecurity(
    fingerprint: string,
    ip: string
): Promise<{
    allowed: boolean
    reason?: string
    riskScore: number
}> {
    const hashedFingerprint = hashFingerprint(fingerprint)

    // Check fingerprint history
    const history = await checkFingerprintHistory(fingerprint)

    // Check VPN switching
    const vpnCheck = await detectVpnSwitching(fingerprint, ip)

    // Calculate risk score
    let riskScore = 0

    // Multiple accounts from same fingerprint (30 points each)
    riskScore += history.accountCount * 30

    // VPN switching detected (50 points)
    if (vpnCheck.isSuspicious) {
        riskScore += 50
    }

    // Determine if allowed
    const allowed = riskScore < 60 // High risk threshold

    let reason: string | undefined
    if (!allowed) {
        if (history.accountCount > 1) {
            reason = 'Multiple accounts detected from this device. Free tier is limited to one account.'
        } else if (vpnCheck.isSuspicious) {
            reason = vpnCheck.details
        }
    }

    return {
        allowed,
        reason,
        riskScore,
    }
}
