'use client'

import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
    {
        name: 'Trial',
        price: 'Free',
        period: '3 days',
        description: 'Perfect for trying out ContentForge AI',
        features: [
            '5 content generations',
            'All 6 content tools',
            'Basic templates',
            'Email support',
        ],
        cta: 'Start Free Trial',
        href: '/signup',
        popular: false,
    },
    {
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'For professional creators and small teams',
        features: [
            '100 content generations/month',
            'All 6 content tools',
            'Premium templates',
            'Priority support',
            'Advanced customization',
            'Export to multiple formats',
            'Content history & favorites',
            'API access',
        ],
        cta: 'Upgrade to Pro',
        href: '/signup',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        description: 'For agencies and large teams',
        features: [
            'Unlimited content generations',
            'All 6 content tools',
            'Custom templates',
            'Dedicated support',
            'White-label options',
            'Team collaboration',
            'Advanced analytics',
            'Custom integrations',
            'SLA guarantee',
        ],
        cta: 'Contact Sales',
        href: '/contact',
        popular: false,
    },
]

export default function PricingCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
                <Card
                    key={index}
                    variant={plan.popular ? 'gradient' : 'default'}
                    className={`relative ${plan.popular ? 'border-2 border-primary-500 shadow-2xl md:scale-110 z-10' : ''}`}
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
    )
}
