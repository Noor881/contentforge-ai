import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
    try {
        await requireAdmin()

        const { searchParams } = new URL(req.url)
        const search = searchParams.get('search') || ''
        const filter = searchParams.get('filter') || 'all'
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')

        const skip = (page - 1) * limit

        const where: any = {}

        // Search by email, name, IP, or fingerprint
        if (search) {
            where.OR = [
                { email: { contains: search, mode: 'insensitive' } },
                { name: { contains: search, mode: 'insensitive' } },
                { signupIp: { contains: search } },
                { lastIp: { contains: search } },
                { deviceFingerprint: { contains: search } },
            ]
        }

        // Filter conditions
        switch (filter) {
            case 'active':
                where.subscriptionStatus = 'active'
                break
            case 'trial':
                where.isTrialActive = true
                break
            case 'free':
                where.subscriptionTier = 'free'
                where.isTrialActive = false
                break
            case 'flagged':
                where.isFlagged = true
                break
            case 'blocked':
                where.isBlocked = true
                break
            case 'admin':
                where.isAdmin = true
                break
            case 'high-risk':
                where.riskScore = { gte: 50 }
                break
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
                    updatedAt: true,
                    isTrialActive: true,
                    trialEndDate: true,
                    subscriptionStatus: true,
                    subscriptionTier: true,
                    totalGenerationCount: true,
                    monthlyUsageCount: true,
                    signupIp: true,
                    lastIp: true,
                    deviceFingerprint: true,
                    isBlocked: true,
                    blockReason: true,
                    isFlagged: true,
                    flagReason: true,
                    riskScore: true,
                    isAdmin: true,
                    _count: {
                        select: { content: true },
                    },
                },
            }),
            prisma.user.count({ where }),
        ])

        return NextResponse.json({
            users,
            total,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        })
    } catch (error: any) {
        console.error('Admin users API error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to fetch users' },
            { status: error.message === 'Unauthorized' ? 401 : 500 }
        )
    }
}
