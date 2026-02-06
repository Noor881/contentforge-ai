'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import toast from 'react-hot-toast'
import { Check, CreditCard } from 'lucide-react'
import Link from 'next/link'

const plans = [
    {
        name: 'Pro',
        price: '$29',
        period: '/month',
        tier: 'pro',
        features: ['100 content generations/month', 'All 6 tools', 'Priority support', 'API access'],
    },
    {
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        tier: 'enterprise',
        features: ['Unlimited generations', 'All 6 tools', 'Dedicated support', 'Custom integrations'],
    },
]

export default function BillingPage() {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [portalLoading, setPortalLoading] = useState(false)

    const currentTier = session?.user?.subscriptionTier || 'free'
    const subscriptionStatus = session?.user?.subscriptionStatus || 'inactive'

    const handleUpgrade = async (tier: string) => {
        setLoading(true)

        try {
            const res = await fetch('/api/stripe/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier }),
            })

            const data = await res.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                toast.error('Failed to create checkout session')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleManageSubscription = async () => {
        setPortalLoading(true)

        try {
            const res = await fetch('/api/stripe/create-portal', { method: 'POST' })
            const data = await res.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                toast.error('Failed to open billing portal')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setPortalLoading(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Billing & Subscription
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your subscription and payment methods
                </p>
            </div>

            {/* Current Plan */}
            <Card variant="gradient" className="mb-8">
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Current Plan: {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Status: {subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1)}
                            </p>
                            {session?.user?.isTrialActive && session?.user?.trialEndDate && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    Trial ends: {new Date(session.user.trialEndDate).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                        {currentTier !== 'free' && subscriptionStatus === 'active' && (
                            <Button
                                onClick={handleManageSubscription}
                                isLoading={portalLoading}
                                variant="outline"
                            >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Manage Subscription
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Upgrade Plans */}
            {(currentTier === 'free' || session?.user?.isTrialActive) && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Upgrade Your Plan
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {plans.map((plan) => (
                            <Card key={plan.tier} variant="default" className="border-2 border-primary-500">
                                <CardHeader>
                                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                        {plan.name}
                                    </div>
                                    <div className="mt-4 flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-gray-900 dark:text-white">
                                            {plan.price}
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        onClick={() => handleUpgrade(plan.tier)}
                                        className="w-full"
                                        size="lg"
                                        isLoading={loading}
                                    >
                                        Upgrade to {plan.name}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}

            {/* Billing History - Placeholder */}
            <Card variant="default">
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No billing history yet</p>
                        <p className="text-sm mt-2">Your invoices will appear here after subscription</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
