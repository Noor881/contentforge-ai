'use client'

import { motion } from 'framer-motion'
import { Heart, Lightbulb, Shield, Users, Sparkles, Globe, Zap, Target, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const values = [
    {
        icon: Heart,
        title: 'User-First Design',
        description: 'Every feature we build starts with a real user need. We obsess over making AI accessible to everyone, not just tech experts.',
        accent: 'bg-rose-600',
    },
    {
        icon: Lightbulb,
        title: 'Continuous Innovation',
        description: 'We push the boundaries of what AI can do for content creation. Our team ships improvements weekly to stay ahead of the curve.',
        accent: 'bg-amber-600',
    },
    {
        icon: Shield,
        title: 'Trust & Transparency',
        description: 'Your content and data are yours. We never use your content for training, and we are transparent about how our AI works.',
        accent: 'bg-blue-600',
    },
    {
        icon: Users,
        title: 'Community Driven',
        description: 'Our roadmap is shaped by our community. We listen, iterate, and build features that our users actually need.',
        accent: 'bg-green-600',
    },
]

const stats = [
    { value: '10K+', label: 'Active Users', icon: Users },
    { value: '500K+', label: 'Content Generated', icon: Sparkles },
    { value: '50+', label: 'Countries', icon: Globe },
    { value: '98%', label: 'Satisfaction', icon: Zap },
]

const team = [
    { name: 'Alex Rivera', role: 'Founder & CEO', avatar: '/images/avatar-sarah.png', bio: 'Former Google AI researcher with a passion for making technology accessible.' },
    { name: 'Sarah Chen', role: 'Head of Content', avatar: '/images/avatar-emily.png', bio: 'Content strategist who has led content teams at three Fortune 500 companies.' },
    { name: 'Marcus Johnson', role: 'CTO', avatar: '/images/avatar-michael.png', bio: 'Full-stack engineer with 12+ years building scalable AI-powered platforms.' },
    { name: 'Emily Park', role: 'Head of Product', avatar: '/images/avatar-lisa.png', bio: 'Product lead who previously built tools used by millions of creators.' },
]

export default function AboutPageContent() {
    return (
        <main className="relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 mesh-gradient-bg grain-overlay">
                <div className="absolute inset-0 dot-grid" />

                <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold mb-8"
                    >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span className="text-gray-700 dark:text-gray-300">Our Story</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-responsive-xl font-display text-gray-900 dark:text-white mb-6"
                    >
                        Democratizing Content Creation{' '}
                        <span className="text-primary-600 dark:text-primary-400">with AI</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-responsive-md text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        We believe every creator, marketer, and business deserves access to
                        professional-quality content creation tools. ContentForge AI makes it possible
                        for anyone to create compelling content in seconds, not hours.
                    </motion.p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="text-center glass-card py-8 px-4"
                            >
                                <stat.icon className="h-6 w-6 text-primary-500 mx-auto mb-3" />
                                <div className="text-3xl lg:text-4xl font-extrabold text-primary-600 dark:text-primary-400 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 lg:py-24">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-responsive-lg font-display text-gray-900 dark:text-white mb-6">
                                Our <span className="text-primary-600 dark:text-primary-400">Mission</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                ContentForge AI was born from a simple observation: creating quality content
                                is hard, time-consuming, and expensive. Small businesses and solo creators
                                often can&apos;t afford dedicated content teams, but they still need professional-
                                quality content to compete.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                We built ContentForge AI to level the playing field. Our AI-powered platform
                                puts the equivalent of a full content team at your fingertips—blog writers,
                                social media managers, email marketers, and copywriters—all available 24/7,
                                at a fraction of the cost.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                Since launching, we&apos;ve helped over 10,000 creators produce more than
                                500,000 pieces of content, saving them millions of hours of work.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="glass-card p-8 relative overflow-hidden">
                                <div className="relative z-10">
                                    <blockquote className="text-2xl font-bold text-gray-900 dark:text-white leading-relaxed mb-6 italic">
                                        &ldquo;Content is the voice of your brand. We&apos;re here to make sure
                                        every business has a powerful one.&rdquo;
                                    </blockquote>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-200 dark:ring-primary-800">
                                            <Image
                                                src="/images/avatar-sarah.png"
                                                alt="Alex Rivera"
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white">Alex Rivera</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Founder & CEO, ContentForge AI</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 lg:py-24 relative">
                <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-950/50" />
                <div className="absolute inset-0 dot-grid opacity-30" />

                <div className="container-custom relative z-10">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold mb-6"
                        >
                            <Target className="w-4 h-4 text-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">What We Stand For</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-responsive-lg font-display text-gray-900 dark:text-white mb-5"
                        >
                            Our Core <span className="text-primary-600 dark:text-primary-400">Values</span>
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {values.map((value, i) => {
                            const Icon = value.icon
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="glass-card p-6 group relative overflow-hidden"
                                >
                                    <div className={`inline-flex rounded-xl p-3 ${value.accent} shadow-lg mb-4`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${value.accent} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`} />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 lg:py-24">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold mb-6"
                        >
                            <Users className="w-4 h-4 text-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">The People Behind It</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-responsive-lg font-display text-gray-900 dark:text-white mb-5"
                        >
                            Meet Our <span className="text-primary-600 dark:text-primary-400">Team</span>
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="glass-card p-6 text-center"
                            >
                                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 shadow-lg ring-4 ring-gray-100 dark:ring-gray-800">
                                    <Image
                                        src={member.avatar}
                                        alt={member.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                    {member.name}
                                </h3>
                                <div className="text-xs text-primary-600 dark:text-primary-400 font-semibold mb-3">
                                    {member.role}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {member.bio}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
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
                                Join Our Growing Community
                            </h2>
                            <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto">
                                Start creating professional content today with 13+ AI-powered tools.
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
