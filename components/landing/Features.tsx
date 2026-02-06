'use client'

import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
import { Pencil, MessageSquare, Mail, Video, Target, Search, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
    {
        icon: Pencil,
        title: 'Blog Post Generator',
        description: 'Create SEO-optimized blog posts in any tone and length. Perfect for content marketing.',
    },
    {
        icon: MessageSquare,
        title: 'Social Media Content',
        description: 'Generate engaging posts for Twitter, LinkedIn, Instagram, and Facebook with hashtags and emojis.',
    },
    {
        icon: Mail,
        title: 'Email Templates',
        description: 'Craft compelling marketing emails, newsletters, and promotional campaigns that convert.',
    },
    {
        icon: Video,
        title: 'Video Scripts',
        description: 'Write professional video scripts with hooks, timing cues, and calls-to-action.',
    },
    {
        icon: Target,
        title: 'Ad Copy',
        description: 'Create high-converting ad copy for Google, Facebook, Instagram, and LinkedIn ads.',
    },
    {
        icon: Search,
        title: 'SEO Meta Descriptions',
        description: 'Generate keyword-optimized meta descriptions that boost your search rankings.',
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
                        6 powerful AI tools to create any type of content your business needs
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
                                        <div className="inline-flex rounded-lg p-3 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 mb-4">
                                            <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
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
