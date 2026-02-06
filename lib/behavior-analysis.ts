import { prisma } from './db'

/**
 * Calculate risk score for a user based on behavioral patterns
 */
export async function calculateRiskScore(userId: string): Promise<{
    score: number
    flags: string[]
    details: Record<string, any>
}> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            createdAt: true,
            signupIp: true,
            lastIp: true,
            deviceFingerprint: true,
            totalGenerationCount: true,
            monthlyUsageCount: true,
            subscriptionTier: true,
        },
    })

    if (!user) {
        throw new Error('User not found')
    }

    let score = 0
    const flags: string[] = []
    const details: Record<string, any> = {}

    // 1. Check for exhausted quotas (25 points)
    if (user.subscriptionTier === 'free' && user.totalGenerationCount >= 3) {
        score += 25
        flags.push('EXHAUSTED_QUOTA')
        details.exhaustedQuota = true
    }

    // 2. Check for rapid account creation (same fingerprint)
    if (user.deviceFingerprint) {
        const recentAccounts = await prisma.user.count({
            where: {
                deviceFingerprint: user.deviceFingerprint,
                createdAt: {
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
                },
            },
        })

        if (recentAccounts > 1) {
            score += recentAccounts * 25 // 25 points per additional account
            flags.push('RAPID_SIGNUP')
            details.recentAccountsFromDevice = recentAccounts
        }
    }

    // 3. Check for IP switching (20 points)
    if (user.signupIp && user.lastIp && user.signupIp !== user.lastIp) {
        score += 20
        flags.push('IP_SWITCH')
        details.ipSwitch = {
            signup: user.signupIp,
            last: user.lastIp,
        }
    }

    // 4. Check for matching fingerprints across multiple accounts (30 points)
    if (user.deviceFingerprint) {
        const matchingAccounts = await prisma.user.count({
            where: {
                deviceFingerprint: user.deviceFingerprint,
                id: { not: user.id },
            },
        })

        if (matchingAccounts > 0) {
            score += matchingAccounts * 30
            flags.push('DUPLICATE_DEVICE')
            details.matchingDevices = matchingAccounts
        }
    }

    return {
        score: Math.min(100, score), // Cap at 100
        flags,
        details,
    }
}

/**
 * Flag a user account for manual review
 */
export async function flagUserForReview(
    userId: string,
    reason: string,
    riskScore: number
): Promise<void> {
    await prisma.user.update({
        where: { id: userId },
        data: {
            isFlagged: true,
            flagReason: reason,
            riskScore,
        },
    })

    // Log suspicious activity
    await logSuspiciousActivity(userId, 'ACCOUNT_FLAGGED', {
        reason,
        riskScore,
    })
}

/**
 * Log suspicious activity
 */
export async function logSuspiciousActivity(
    userId: string | null,
    activityType: string,
    details: Record<string, any>
): Promise<void> {
    const { getClientIp } = await import('./ip-check')
    const ip = await getClientIp()

    const user = userId
        ? await prisma.user.findUnique({
            where: { id: userId },
            select: { deviceFingerprint: true },
        })
        : null

    await prisma.suspiciousActivity.create({
        data: {
            userId,
            fingerprint: user?.deviceFingerprint || 'unknown',
            ip,
            activityType,
            riskScore: details.riskScore || 0,
            details,
        },
    })
}

/**
 * Check if user should be auto-blocked based on risk score
 */
export async function shouldAutoBlock(userId: string): Promise<{
    shouldBlock: boolean
    reason?: string
}> {
    const { score, flags } = await calculateRiskScore(userId)

    // Auto-block thresholds
    const HIGH_RISK_THRESHOLD = 70

    if (score >= HIGH_RISK_THRESHOLD) {
        return {
            shouldBlock: true,
            reason: `High risk score (${score}). Flags: ${flags.join(', ')}`,
        }
    }

    return { shouldBlock: false }
}

/**
 * Detect patterns across multiple users
 */
export async function detectAbusePatterns(): Promise<{
    suspiciousFingerprints: string[]
    suspiciousIps: string[]
    rapidSignups: number
}> {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)

    // Find fingerprints used by 3+ accounts
    const fingerprintGroups = await prisma.user.groupBy({
        by: ['deviceFingerprint'],
        where: {
            deviceFingerprint: { not: null },
        },
        _count: {
            id: true,
        },
        having: {
            id: { _count: { gte: 3 } },
        },
    })

    const suspiciousFingerprints = fingerprintGroups.map(g => g.deviceFingerprint!)

    // Find IPs with rapid signups
    const ipGroups = await prisma.user.groupBy({
        by: ['signupIp'],
        where: {
            signupIp: { not: null },
            createdAt: { gte: last24Hours },
        },
        _count: {
            id: true,
        },
        having: {
            id: { _count: { gte: 3 } },
        },
    })

    const suspiciousIps = ipGroups.map(g => g.signupIp!)

    const rapidSignups = await prisma.user.count({
        where: {
            createdAt: { gte: last24Hours },
        },
    })

    return {
        suspiciousFingerprints,
        suspiciousIps,
        rapidSignups,
    }
}
