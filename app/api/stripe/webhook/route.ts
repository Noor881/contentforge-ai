import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'

// Lazy initialization
let stripeInstance: Stripe | null = null
function getStripe(): Stripe {
    if (!stripeInstance) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is not set')
        }
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2025-02-24.acacia',
        })
    }
    return stripeInstance
}

export async function POST(req: NextRequest) {
    try {
        const stripe = getStripe()
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

        if (!webhookSecret) {
            return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
        }

        const body = await req.text()
        const signature = (await headers()).get('stripe-signature')!

        let event: Stripe.Event

        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
        } catch (err: any) {
            console.error('Webhook signature verification failed:', err.message)
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
        }

        // Handle different event types
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session

                // Update user subscription
                await prisma.user.update({
                    where: { id: session.metadata?.userId },
                    data: {
                        subscriptionStatus: 'active',
                        subscriptionTier: session.metadata?.tier || 'pro',
                        isTrialActive: false,
                    },
                })

                // Create subscription record
                if (session.subscription && session.customer) {
                    await prisma.subscription.create({
                        data: {
                            userId: session.metadata!.userId,
                            stripeCustomerId: session.customer as string,
                            stripeSubscriptionId: session.subscription as string,
                            status: 'active',
                            tier: session.metadata?.tier || 'pro',
                        },
                    })
                }

                break
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription

                await prisma.subscription.update({
                    where: { stripeSubscriptionId: subscription.id },
                    data: {
                        status: subscription.status,
                    },
                })

                // Update user status
                const sub = await prisma.subscription.findUnique({
                    where: { stripeSubscriptionId: subscription.id },
                })

                if (sub) {
                    await prisma.user.update({
                        where: { id: sub.userId },
                        data: { subscriptionStatus: subscription.status },
                    })
                }

                break
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription

                await prisma.subscription.update({
                    where: { stripeSubscriptionId: subscription.id },
                    data: { status: 'canceled' },
                })

                const sub = await prisma.subscription.findUnique({
                    where: { stripeSubscriptionId: subscription.id },
                })

                if (sub) {
                    await prisma.user.update({
                        where: { id: sub.userId },
                        data: {
                            subscriptionStatus: 'canceled',
                            subscriptionTier: 'free',
                        },
                    })
                }

                break
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice

                if (invoice.subscription) {
                    const sub = await prisma.subscription.findUnique({
                        where: { stripeSubscriptionId: invoice.subscription as string },
                    })

                    if (sub) {
                        await prisma.user.update({
                            where: { id: sub.userId },
                            data: { subscriptionStatus: 'past_due' },
                        })
                    }
                }

                break
            }

            default:
                console.log(`Unhandled event type: ${event.type}`)
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
    }
}
