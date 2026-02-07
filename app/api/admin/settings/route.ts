import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
    try {
        await requireAdmin()

        const [admins, totalUsers, totalContent, adminCount] = await Promise.all([
            prisma.user.findMany({
                where: { isAdmin: true },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'asc' },
            }),
            prisma.user.count(),
            prisma.content.count(),
            prisma.user.count({ where: { isAdmin: true } }),
        ])

        return NextResponse.json({
            admins,
            stats: {
                totalUsers,
                totalContent,
                adminCount,
                databaseStatus: 'connected',
            },
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch settings' },
            { status: 500 }
        )
    }
}
