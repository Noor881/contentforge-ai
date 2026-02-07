'use client'

import { Pencil, MessageSquare, Mail, Video, Target, Search, FileText, Music, Mic, ShoppingBag, Check, ArrowRight, Sparkles, Zap, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'

const features = [
    {
        icon: Pencil,
        name: 'Blog Post Generator',
        description: 'Create SEO-optimized, engaging blog posts that rank on Google and captivate your readers.',
        image: '/images/feature-blog.png',
        gradient: 'from-teal-500 to-cyan-400',
        benefits: [
            'Choose from professional, casual, friendly, authoritative, or humorous tones',
            'Select short (300 words), medium (600 words), or long (1000+ words)',
            'Automatically includes proper headings and structure',
            'Keyword optimization for better SEO performance',
        ],
        useCases: [
            'Content marketing teams scaling blog production',
            'Solo bloggers maintaining consistent posting schedules',
            'Businesses establishing thought leadership',
        ],
    },
    {
        icon: MessageSquare,
        name: 'Social Media Content Creator',
        description: 'Generate platform-optimized posts that go viral on every major social network.',
        image: '/images/feature-social.png',
        gradient: 'from-blue-500 to-indigo-500',
        benefits: [
            'Platform-specific formatting for Twitter, LinkedIn, Instagram, Facebook',
            'Automatic hashtag suggestions for better reach',
            'Emoji integration for higher engagement',
            'Character count optimization per platform',
        ],
        useCases: [
            'Social media managers scheduling weekly content',
            'Influencers maintaining daily posting consistency',
            'Brands building community engagement',
        ],
    },
    {
        icon: Mail,
        name: 'Email Template Generator',
        description: 'Craft compelling email campaigns that consistently drive conversions and revenue.',
        image: '/images/feature-email.png',
        gradient: 'from-rose-500 to-pink-500',
        benefits: [
            'Subject line generation for maximum open rates',
            'Purpose-specific templates (marketing, newsletter, welcome, promotion)',
            'Tone customization for brand voice consistency',
            'Call-to-action optimization',
        ],
        useCases: [
            'Email marketers running multi-campaign strategies',
            'E-commerce businesses driving sales',
            'SaaS companies nurturing leads',
        ],
    },
    {
        icon: Video,
        name: 'Video Script Writer',
        description: 'Write professional video scripts with perfect structure, timing, and engagement hooks.',
        image: '/images/feature-video.png',
        gradient: 'from-red-500 to-orange-500',
        benefits: [
            'Duration-based scripts (30s, 1min, 3min, 5min, 10min)',
            'Style options: educational, entertaining, promotional, tutorial',
            'Built-in hooks and attention-grabbing openings',
            'Timing cues for seamless production',
        ],
        useCases: [
            'YouTubers producing regular content',
            'Marketing teams creating video ads',
            'Educators developing course materials',
        ],
    },
    {
        icon: Target,
        name: 'Ad Copy Generator',
        description: 'Create high-converting ad copy that maximizes your ROI across all platforms.',
        image: '/images/feature-ad.png',
        gradient: 'from-amber-500 to-yellow-400',
        benefits: [
            'Platform-specific formats (Google, Facebook, Instagram, Twitter, LinkedIn)',
            'Target audience customization',
            'A/B testing variations',
            'Compelling CTA generation',
        ],
        useCases: [
            'PPC specialists managing multiple campaigns',
            'Small businesses advertising on a budget',
            'Agencies serving multiple clients',
        ],
    },
    {
        icon: Search,
        name: 'SEO Meta Description Tool',
        description: 'Generate keyword-rich meta descriptions that boost your search rankings instantly.',
        image: null,
        gradient: 'from-green-500 to-emerald-400',
        benefits: [
            'Optimized for 155-160 character limit',
            'Keyword integration for better rankings',
            'Click-worthy descriptions that drive traffic',
            'Multiple variations for testing',
        ],
        useCases: [
            'SEO specialists optimizing websites',
            'Content teams publishing regularly',
            'E-commerce stores with large product catalogs',
        ],
    },
]

export default function FeaturesPageContent() {
    return (
        <main className="relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 mesh-gradient-bg grain-overlay">
                <div className="absolute inset-0 dot-grid" />

                {/* Floating orbs */}
                <motion.div
                    animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-20 -right-20 w-80 h-80 bg-primary-500/15 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 8, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                />

                <div className="container-custom relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">13+ AI-Powered Tools</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-responsive-xl font-display text-gray-900 dark:text-white mb-6"
                        >
                            Powerful Features for{' '}
                            <span className="text-primary-600 dark:text-primary-400">Every Content Need</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-responsive-md text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10"
                        >
                            Six specialized AI tools designed to transform your content creation workflow.
                            Each tool is purpose-built and optimized for maximum quality and efficiency.
                        </motion.p>

                        {/* Feature stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            {[
                                { icon: Zap, label: '10x Faster', desc: 'Than manual writing' },
                                { icon: Globe, label: '13+ Tools', desc: 'For every content type' },
                                { icon: Sparkles, label: 'SEO Ready', desc: 'Built-in optimization' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -3 }}
                                    className="glass-card px-6 py-4 flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                                        <stat.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900 dark:text-white text-sm">{stat.label}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{stat.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature Sections */}
            <section className="py-16 lg:py-24">
                <div className="container-custom">
                    <div className="space-y-24 lg:space-y-32">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            const isReversed = index % 2 === 1
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.7 }}
                                    className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center`}
                                >
                                    {/* Text Content */}
                                    <div className={isReversed ? 'md:order-2' : ''}>
                                        <div className="inline-flex rounded-xl p-3 bg-primary-600 mb-6 shadow-lg">
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                                            {feature.name}
                                        </h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                                            Key Benefits
                                        </h3>
                                        <ul className="space-y-3 mb-8">
                                            {feature.benefits.map((benefit, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center mt-0.5">
                                                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                                    </div>
                                                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                        {benefit}
                                                    </span>
                                                </motion.li>
                                            ))}
                                        </ul>

                                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                                            Perfect For
                                        </h3>
                                        <ul className="space-y-2 mb-8">
                                            {feature.useCases.map((useCase, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <ArrowRight className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-600 dark:text-gray-400 text-sm">{useCase}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Visual */}
                                    <motion.div
                                        className={isReversed ? 'md:order-1' : ''}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        transition={{ type: 'spring', stiffness: 200 }}
                                    >
                                        <div className="glass-card p-4 overflow-hidden">
                                            {feature.image ? (
                                                <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
                                                    <Image
                                                        src={feature.image}
                                                        alt={feature.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                                </div>
                                            ) : (
                                                <div className="aspect-[4/3] rounded-xl bg-primary-600 flex items-center justify-center relative overflow-hidden">
                                                    <div className="absolute inset-0 dot-grid opacity-20" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                                    <div className="text-center relative z-10">
                                                        <Icon className="h-20 w-20 text-white/80 mx-auto mb-4" />
                                                        <p className="text-white/90 font-bold text-lg">{feature.name}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-3xl"
                    >
                        <div className="absolute inset-0 bg-primary-600" />
                        <div className="absolute inset-0 grain-overlay" />

                        <div className="relative text-center px-8 py-16 lg:px-16 lg:py-24 z-10">
                            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                Ready to Transform Your Content?
                            </h2>
                            <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto">
                                Start creating professional content in seconds with 13+ AI-powered tools.
                            </p>
                            <Link href="/signup">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
                                    <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 text-lg px-10 py-4 font-bold shadow-2xl border-none">
                                        Start Your Free Trial
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
