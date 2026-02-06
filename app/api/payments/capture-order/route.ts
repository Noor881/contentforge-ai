import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { capturePayPalOrder } from '@/lib/paypal'
import { prisma } from '@/lib/db'
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

        const { orderId, tierId, billingCycle } = await req.json()

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            )
        }

        // Capture the PayPal payment
        const captureData = await capturePayPalOrder(orderId)

        if (captureData.status !== 'COMPLETED') {
            return NextResponse.json(
                { error: 'Payment was not completed' },
                { status: 400 }
            )
        }

        // Get user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Get pricing tier info
        const tier = getPricingTier(tierId)
        if (!tier) {
            return NextResponse.json(
                { error: 'Invalid pricing tier' },
                { status: 400 }
            )
        }

        // Calculate subscription end date
        const now = new Date()
        const subscriptionEnd = new Date(now)
        if (billingCycle === 'yearly') {
            subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1)
        } else {
            subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1)
        }

        // Update user subscription
        await prisma.user.update({
            where: { id: user.id },
            data: {
                subscriptionStatus: 'active',
                subscriptionTier: tierId,
                // Reset usage for new billing period
                monthlyUsageCount: 0,
                usageResetDate: subscriptionEnd,
            },
        })

        // Store subscription record
        await prisma.subscription.upsert({
            where: { userId: user.id },
            create: {
                userId: user.id,
                stripeCustomerId: orderId, // Using PayPal order ID as reference
                status: 'active',
                tier: tierId,
                stripeCurrentPeriodEnd: subscriptionEnd,
            },
            update: {
                status: 'active',
                tier: tierId,
                stripeCurrentPeriodEnd: subscriptionEnd,
            },
        })

        return NextResponse.json({
            success: true,
            subscription: {
                tier: tierId,
                status: 'active',
                endDate: subscriptionEnd,
            },
        })
    } catch (error: any) {
        console.error('Payment capture error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to capture payment' },
            { status: 500 }
        )
    }
}
