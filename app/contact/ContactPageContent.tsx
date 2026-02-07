'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, ArrowRight, MessageSquare, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import toast from 'react-hot-toast'

export default function ContactPageContent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                toast.success('Message sent successfully! We\'ll get back to you soon.')
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                toast.error('Failed to send message. Please try again.')
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            value: 'support@contentforge.ai',
            description: 'For general inquiries and support',
            gradient: 'from-teal-500 to-cyan-400',
        },
        {
            icon: Phone,
            title: 'Call Us',
            value: '+1 (555) 123-4567',
            description: 'Mon-Fri, 9am-6pm EST',
            gradient: 'from-blue-500 to-indigo-500',
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            value: 'San Francisco, CA',
            description: 'United States',
            gradient: 'from-purple-500 to-pink-500',
        },
    ]

    return (
        <main className="relative overflow-hidden">
            {/* Hero */}
            <section className="relative py-20 lg:py-28 mesh-gradient-bg grain-overlay">
                <div className="absolute inset-0 dot-grid" />

                <motion.div
                    animate={{ y: [0, -25, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-20 -right-20 w-80 h-80 bg-primary-500/15 rounded-full blur-3xl"
                />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold mb-8"
                    >
                        <MessageSquare className="w-4 h-4 text-primary-500" />
                        <span className="text-gray-700 dark:text-gray-300">Get in Touch</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-responsive-xl font-display text-gray-900 dark:text-white mb-6"
                    >
                        Contact <span className="text-primary-600 dark:text-primary-400">Us</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-responsive-md text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        Have a question, feedback, or partnership inquiry?
                        We&apos;d love to hear from you.
                    </motion.p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="container-custom">
                    {/* Contact Info Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {contactInfo.map((info, i) => {
                            const Icon = info.icon
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="glass-card p-6 text-center group"
                                >
                                    <div className="inline-flex rounded-xl p-3.5 bg-primary-600 shadow-lg mb-4">
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                        {info.title}
                                    </h3>
                                    <p className="text-primary-600 dark:text-primary-400 font-semibold mb-1">
                                        {info.value}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {info.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Contact Form */}
                    <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-3"
                        >
                            <div className="glass-card p-8 lg:p-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Send Us a Message
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">
                                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name
                                            </label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Subject
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="support">Technical Support</option>
                                            <option value="billing">Billing Question</option>
                                            <option value="partnership">Partnership</option>
                                            <option value="feedback">Feature Request / Feedback</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help..."
                                            rows={5}
                                            required
                                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                                        />
                                    </div>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            type="submit"
                                            isLoading={isLoading}
                                            className="w-full bg-primary-600 hover:bg-primary-700 text-white border-none shadow-lg text-lg py-3"
                                            size="lg"
                                        >
                                            <Send className="mr-2 h-5 w-5" />
                                            Send Message
                                        </Button>
                                    </motion.div>
                                </form>
                            </div>
                        </motion.div>

                        {/* Side Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 space-y-6"
                        >
                            <div className="glass-card p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center">
                                        <Clock className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Response Time</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    We typically respond within <strong className="text-primary-600 dark:text-primary-400">24 hours</strong> for
                                    general inquiries and <strong className="text-primary-600 dark:text-primary-400">12 hours</strong> for
                                    Pro and Enterprise customers.
                                </p>
                            </div>

                            <div className="glass-card p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center">
                                        <MessageSquare className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">FAQ</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                    Many common questions are already answered in our FAQ section. Check there first for faster answers.
                                </p>
                                <a href="/#faq" className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:underline">
                                    View FAQ <ArrowRight className="h-3.5 w-3.5" />
                                </a>
                            </div>

                            <div className="glass-card p-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary-600/5" />
                                <div className="relative z-10">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Enterprise?</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        Need custom solutions, dedicated support, or white-label options?
                                        Let&apos;s discuss your needs.
                                    </p>
                                    <a href="mailto:enterprise@contentforge.ai" className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:underline">
                                        enterprise@contentforge.ai <ArrowRight className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    )
}
