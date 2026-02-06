'use client'

import { Star, Quote } from 'lucide-react'
import Card, { CardContent } from '../ui/Card'
import { motion } from 'framer-motion'

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Content Marketing Manager',
        company: 'TechCorp',
        content: 'ContentForge AI has transformed our content strategy. We\'ve cut content creation time by 70% while maintaining quality. Absolutely game-changing!',
        rating: 5,
        image: '👩‍💼',
    },
    {
        name: 'Michael Chen',
        role: 'Social Media Manager',
        company: 'GrowthAgency',
        content: 'The social media content generator is incredible. I create a week\'s worth of posts in 30 minutes. My engagement has increased by 300%.',
        rating: 5,
        image: '👨‍💻',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Founder & CEO',
        company: 'StartupHub',
        content: 'As a startup founder, I wear many hats. ContentForge helps me maintain a professional online presence without hiring a content team.',
        rating: 5,
        image: '👩‍💼',
    },
    {
        name: 'David Park',
        role: 'Freelance Writer',
        company: 'Independent',
        content: 'I was skeptical about AI writing tools, but ContentForge is different. It helps me brainstorm and draft faster, giving me more time for editing.',
        rating: 5,
        image: '✍️',
    },
    {
        name: 'Lisa Thompson',
        role: 'Marketing Director',
        company: 'E-commerce Plus',
        content: 'The email template generator has doubled our open rates. The AI understands our brand voice perfectly. Worth every penny!',
        rating: 5,
        image: '👩‍💼',
    },
    {
        name: 'James Wilson',
        role: 'Video Creator',
        company: 'YouTube',
        content: 'Writing scripts used to take me hours. Now I generate professional scripts in minutes and spend more time on production.',
        rating: 5,
        image: '🎬',
    },
]

const stats = [
    { label: 'Active Users', value: '10,000+' },
    { label: 'Content Generated', value: '500K+' },
    { label: 'Hours Saved', value: '2M+' },
    { label: 'Satisfaction Rate', value: '98%' },
]

export default function SocialProof() {
    return (
        <section className="py-20">
            <div className="container-custom">
                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-responsive-lg font-display font-bold text-gray-900 dark:text-white mb-4">
                            Trusted by <span className="gradient-text">Thousands</span> of Creators
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Testimonials */}
                <div className="mb-12 text-center">
                    <h3 className="text-responsive-md font-display font-bold text-gray-900 dark:text-white mb-4">
                        What Our Users Say
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Real feedback from real creators who love ContentForge AI
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card variant="glass" className="h-full relative">
                                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary-600/20" />
                                <CardContent>
                                    {/* Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                                        "{testimonial.content}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3">
                                        <div className="text-4xl">{testimonial.image}</div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {testimonial.role}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-500">
                                                {testimonial.company}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
