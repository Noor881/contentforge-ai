import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await params

        await prisma.content.delete({
            where: { id },
        })

        return NextResponse.json({ message: 'Content deleted successfully' })
    } catch (error: any) {
        console.error('Admin content delete error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to delete content' },
            { status: 500 }
        )
    }
}
