import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const content = await prisma.content.findUnique({
            where: { id: params.id },
        })

        if (!content || content.userId !== session.user.id) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        return NextResponse.json(content)
    } catch (error) {
        console.error('Get content error:', error)
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const existingContent = await prisma.content.findUnique({
            where: { id: params.id },
        })

        if (!existingContent || existingContent.userId !== session.user.id) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        const body = await req.json()
        const updateData: any = {}

        if (typeof body.isFavorite === 'boolean') {
            updateData.isFavorite = body.isFavorite
        }

        if (typeof body.content === 'string') {
            updateData.content = body.content
        }

        if (typeof body.title === 'string') {
            updateData.title = body.title
        }

        const updated = await prisma.content.update({
            where: { id: params.id },
            data: updateData,
        })

        return NextResponse.json(updated)
    } catch (error) {
        console.error('Update content error:', error)
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

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
