import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { type, title, content, prompt, metadata } = await req.json()

        const savedContent = await prisma.content.create({
            data: {
                userId: session.user.id,
                type,
                title,
                content,
                prompt,
                metadata: metadata || {},
            },
        })

        return NextResponse.json(savedContent)
    } catch (error) {
        console.error('Save content error:', error)
        return NextResponse.json(
            { error: 'Failed to save content' },
            { status: 500 }
        )
    }
}
