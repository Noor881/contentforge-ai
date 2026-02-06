import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(req: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id || !session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { tier } = await req.json()

        if (!['pro', 'enterprise'].includes(tier)) {
            return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
        }

        const checkoutUrl = await createCheckoutSession({
            userId: session.user.id,
            userEmail: session.user.email,
            tier,
        })

        return NextResponse.json({ url: checkoutUrl })
    } catch (error) {
        console.error('Create checkout error:', error)
        return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
    }
}
