import { prisma } from './db'
import { addMonths } from 'date-fns'

const FREE_TIER_LIMIT = parseInt(process.env.FREE_TIER_LIMIT || '3', 10)
const PRO_TIER_LIMIT = parseInt(process.env.PRO_TIER_LIMIT || '100', 10)
const ENTERPRISE_TIER_LIMIT = parseInt(process.env.ENTERPRISE_TIER_LIMIT || '1000', 10)

export async function trackUsage(userId: string, type: string, details?: any) {
    // Log the usage
    await prisma.usageLog.create({
        data: {
            userId,
            type,
            details: details || {},
        },
    })

    // Increment monthly usage count
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            monthlyUsageCount: true,
            usageResetDate: true,
        },
    })

    if (!user) {
        throw new Error('User not found')
    }

    // Check if we need to reset the monthly count
    const now = new Date()
    const resetDate = user.usageResetDate ? new Date(user.usageResetDate) : null

    if (!resetDate || now > resetDate) {
        // Reset usage count
        await prisma.user.update({
            where: { id: userId },
            data: {
                monthlyUsageCount: 1,
                totalGenerationCount: { increment: 1 },
                usageResetDate: addMonths(now, 1),
            },
        })
        return 1
    } else {
        // Increment usage count
        const newCount = user.monthlyUsageCount + 1
        await prisma.user.update({
            where: { id: userId },
            data: {
                monthlyUsageCount: newCount,
                totalGenerationCount: { increment: 1 },
            },
        })
        return newCount
    }
}

export async function checkUsageLimit(userId: string): Promise<{
    canUse: boolean
    currentUsage: number
    limit: number
    tier: string
}> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            monthlyUsageCount: true,
            totalGenerationCount: true,
            subscriptionTier: true,
            usageResetDate: true,
        },
    })

    if (!user) {
        throw new Error('User not found')
    }

    // Check if we need to reset the monthly count
    const now = new Date()
    const resetDate = user.usageResetDate ? new Date(user.usageResetDate) : null

    let currentUsage = user.monthlyUsageCount

    if (!resetDate || now > resetDate) {
        currentUsage = 0
    }

    // Get the limit based on tier
    let limit: number
    let usageToCheck = currentUsage

    switch (user.subscriptionTier) {
        case 'pro':
            limit = PRO_TIER_LIMIT
            break
        case 'enterprise':
            limit = ENTERPRISE_TIER_LIMIT
            break
        case 'free':
        default:
            limit = FREE_TIER_LIMIT
            // For free tier, we check total lifetime generations
            usageToCheck = user.totalGenerationCount
            break
    }

    return {
        canUse: usageToCheck < limit,
        currentUsage: usageToCheck,
        limit,
        tier: user.subscriptionTier,
    }
}

export async function getUsageStats(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            monthlyUsageCount: true,
            subscriptionTier: true,
            usageResetDate: true,
        },
    })

    if (!user) {
        throw new Error('User not found')
    }

    let limit: number
    switch (user.subscriptionTier) {
        case 'pro':
            limit = PRO_TIER_LIMIT
            break
        case 'enterprise':
            limit = ENTERPRISE_TIER_LIMIT
            break
        case 'free':
        default:
            limit = FREE_TIER_LIMIT
            break
    }

    const percentage = Math.min(100, Math.round((user.monthlyUsageCount / limit) * 100))

    return {
        current: user.monthlyUsageCount,
        limit,
        percentage,
        resetDate: user.usageResetDate,
        tier: user.subscriptionTier,
    }
}
