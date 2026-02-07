import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function DELETE(req: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Delete user and all related data (cascades handle relations)
        await prisma.user.delete({
            where: { id: session.user.id },
        })

        return NextResponse.json({ message: 'Account deleted successfully' })
    } catch (error) {
        console.error('Delete account error:', error)
        return NextResponse.json(
            { error: 'Failed to delete account' },
            { status: 500 }
        )
    }
}
