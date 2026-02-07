'use client'

import Button from '../ui/Button'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CTASection() {
    return (
        <section className="py-24 lg:py-32">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden rounded-3xl"
                >
                    {/* Solid background */}
                    <div className="absolute inset-0 bg-primary-600" />

                    {/* Grain texture */}
                    <div className="absolute inset-0 grain-overlay" />

                    {/* Floating decorative elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-8 left-8 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                    >
                        <Sparkles className="h-8 w-8 text-white/80" />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: [0, -8, 0] }}
                        transition={{ duration: 5, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-12 right-12 w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                    >
                        <Zap className="h-7 w-7 text-white/80" />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -25, 0] }}
                        transition={{ duration: 7, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-10 left-1/4 w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center"
                    >
                        <Star className="h-6 w-6 text-white/80" />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
                        transition={{ duration: 6, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-16 right-1/3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm"
                    />

                    {/* Decorative blurs */}
                    <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/15 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

                    {/* Content */}
                    <div className="relative px-8 py-20 lg:px-20 lg:py-28 text-center z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white/90 mb-8 border border-white/20"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            Limited Time: 3-Day Free Trial
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl lg:text-6xl font-extrabold text-white mb-6 font-display tracking-tight"
                        >
                            Ready to Transform
                            <br />
                            Your Content Strategy?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            Join <strong>10,000+</strong> creators who are saving <strong>10+ hours</strong> every week
                            with AI-powered content generation.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link href="/signup">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        size="lg"
                                        className="bg-white text-primary-700 hover:bg-gray-100 min-w-[240px] shadow-2xl text-lg py-4 px-8 font-bold border-none"
                                    >
                                        Start Free Trial
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link href="/pricing">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-2 border-white/30 text-white hover:bg-white/10 min-w-[240px] backdrop-blur-sm text-lg py-4 px-8 font-bold"
                                    >
                                        View Pricing
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="mt-8 flex items-center justify-center gap-6 text-sm text-white/70"
                        >
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                No credit card
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Cancel anytime
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Instant access
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
