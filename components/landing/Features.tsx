'use client'

import {
    Pencil,
    MessageSquare,
    Mail,
    Video,
    Target,
    Search,
    FileText,
    Music,
    Mic,
    ShoppingBag,
    Share2,
    Feather,
    ArrowRight,
} from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const features = [
    {
        icon: Pencil,
        title: 'Blog Post Generator',
        description: 'Create SEO-optimized blog posts in any tone and length. Perfect for content marketing.',
        accent: 'bg-teal-600',
        link: '/dashboard/create/blog',
    },
    {
        icon: MessageSquare,
        title: 'Social Media Content',
        description: 'Generate engaging posts for Twitter, LinkedIn, Instagram, and Facebook.',
        accent: 'bg-blue-600',
        link: '/dashboard/create/social',
    },
    {
        icon: Mail,
        title: 'Email Templates',
        description: 'Craft compelling marketing emails, newsletters, and campaigns that convert.',
        accent: 'bg-rose-600',
        link: '/dashboard/create/email',
    },
    {
        icon: Video,
        title: 'Video Scripts',
        description: 'Write professional video scripts with hooks, timing cues, and calls-to-action.',
        accent: 'bg-red-600',
        link: '/dashboard/create/video',
    },
    {
        icon: Target,
        title: 'Ad Copy',
        description: 'Create high-converting ad copy for Google, Facebook, and Instagram ads.',
        accent: 'bg-amber-600',
        link: '/dashboard/create/ad',
    },
    {
        icon: Search,
        title: 'SEO Meta Descriptions',
        description: 'Generate keyword-optimized meta descriptions that boost your search rankings.',
        accent: 'bg-green-600',
        link: '/dashboard/create/seo',
    },
    {
        icon: FileText,
        title: 'Resume Builder',
        description: 'Build ATS-friendly, professional resumes optimized for your target job role.',
        accent: 'bg-indigo-600',
        link: '/dashboard/create/resume',
    },
    {
        icon: FileText,
        title: 'Cover Letter Generator',
        description: 'Write personalized cover letters that highlight your skills and experience.',
        accent: 'bg-sky-600',
        link: '/dashboard/create/coverletter',
    },
    {
        icon: Music,
        title: 'Song Lyrics Creator',
        description: 'Generate original song lyrics for any genre, theme, and mood.',
        accent: 'bg-pink-600',
        link: '/dashboard/create/lyrics',
    },
    {
        icon: Mic,
        title: 'Podcast Script Writer',
        description: 'Create engaging podcast scripts with timestamps, intros, and show notes.',
        accent: 'bg-orange-600',
        link: '/dashboard/create/podcast',
    },
    {
        icon: ShoppingBag,
        title: 'Product Descriptions',
        description: 'Write compelling product descriptions that drive sales and conversions.',
        accent: 'bg-yellow-600',
        link: '/dashboard/create/product',
    },
    {
        icon: Share2,
        title: 'LinkedIn Posts',
        description: 'Craft professional LinkedIn content that builds your personal brand.',
        accent: 'bg-blue-700',
        link: '/dashboard/create/linkedin',
    },
    {
        icon: Feather,
        title: 'Poetry Generator',
        description: 'Create beautiful, creative poems in various styles and formats.',
        accent: 'bg-purple-600',
        link: '/dashboard/create/poetry',
    },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useTransform(mouseY, [-150, 150], [8, -8])
    const rotateY = useTransform(mouseX, [-150, 150], [-8, 8])
    const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 })
    const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (rect) {
            mouseX.set(e.clientX - rect.left - rect.width / 2)
            mouseY.set(e.clientY - rect.top - rect.height / 2)
        }
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    const Icon = feature.icon

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 800 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
        >
            <motion.div
                style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                <Link href={feature.link}>
                    <div className="group relative h-full glass-card p-6 cursor-pointer overflow-hidden">
                        {/* Subtle hover background */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gray-50 dark:bg-gray-800/30" />

                        {/* Top accent line */}
                        <div className={`absolute top-0 left-0 right-0 h-1 ${feature.accent} rounded-t-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                        {/* Icon with solid background */}
                        <div className={`relative inline-flex rounded-xl p-3.5 ${feature.accent} shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300`}>
                            <Icon className="h-6 w-6 text-white" />

                            {/* Shimmer effect on hover */}
                            <div className="absolute inset-0 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                            {feature.description}
                        </p>

                        {/* Animated arrow */}
                        <div className="flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            Try it now
                            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    )
}

export default function Features() {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-950/50" />
            <div className="absolute inset-0 dot-grid opacity-50" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                        <span className="text-gray-700 dark:text-gray-300">13+ AI-Powered Tools</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-responsive-lg font-display text-gray-900 dark:text-white mb-5"
                    >
                        Everything You Need to{' '}
                        <span className="text-primary-600 dark:text-primary-400">Scale Your Content</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-responsive-md text-gray-600 dark:text-gray-400"
                    >
                        13+ powerful AI tools to create any type of content your business needs.
                        From blog posts to video scripts, we&apos;ve got you covered.
                    </motion.p>
                </div>

                {/* Features Grid with 3D Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 text-center"
                >
                    <Link href="/features">
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-lg cursor-pointer hover:underline"
                        >
                            Explore all features in detail
                            <ArrowRight className="h-5 w-5" />
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
