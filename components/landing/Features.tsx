'use client'

import Image from 'next/image'
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
        gradient: 'from-teal-500 to-cyan-400',
        glow: 'shadow-teal-500/20',
        image: '/images/feature-blog.png',
        link: '/dashboard/create/blog',
    },
    {
        icon: MessageSquare,
        title: 'Social Media Content',
        description: 'Generate engaging posts for Twitter, LinkedIn, Instagram, and Facebook.',
        gradient: 'from-blue-500 to-indigo-500',
        glow: 'shadow-blue-500/20',
        image: '/images/feature-social.png',
        link: '/dashboard/create/social',
    },
    {
        icon: Mail,
        title: 'Email Templates',
        description: 'Craft compelling marketing emails, newsletters, and campaigns that convert.',
        gradient: 'from-rose-500 to-pink-500',
        glow: 'shadow-rose-500/20',
        image: '/images/feature-email.png',
        link: '/dashboard/create/email',
    },
    {
        icon: Video,
        title: 'Video Scripts',
        description: 'Write professional video scripts with hooks, timing cues, and calls-to-action.',
        gradient: 'from-red-500 to-orange-500',
        glow: 'shadow-red-500/20',
        image: '/images/feature-video.png',
        link: '/dashboard/create/video',
    },
    {
        icon: Target,
        title: 'Ad Copy',
        description: 'Create high-converting ad copy for Google, Facebook, and Instagram ads.',
        gradient: 'from-amber-500 to-yellow-400',
        glow: 'shadow-amber-500/20',
        image: '/images/feature-ad.png',
        link: '/dashboard/create/ad',
    },
    {
        icon: Search,
        title: 'SEO Meta Descriptions',
        description: 'Generate keyword-optimized meta descriptions that boost your search rankings.',
        gradient: 'from-green-500 to-emerald-400',
        glow: 'shadow-green-500/20',
        image: null,
        link: '/dashboard/create/seo',
    },
    {
        icon: FileText,
        title: 'Resume Builder',
        description: 'Build ATS-friendly, professional resumes optimized for your target job role.',
        gradient: 'from-indigo-500 to-violet-500',
        glow: 'shadow-indigo-500/20',
        image: null,
        link: '/dashboard/create/resume',
    },
    {
        icon: FileText,
        title: 'Cover Letter Generator',
        description: 'Write personalized cover letters that highlight your skills and experience.',
        gradient: 'from-blue-600 to-sky-500',
        glow: 'shadow-blue-600/20',
        image: null,
        link: '/dashboard/create/coverletter',
    },
    {
        icon: Music,
        title: 'Song Lyrics Creator',
        description: 'Generate original song lyrics for any genre, theme, and mood.',
        gradient: 'from-pink-500 to-fuchsia-500',
        glow: 'shadow-pink-500/20',
        image: null,
        link: '/dashboard/create/lyrics',
    },
    {
        icon: Mic,
        title: 'Podcast Script Writer',
        description: 'Create engaging podcast scripts with timestamps, intros, and show notes.',
        gradient: 'from-orange-500 to-red-500',
        glow: 'shadow-orange-500/20',
        image: null,
        link: '/dashboard/create/podcast',
    },
    {
        icon: ShoppingBag,
        title: 'Product Descriptions',
        description: 'Write compelling product descriptions that drive sales and conversions.',
        gradient: 'from-yellow-500 to-amber-500',
        glow: 'shadow-yellow-500/20',
        image: null,
        link: '/dashboard/create/product',
    },
    {
        icon: Share2,
        title: 'LinkedIn Posts',
        description: 'Craft professional LinkedIn content that builds your personal brand.',
        gradient: 'from-sky-600 to-blue-700',
        glow: 'shadow-sky-600/20',
        image: null,
        link: '/dashboard/create/linkedin',
    },
    {
        icon: Feather,
        title: 'Poetry Generator',
        description: 'Create beautiful, creative poems in various styles and formats.',
        gradient: 'from-purple-500 to-pink-500',
        glow: 'shadow-purple-500/20',
        image: null,
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
                        {/* Animated gradient border on hover */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-10`} />
                        </div>

                        {/* Top accent line */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-t-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                        {/* Feature image - shown for first 5 that have real images */}
                        {feature.image && (
                            <div className="relative w-full h-36 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </div>
                        )}

                        {/* Icon with gradient background */}
                        <div className={`relative inline-flex rounded-xl p-3.5 bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.glow} shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300`}>
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

            {/* Floating blobs */}
            <motion.div
                animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-32 -right-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ y: [0, 20, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 12, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            />

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
                        <span className="gradient-text">Scale Your Content</span>
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
                            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-lg animated-underline cursor-pointer"
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
