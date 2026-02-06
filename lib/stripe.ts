import Stripe from 'stripe'
import { prisma } from '@/lib/db'

// Lazy initialization to prevent build-time errors
let stripeInstance: Stripe | null = null

function getStripe(): Stripe {
    if (!stripeInstance) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is not set')
        }
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2025-02-24.acacia',
            typescript: true,
        })
    }
    return stripeInstance
}

export const PRICE_IDS = {
    PRO_MONTHLY: process.env.STRIPE_PRICE_ID_PRO || '',
    ENTERPRISE_MONTHLY: process.env.STRIPE_PRICE_ID_ENTERPRISE || '',
}

export async function createCheckoutSession({
    userId,
    email,
    userEmail,
    priceId,
    successUrl,
    cancelUrl,
}: {
    userId: string
    email?: string
    userEmail?: string
    priceId: string
    successUrl: string
    cancelUrl: string
}) {
    const stripe = getStripe()
    const customerEmail = userEmail || email
    const session = await stripe.checkout.sessions.create({
        customer_email: customerEmail,
        client_reference_id: userId,
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        subscription_data: {
            metadata: {
                userId,
            },
        },
    })

    return session
}

export async function createCustomerPortal(userId: string) {
    // First, find the user's Stripe customer ID from their subscription
    const subscription = await prisma.subscription.findUnique({
        where: { userId },
        select: { stripeCustomerId: true },
    })

    if (!subscription?.stripeCustomerId) {
        throw new Error('No Stripe customer found for this user')
    }

    const session = await createCustomerPortalSession({
        customerId: subscription.stripeCustomerId,
        returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
    })

    return session.url
}

export async function createCustomerPortalSession({
    customerId,
    returnUrl,
}: {
    customerId: string
    returnUrl: string
}) {
    const stripe = getStripe()
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    })

    return session
}

export async function getSubscription(subscriptionId: string) {
    const stripe = getStripe()
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
}

export async function cancelSubscription(subscriptionId: string) {
    const stripe = getStripe()
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return subscription
}

export function getTierFromPriceId(priceId: string): string {
    if (priceId === PRICE_IDS.PRO_MONTHLY) return 'pro'
    if (priceId === PRICE_IDS.ENTERPRISE_MONTHLY) return 'enterprise'
    return 'free'
}
