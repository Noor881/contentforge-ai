import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

interface RouteParams {
    params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        await requireAdmin()
        const { id } = await params

        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                content: {
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                },
                subscriptions: true,
                suspiciousActivities: {
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                },
                _count: {
                    select: { content: true },
                },
            },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json({ user })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch user' },
            { status: 500 }
        )
    }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
    try {
        await requireAdmin()
        const { id } = await params
        const body = await req.json()
        const { action, reason } = body

        let updateData: any = {}
        let message = ''

        switch (action) {
            case 'block':
                updateData = { isBlocked: true, blockReason: reason || 'Blocked by admin' }
                message = 'User blocked successfully'
                break
            case 'unblock':
                updateData = { isBlocked: false, blockReason: null }
                message = 'User unblocked successfully'
                break
            case 'flag':
                updateData = { isFlagged: true, flagReason: reason || 'Flagged by admin' }
                message = 'User flagged successfully'
                break
            case 'clearFlags':
                updateData = { isFlagged: false, flagReason: null, riskScore: 0 }
                message = 'User flags cleared'
                break
            case 'makeAdmin':
                updateData = { isAdmin: true }
                message = 'User promoted to admin'
                break
            case 'removeAdmin':
                updateData = { isAdmin: false }
                message = 'Admin privileges removed'
                break
            case 'resetUsage':
                updateData = { monthlyUsageCount: 0 }
                message = 'Monthly usage reset'
                break
            case 'updateTier':
                updateData = {
                    subscriptionTier: body.tier || 'free',
                    subscriptionStatus: body.tier === 'free' ? 'free' : 'active'
                }
                message = `Subscription updated to ${body.tier}`
                break
            case 'cancelSubscription':
                updateData = {
                    subscriptionStatus: 'cancelled',
                    subscriptionTier: 'free',
                    isTrialActive: false
                }
                message = 'Subscription cancelled'
                break
            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
        }

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
        })

        return NextResponse.json({ message, user })
    } catch (error: any) {
        console.error('Admin user update error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to update user' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
    try {
        await requireAdmin()
        const { id } = await params

        // Delete all related data first
        await prisma.$transaction([
            prisma.content.deleteMany({ where: { userId: id } }),
            prisma.subscription.deleteMany({ where: { userId: id } }),
            prisma.suspiciousActivity.deleteMany({ where: { userId: id } }),
            prisma.account.deleteMany({ where: { userId: id } }),
            prisma.session.deleteMany({ where: { userId: id } }),
            prisma.user.delete({ where: { id } }),
        ])

        return NextResponse.json({ message: 'User deleted successfully' })
    } catch (error: any) {
        console.error('Admin user delete error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to delete user' },
            { status: 500 }
        )
    }
}
