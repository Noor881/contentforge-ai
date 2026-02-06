import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
    try {
        await requireAdmin()

        const { searchParams } = new URL(req.url)
        const search = searchParams.get('search') || ''
        const status = searchParams.get('status') || 'all'
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')

        const skip = (page - 1) * limit

        const where: any = {}

        if (search) {
            where.OR = [
                { email: { contains: search, mode: 'insensitive' } },
                { name: { contains: search, mode: 'insensitive' } },
            ]
        }

        if (status === 'flagged') {
            where.isFlagged = true
        } else if (status === 'blocked') {
            where.isBlocked = true
        } else if (status === 'trial') {
            where.isTrialActive = true
        } else if (status === 'paid') {
            where.subscriptionStatus = 'active'
        }

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    createdAt: true,
                    isTrialActive: true,
                    subscriptionStatus: true,
                    subscriptionTier: true,
                    totalGenerationCount: true,
                    monthlyUsageCount: true,
                    signupIp: true,
                    lastIp: true,
                    isBlocked: true,
                    blockReason: true,
                    isFlagged: true,
                    flagReason: true,
                    riskScore: true,
                    isAdmin: true,
                },
            }),
            prisma.user.count({ where }),
        ])

        return NextResponse.json({
            users,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch users' },
            { status: 500 }
        )
    }
}
