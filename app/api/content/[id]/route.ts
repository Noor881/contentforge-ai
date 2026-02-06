import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Verify ownership
        const content = await prisma.content.findUnique({
            where: { id: params.id },
        })

        if (!content || content.userId !== session.user.id) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        await prisma.content.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Deleted successfully' })
    } catch (error) {
        console.error('Delete content error:', error)
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }
}
