import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
    try {
        await requireAdmin()
        const { action } = await req.json()

        if (action === 'markAllRead') {
            await prisma.contactMessage.updateMany({
                where: { isRead: false },
                data: { isRead: true },
            })
            return NextResponse.json({ message: 'All messages marked as read' })
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to perform action' }, { status: 500 })
    }
}
