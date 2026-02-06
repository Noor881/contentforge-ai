import { auth } from '@/lib/auth'
import { prisma } from './db'
import { redirect } from 'next/navigation'

/**
 * Get the current user from the session
 */
export async function getCurrentUser() {
    const session = await auth()
    if (!session?.user?.email) {
        return null
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })

    return user
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
    const user = await getCurrentUser()
    return user?.isAdmin ?? false
}

/**
 * Require admin access or redirect to dashboard
 */
export async function requireAdmin() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    if (!user.isAdmin) {
        redirect('/dashboard')
    }

    return user
}

/**
 * Get admin stats for dashboard
 */
export async function getAdminStats() {
    const [
        totalUsers,
        activeTrialUsers,
        paidUsers,
        flaggedUsers,
        blockedUsers,
        totalContent,
        contentToday,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { isTrialActive: true } }),
        prisma.user.count({ where: { subscriptionStatus: 'active' } }),
        prisma.user.count({ where: { isFlagged: true } }),
        prisma.user.count({ where: { isBlocked: true } }),
        prisma.content.count(),
        prisma.content.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                },
            },
        }),
    ])

    return {
        totalUsers,
        activeTrialUsers,
        paidUsers,
        flaggedUsers,
        blockedUsers,
        totalContent,
        contentToday,
    }
}
