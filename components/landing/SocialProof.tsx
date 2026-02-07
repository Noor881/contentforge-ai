'use client'

import { Star, Quote, ArrowRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Content Marketing Manager',
        company: 'TechCorp',
        content: 'ContentForge AI has transformed our content strategy. We\'ve cut content creation time by 70% while maintaining quality. The blog generator alone saves us 15 hours per week. Absolutely game-changing for our team.',
        rating: 5,
        avatar: '/images/avatar-sarah.png',
        featured: true,
    },
    {
        name: 'Michael Chen',
        role: 'Social Media Manager',
        company: 'GrowthAgency',
        content: 'The social media content generator is incredible. I create a week\'s worth of posts in 30 minutes. My engagement has increased by 300%.',
        rating: 5,
        avatar: '/images/avatar-michael.png',
        featured: false,
    },
    {
        name: 'Emily Rodriguez',
        role: 'Founder & CEO',
        company: 'StartupHub',
        content: 'As a startup founder, I wear many hats. ContentForge helps me maintain a professional online presence without hiring a content team. It pays for itself 10x over.',
        rating: 5,
        avatar: '/images/avatar-emily.png',
        featured: false,
    },
    {
        name: 'David Park',
        role: 'Freelance Writer',
        company: 'Independent',
        content: 'I was skeptical about AI writing tools, but ContentForge is different. It helps me brainstorm and draft faster, giving me more time for editing and client work.',
        rating: 5,
        avatar: '/images/avatar-david.png',
        featured: false,
    },
    {
        name: 'Lisa Thompson',
        role: 'Marketing Director',
        company: 'E-commerce Plus',
        content: 'The email template generator has doubled our open rates. The AI understands our brand voice perfectly. Worth every penny!',
        rating: 5,
        avatar: '/images/avatar-lisa.png',
        featured: false,
    },
    {
        name: 'James Wilson',
        role: 'Video Creator',
        company: 'YouTube',
        content: 'Writing scripts used to take me hours. Now I generate professional scripts in minutes and spend more time on production. My channel has grown 5x since I started using ContentForge.',
        rating: 5,
        avatar: '/images/avatar-david.png',
        featured: false,
    },
]

const stats = [
    { label: 'Active Users', value: '10,000', suffix: '+', icon: '🚀' },
    { label: 'Content Generated', value: '500K', suffix: '+', icon: '📝' },
    { label: 'Hours Saved', value: '2M', suffix: '+', icon: '⏱️' },
    { label: 'Satisfaction Rate', value: '98', suffix: '%', icon: '⭐' },
]

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true })
    const [displayValue, setDisplayValue] = useState('0')

    useEffect(() => {
        if (!inView) return
        const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
        const hasK = value.includes('K')
        const hasM = value.includes('M')

        const duration = 2000
        const steps = 60
        const increment = numericValue / steps

        let current = 0
        let step = 0

        const timer = setInterval(() => {
            step++
            current = Math.min(Math.round(increment * step), numericValue)

            let formatted = current.toLocaleString()
            if (hasK) formatted = current >= 1000 ? `${Math.round(current / 1000)}K` : `${current}`
            else if (hasM) formatted = `${current}M`
            else if (current >= 1000) formatted = current.toLocaleString()

            if (step >= steps) {
                formatted = value
                clearInterval(timer)
            }

            setDisplayValue(formatted)
        }, duration / steps)

        return () => clearInterval(timer)
    }, [inView, value])

    return (
        <span ref={ref} className="tabular-nums">
            {displayValue}{suffix}
        </span>
    )
}

function FeaturedTestimonial({ testimonial }: { testimonial: typeof testimonials[0] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
        >
            <div className="glass-card p-8 lg:p-12 relative overflow-hidden">
                {/* Large quote mark */}
                <div className="absolute top-6 right-8 text-primary-500/10">
                    <Quote className="h-24 w-24" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden ring-4 ring-primary-100 dark:ring-primary-900/30 shadow-lg">
                            <Image
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>

                        <blockquote className="text-xl lg:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed mb-6">
                            &ldquo;{testimonial.content}&rdquo;
                        </blockquote>

                        <div className="flex items-center gap-3">
                            <div>
                                <div className="font-bold text-gray-900 dark:text-white text-lg">
                                    {testimonial.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {testimonial.role} at <span className="text-primary-600 dark:text-primary-400 font-medium">{testimonial.company}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <div className="relative h-full glass-card p-6 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-[15px]">
                    &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800/50">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800 flex-shrink-0">
                        <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {testimonial.role}, <span className="text-primary-600 dark:text-primary-400">{testimonial.company}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function LogoMarquee() {
    const brands = [
        'TechCorp', 'GrowthAgency', 'StartupHub', 'E-commerce Plus',
        'Digital Masters', 'CreativeLab', 'MediaFlow', 'ContentPro',
    ]

    return (
        <div className="marquee-container py-8">
            <div className="marquee-track">
                {[...brands, ...brands].map((brand, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 px-8"
                    >
                        <span className="text-lg font-bold text-gray-300 dark:text-gray-600 tracking-wider uppercase">
                            {brand}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function SocialProof() {
    const featuredTestimonial = testimonials.find(t => t.featured)!
    const otherTestimonials = testimonials.filter(t => !t.featured)

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background — subtle, no mesh gradient */}
            <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-950/50" />
            <div className="absolute inset-0 dot-grid opacity-30" />

            <div className="container-custom relative z-10">
                {/* Brand Logos Marquee */}
                <LogoMarquee />

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <div className="text-center mb-14">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-responsive-lg font-display text-gray-900 dark:text-white mb-4"
                        >
                            Trusted by <span className="text-primary-600 dark:text-primary-400">Thousands</span> of Creators
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="text-center glass-card py-8 px-4"
                            >
                                <div className="text-3xl mb-3">{stat.icon}</div>
                                <div className="text-4xl lg:text-5xl font-extrabold text-primary-600 dark:text-primary-400 mb-2">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Testimonials Header */}
                <div className="mb-14 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold mb-6"
                    >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-700 dark:text-gray-300">4.9/5 from 2,000+ reviews</span>
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-responsive-lg font-display text-gray-900 dark:text-white mb-4"
                    >
                        What Our <span className="text-primary-600 dark:text-primary-400">Users Say</span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
                    >
                        Real feedback from real creators who love ContentForge AI
                    </motion.p>
                </div>

                {/* Featured Testimonial */}
                <FeaturedTestimonial testimonial={featuredTestimonial} />

                {/* Other Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
                    ))}
                </div>

                {/* Review platforms */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-14 text-center"
                >
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Rated 4.9/5 on Product Hunt, G2, and Trustpilot
                    </p>
                    <Link
                        href="/signup"
                        className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                    >
                        Join 10,000+ happy creators
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
