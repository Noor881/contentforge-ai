'use client'

import Button from '../ui/Button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
    return (
        <section className="py-20">
            <div className="container-custom">
                <div className="relative overflow-hidden rounded-3xl">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 animated-gradient" />

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />

                    {/* Content */}
                    <div className="relative px-8 py-16 lg:px-16 lg:py-24 text-center">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 font-display">
                            Ready to Transform Your Content Strategy?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Join 10,000+ creators who are saving 10+ hours every week with AI-powered content generation.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/signup">
                                <Button
                                    size="lg"
                                    className="bg-white text-primary-600 hover:bg-gray-100 min-w-[220px] shadow-xl"
                                >
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/pricing">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white text-white hover:bg-white/10 min-w-[220px]"
                                >
                                    View Pricing
                                </Button>
                            </Link>
                        </div>

                        <p className="mt-6 text-white/80 text-sm">
                            No credit card required • 3-day free trial • Cancel anytime
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                </div>
            </div>
        </section>
    )
}
