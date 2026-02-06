import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createPayPalOrder } from '@/lib/paypal'
import { getPricingTier } from '@/config/pricing'

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { tierId, billingCycle } = await req.json()

        if (!tierId) {
            return NextResponse.json(
                { error: 'Pricing tier ID is required' },
                { status: 400 }
            )
        }

        const tier = getPricingTier(tierId)
        if (!tier) {
            return NextResponse.json(
                { error: 'Invalid pricing tier' },
                { status: 400 }
            )
        }

        // Calculate amount based on billing cycle
        const amount =
            billingCycle === 'yearly' && tier.yearlyPrice
                ? tier.yearlyPrice
                : tier.price

        if (amount === 0) {
            return NextResponse.json(
                { error: 'Free tier does not require payment' },
                { status: 400 }
            )
        }

        // Create PayPal order
        const order = await createPayPalOrder(
            amount,
            'USD',
            `ContentForge AI - ${tier.name} Plan (${billingCycle})`
        )

        return NextResponse.json({
            orderId: order.id,
            approvalUrl: order.links.find((link) => link.rel === 'approve')?.href,
        })
    } catch (error: any) {
        console.error('Payment order creation error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to create payment order' },
            { status: 500 }
        )
    }
}
