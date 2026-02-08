'use client'

import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card'
import Button from '../ui/Button'
import { Check, Sparkles, ArrowRight, Crown } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: '',
        description: 'Try ContentForge AI risk-free',
        features: [
            '3 AI generations (lifetime)',
            'Access to 5 basic tools',
            'Community support',
        ],
        cta: 'Start Free',
        href: '/signup',
        popular: false,
        gradient: 'from-gray-400 to-gray-500',
        iconColor: 'text-gray-400',
    },
    {
        name: 'Starter',
        price: '$19',
        period: '/month',
        description: 'For individuals and side projects',
        features: [
            '50 AI generations per month',
            'Access to 10 tools',
            'Basic text-to-speech',
            'Email support',
        ],
        cta: 'Get Starter',
        href: '/signup',
        popular: false,
        gradient: 'from-blue-500 to-indigo-500',
        iconColor: 'text-blue-500',
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
        gradient: 'from-primary-500 to-teal-400',
        iconColor: 'text-primary-500',
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
        gradient: 'from-purple-500 to-pink-500',
        iconColor: 'text-purple-500',
    },
]

export default function PricingPreview() {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gray-50/80 dark:bg-gray-950/80" />
            <div className="absolute inset-0 dot-grid opacity-30" />

            {/* Floating blobs */}
            <motion.div
                animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 -left-32 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ y: [0, 20, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 12, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-20 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold mb-6"
                    >
                        <Crown className="w-4 h-4 text-amber-500" />
                        <span className="text-gray-700 dark:text-gray-300">Simple, Transparent Pricing</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-responsive-lg font-display text-gray-900 dark:text-white mb-5"
                    >
                        Start Free, <span className="text-primary-600 dark:text-primary-400">Scale As You Grow</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-responsive-md text-gray-600 dark:text-gray-400"
                    >
                        Start for free, upgrade when you need more. No hidden fees, no surprises.
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className={`relative ${plan.popular ? 'lg:scale-105 z-10' : ''}`}
                        >
                            <div className={`h-full glass-card p-6 ${plan.popular ? 'ring-2 ring-primary-500 shadow-2xl' : ''} overflow-hidden`}>
                                {/* Popular badge */}
                                {plan.popular && (
                                    <div className="absolute -top-0.5 left-0 right-0">
                                        <div className="bg-primary-600 text-white text-center py-1.5 text-xs font-bold uppercase tracking-wider rounded-t-2xl flex items-center justify-center gap-1.5">
                                            <Sparkles className="h-3.5 w-3.5" />
                                            Most Popular
                                            <Sparkles className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                )}

                                <div className={plan.popular ? 'pt-6' : ''}>
                                    {/* Plan name */}
                                    <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                                        {plan.name}
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                            {plan.price}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">
                                            {plan.period}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        {plan.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                                                className="flex items-start gap-3"
                                            >
                                                <div className={`flex-shrink-0 w-5 h-5 rounded-full ${plan.popular ? 'bg-primary-600' : 'bg-gray-400 dark:bg-gray-600'} flex items-center justify-center mt-0.5`}>
                                                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                                </div>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {feature}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Link href={plan.href} className="w-full">
                                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                            <Button
                                                variant={plan.popular ? 'primary' : 'outline'}
                                                className={`w-full ${plan.popular ? 'bg-primary-600 hover:bg-primary-700 text-white border-none shadow-lg' : 'border-2'}`}
                                                size="lg"
                                            >
                                                {plan.cta}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </motion.div>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-14 text-center"
                >
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        All plans include 3-day free trial • No credit card required to start
                    </p>
                    <Link href="/pricing" className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold hover:underline">
                        View detailed pricing comparison
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
