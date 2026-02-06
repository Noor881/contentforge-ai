'use client'

import { useState } from 'react'
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Check, Zap } from 'lucide-react'
import { PRICING_TIERS } from '@/config/pricing'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function PricingCards() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
    const [loading, setLoading] = useState<string | null>(null)
    const router = useRouter()

    const handleSubscribe = async (tierId: string) => {
        if (tierId === 'free') {
            router.push('/signup')
            return
        }

        setLoading(tierId)
        try {
            // Create PayPal order
            const res = await fetch('/api/payments/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tierId,
                    billingCycle,
                }),
            })

            const data = await res.json()

            if (res.ok && data.approvalUrl) {
                // Redirect to PayPal for payment
                window.location.href = data.approvalUrl
            } else {
                toast.error(data.error || 'Failed to initiate payment')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setLoading(null)
        }
    }

    return (
        <div>
            {/* Billing Toggle */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex items-center gap-4 p-1 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-2 rounded-md font-medium transition-all ${billingCycle === 'monthly'
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-6 py-2 rounded-md font-medium transition-all ${billingCycle === 'yearly'
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        Yearly
                        <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                            Save 20%
                        </span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {PRICING_TIERS.map((tier) => {
                    const price =
                        billingCycle === 'yearly' && tier.yearlyPrice
                            ? tier.yearlyPrice
                            : tier.price

                    const monthlyPrice =
                        billingCycle === 'yearly' && tier.yearlyPrice
                            ? (tier.yearlyPrice / 12).toFixed(0)
                            : tier.price

                    return (
                        <Card
                            key={tier.id}
                            variant={tier.popular ? 'gradient' : 'default'}
                            className={`relative ${tier.popular
                                    ? 'border-2 border-primary-500 shadow-2xl lg:scale-105 z-10'
                                    : ''
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        <Zap className="h-4 w-4" />
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <CardHeader>
                                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    {tier.name}
                                </div>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                                        ${monthlyPrice}
                                    </span>
                                    {tier.price > 0 && (
                                        <span className="text-gray-600 dark:text-gray-400">
                                            /month
                                        </span>
                                    )}
                                </div>
                                {billingCycle === 'yearly' && tier.yearlyPrice && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        ${tier.yearlyPrice} billed annually
                                    </p>
                                )}
                                <p className="mt-4 text-gray-600 dark:text-gray-400">
                                    {tier.description}
                                </p>
                            </CardHeader>

                            <CardContent>
                                <ul className="space-y-3">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                <Button
                                    onClick={() => handleSubscribe(tier.id)}
                                    variant={tier.popular ? 'primary' : 'outline'}
                                    className="w-full"
                                    size="lg"
                                    disabled={loading === tier.id}
                                >
                                    {loading === tier.id
                                        ? 'Processing...'
                                        : tier.price === 0
                                            ? 'Start Free'
                                            : 'Subscribe Now'}
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>

            {/* Payment Info */}
            <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
                <p className="mb-2 font-medium">All plans include 14-day money-back guarantee</p>
                <p className="text-sm">Secure payment processing via PayPal</p>
            </div>
        </div>
    )
}
