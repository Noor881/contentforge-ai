import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await params
        const { action } = await req.json()

        if (action === 'read') {
            await prisma.contactMessage.update({ where: { id }, data: { isRead: true } })
        } else if (action === 'unread') {
            await prisma.contactMessage.update({ where: { id }, data: { isRead: false } })
        }

        return NextResponse.json({ message: 'Updated successfully' })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update message' }, { status: 500 })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await params

        await prisma.contactMessage.delete({ where: { id } })

        return NextResponse.json({ message: 'Message deleted' })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to delete message' }, { status: 500 })
    }
}
