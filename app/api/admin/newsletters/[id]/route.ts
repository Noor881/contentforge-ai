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

        if (action === 'activate') {
            await prisma.newsletter.update({ where: { id }, data: { isActive: true } })
        } else if (action === 'deactivate') {
            await prisma.newsletter.update({ where: { id }, data: { isActive: false } })
        }

        return NextResponse.json({ message: 'Updated successfully' })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update subscriber' }, { status: 500 })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await params

        await prisma.newsletter.delete({ where: { id } })

        return NextResponse.json({ message: 'Subscriber removed' })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to remove subscriber' }, { status: 500 })
    }
}
