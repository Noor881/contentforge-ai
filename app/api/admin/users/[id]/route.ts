import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

interface RouteContext {
    params: {
        id: string
    }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
    try {
        await requireAdmin()

        const { id } = context.params
        const body = await req.json()

        const {
            isBlocked,
            blockReason,
            isFlagged,
            flagReason,
            subscriptionStatus,
            subscriptionTier,
            isAdmin,
            clearIpFlags,
        } = body

        const updateData: any = {}

        if (typeof isBlocked !== 'undefined') {
            updateData.isBlocked = isBlocked
            if (isBlocked && blockReason) {
                updateData.blockReason = blockReason
            } else if (!isBlocked) {
                updateData.blockReason = null
            }
        }

        if (typeof isFlagged !== 'undefined') {
            updateData.isFlagged = isFlagged
            if (isFlagged && flagReason) {
                updateData.flagReason = flagReason
            } else if (!isFlagged) {
                updateData.flagReason = null
                updateData.riskScore = 0
            }
        }

        if (subscriptionStatus) {
            updateData.subscriptionStatus = subscriptionStatus
        }

        if (subscriptionTier) {
            updateData.subscriptionTier = subscriptionTier
        }

        if (typeof isAdmin !== 'undefined') {
            updateData.isAdmin = isAdmin
        }

        if (clearIpFlags) {
            // Clear suspicious activity logs for this user
            await prisma.suspiciousActivity.deleteMany({
                where: { userId: id },
            })
            updateData.isFlagged = false
            updateData.flagReason = null
            updateData.riskScore = 0
        }

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
        })

        return NextResponse.json({ user })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to update user' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
    try {
        await requireAdmin()

        const { id } = context.params

        await prisma.user.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to delete user' },
            { status: 500 }
        )
    }
}
