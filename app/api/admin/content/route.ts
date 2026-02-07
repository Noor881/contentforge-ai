import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        await requireAdmin()

        const [totalContent, contentByType, recentContent, contentToday] = await Promise.all([
            prisma.content.count(),
            prisma.content.groupBy({
                by: ['type'],
                _count: { type: true },
            }),
            prisma.content.findMany({
                take: 100,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { name: true, email: true } },
                },
            }),
            prisma.content.count({
                where: {
                    createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
                },
            }),
        ])

        return NextResponse.json({
            totalContent,
            contentByType,
            content: recentContent,
            contentToday,
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch content' },
            { status: 500 }
        )
    }
}
