'use client'

import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
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
} from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
    {
        icon: Pencil,
        title: 'Blog Post Generator',
        description: 'Create SEO-optimized blog posts in any tone and length. Perfect for content marketing.',
        gradient: 'from-teal-500 to-purple-600',
    },
    {
        icon: MessageSquare,
        title: 'Social Media Content',
        description: 'Generate engaging posts for Twitter, LinkedIn, Instagram, and Facebook with hashtags and emojis.',
        gradient: 'from-blue-500 to-purple-600',
    },
    {
        icon: Mail,
        title: 'Email Templates',
        description: 'Craft compelling marketing emails, newsletters, and promotional campaigns that convert.',
        gradient: 'from-red-500 to-purple-600',
    },
    {
        icon: Video,
        title: 'Video Scripts',
        description: 'Write professional video scripts with hooks, timing cues, and calls-to-action.',
        gradient: 'from-red-600 to-pink-600',
    },
    {
        icon: Target,
        title: 'Ad Copy',
        description: 'Create high-converting ad copy for Google, Facebook, Instagram, and LinkedIn ads.',
        gradient: 'from-orange-500 to-purple-600',
    },
    {
        icon: Search,
        title: 'SEO Meta Descriptions',
        description: 'Generate keyword-optimized meta descriptions that boost your search rankings.',
        gradient: 'from-green-500 to-teal-600',
    },
    {
        icon: FileText,
        title: 'Resume Builder',
        description: 'Build ATS-friendly, professional resumes optimized for your target job role.',
        gradient: 'from-indigo-500 to-purple-600',
    },
    {
        icon: FileText,
        title: 'Cover Letter Generator',
        description: 'Write personalized cover letters that highlight your skills and experience.',
        gradient: 'from-blue-600 to-indigo-600',
    },
    {
        icon: Music,
        title: 'Song Lyrics Creator',
        description: 'Generate original song lyrics for any genre, theme, and mood with perfect structure.',
        gradient: 'from-pink-500 to-purple-600',
    },
    {
        icon: Mic,
        title: 'Podcast Script Writer',
        description: 'Create engaging podcast scripts with timestamps, intros, outros, and show notes.',
        gradient: 'from-orange-600 to-red-600',
    },
    {
        icon: ShoppingBag,
        title: 'Product Descriptions',
        description: 'Write compelling product descriptions that drive sales and conversions.',
        gradient: 'from-amber-500 to-orange-600',
    },
    {
        icon: Share2,
        title: 'LinkedIn Posts',
        description: 'Craft professional LinkedIn content that builds your personal brand and authority.',
        gradient: 'from-blue-700 to-indigo-700',
    },
    {
        icon: Feather,
        title: 'Poetry Generator',
        description: 'Create beautiful, creative poems in various styles and formats.',
        gradient: 'from-purple-500 to-pink-500',
    },
]

export default function Features() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-responsive-lg font-display font-bold text-gray-900 dark:text-white mb-4">
                        Everything You Need to{' '}
                        <span className="gradient-text">Scale Your Content</span>
                    </h2>
                    <p className="text-responsive-md text-gray-600 dark:text-gray-400">
                        13+ powerful AI tools to create any type of content your business needs
                    </p>
                </div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <Card hover variant="default" className="h-full">
                                    <CardHeader>
                                        <div className={`inline-flex rounded-xl p-4 bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        And more features coming soon...
                    </p>
                </div>
            </div>
        </section>
    )
}
