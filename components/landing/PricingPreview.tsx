'use client'

import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card'
import Button from '../ui/Button'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: '/month',
        description: 'Perfect for trying out ContentForge AI',
        features: [
            '10 AI generations per month',
            'Access to all 13 tools',
            'Basic text-to-speech',
            'Community support',
        ],
        cta: 'Start Free',
        href: '/signup',
        popular: false,
    },
    {
        name: 'Starter',
        price: '$19',
        period: '/month',
        description: 'For individuals and side projects',
        features: [
            '100 AI generations per month',
            'Access to all 13 tools',
            'Unlimited text-to-speech',
            'Priority email support',
            'Export to multiple formats',
        ],
        cta: 'Get Starter',
        href: '/signup',
        popular: false,
    },
    {
        name: 'Pro',
        price: '$49',
        period: '/month',
        description: 'For content creators and small teams',
        features: [
            '500 AI generations per month',
            'Access to all 13 tools',
            'Priority support (12h response)',
            'Team collaboration (up to 3)',
            'Advanced analytics',
            'Custom templates',
            'API access',
        ],
        cta: 'Upgrade to Pro',
        href: '/signup',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: '$199',
        period: '/month',
        description: 'For agencies and large teams',
        features: [
            'Unlimited AI generations',
            'Dedicated account manager',
            'Unlimited team members',
            'White-label options',
            'Custom integrations',
            'SLA guarantee',
        ],
        cta: 'Contact Sales',
        href: '/contact',
        popular: false,
    },
]

export default function PricingPreview() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-responsive-lg font-display font-bold text-gray-900 dark:text-white mb-4">
                        Simple, <span className="gradient-text">Transparent Pricing</span>
                    </h2>
                    <p className="text-responsive-md text-gray-600 dark:text-gray-400">
                        Start for free, upgrade when you need more. No hidden fees.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            variant="default"
                            className={`relative ${plan.popular ? 'border-2 border-primary-500 shadow-2xl lg:scale-105 z-10' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <CardHeader>
                                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    {plan.name}
                                </div>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                                        {plan.price}
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {plan.period}
                                    </span>
                                </div>
                                <p className="mt-4 text-gray-600 dark:text-gray-400">
                                    {plan.description}
                                </p>
                            </CardHeader>

                            <CardContent>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                <Link href={plan.href} className="w-full">
                                    <Button
                                        variant={plan.popular ? 'primary' : 'outline'}
                                        className="w-full"
                                        size="lg"
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Bottom Note */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        All plans include 3-day free trial • No credit card required to start
                    </p>
                    <Link href="/pricing" className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium">
                        View detailed pricing comparison →
                    </Link>
                </div>
            </div>
        </section>
    )
}
