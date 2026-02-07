import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        await requireAdmin()

        const [messages, newsletters, totalMessages, unreadMessages, totalSubscribers, activeSubscribers] = await Promise.all([
            prisma.contactMessage.findMany({
                orderBy: { createdAt: 'desc' },
                take: 200,
            }),
            prisma.newsletter.findMany({
                orderBy: { createdAt: 'desc' },
            }),
            prisma.contactMessage.count(),
            prisma.contactMessage.count({ where: { isRead: false } }),
            prisma.newsletter.count(),
            prisma.newsletter.count({ where: { isActive: true } }),
        ])

        return NextResponse.json({
            messages,
            newsletters,
            stats: { totalMessages, unreadMessages, totalSubscribers, activeSubscribers },
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 })
    }
}
