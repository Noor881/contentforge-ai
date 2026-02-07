import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
    try {
        await requireAdmin()
        const { email } = await req.json()

        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { error: 'Email address is required' },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        })

        if (!user) {
            return NextResponse.json(
                { error: `No user found with email: ${email}` },
                { status: 404 }
            )
        }

        if (user.isAdmin) {
            return NextResponse.json(
                { error: 'This user is already an admin' },
                { status: 400 }
            )
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { isAdmin: true },
        })

        return NextResponse.json({
            message: `${user.name || user.email} has been promoted to admin`,
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to promote user' },
            { status: 500 }
        )
    }
}
