import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            )
        }

        // Check if already subscribed
        const existing = await prisma.newsletter.findUnique({
            where: { email },
        })

        if (existing) {
            if (existing.isActive) {
                return NextResponse.json(
                    { error: 'Already subscribed' },
                    { status: 400 }
                )
            } else {
                // Reactivate subscription
                await prisma.newsletter.update({
                    where: { email },
                    data: { isActive: true },
                })
                return NextResponse.json({ message: 'Subscription reactivated' })
            }
        }

        // Create new subscription
        await prisma.newsletter.create({
            data: { email },
        })

        return NextResponse.json({ message: 'Successfully subscribed' })
    } catch (error) {
        console.error('Newsletter subscription error:', error)
        return NextResponse.json(
            { error: 'Failed to subscribe' },
            { status: 500 }
        )
    }
}
