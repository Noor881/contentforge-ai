'use client'

import Link from 'next/link'
import Button from '../ui/Button'
import { Sparkles, Zap, TrendingUp, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-20 lg:py-32 bg-white dark:bg-gray-900">
            {/* Clean background - no gradients */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Badge - Clean teal accent */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary-50 dark:bg-primary-900/20 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800"
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>AI-Powered Content Creation for 2026</span>
                    </motion.div>

                    {/* Heading - Bold, no gradient */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-responsive-xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
                    >
                        Create Professional Content{' '}
                        <span className="text-primary-600 dark:text-primary-400">in Seconds</span>
                    </motion.h1>

                    {/* Subtitle - Clean text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="text-responsive-md text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        Generate blog posts, social media content, email campaigns, video scripts, and ad copy with cutting-edge AI. Save 10+ hours every week.
                    </motion.p>

                    {/* Stats - Clean icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="mb-10 flex flex-wrap justify-center gap-8 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                                <strong className="font-semibold text-gray-900 dark:text-white">10,000+</strong> Creators
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                                <strong className="font-semibold text-gray-900 dark:text-white">500K+</strong> Content Generated
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                                <strong className="font-semibold text-gray-900 dark:text-white">4.9/5</strong> Rating
                            </span>
                        </div>
                    </motion.div>

                    {/* CTAs - Clean buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/signup">
                            <Button size="lg" className="min-w-[220px]">
                                Start 3-Day Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/features">
                            <Button variant="secondary" size="lg" className="min-w-[220px]">
                                See How It Works
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust Badge */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="mt-8 text-sm text-gray-500 dark:text-gray-400"
                    >
                        No credit card required • Cancel anytime • 3-day free trial
                    </motion.p>
                </div>

                {/* Clean Product Preview - no glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-20 relative"
                >
                    <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 mx-auto max-w-5xl shadow-clean-xl">
                        <div className="aspect-video bg-gradient-to-br from-primary-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                                <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary-500" />
                                <p className="text-gray-900 dark:text-white text-2xl font-bold">AI Content Generation</p>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">See it in action below</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
