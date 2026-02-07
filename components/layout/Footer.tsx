'use client'

import Link from 'next/link'
import { Sparkles, Twitter, Linkedin, Github, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function Footer() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (res.ok) {
                toast.success('Successfully subscribed to newsletter!')
                setEmail('')
            } else {
                const data = await res.json()
                toast.error(data.error || 'Failed to subscribe')
            }
        } catch (error) {
            toast.error('Failed to subscribe. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const footerLinks = {
        product: [
            { name: 'Features', href: '/features' },
            { name: 'Pricing', href: '/pricing' },
            { name: 'Blog', href: '/blog' },
            { name: 'Case Studies', href: '/case-studies' },
        ],
        company: [
            { name: 'About', href: '/about' },
            { name: 'Contact', href: '/contact' },
            { name: 'Careers', href: '#' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
            { name: 'Refund Policy', href: '/refund' },
        ],
        support: [
            { name: 'Help Center', href: '#' },
            { name: 'API Documentation', href: '#' },
            { name: 'Status', href: '#' },
        ],
    }

    return (
        <footer className="relative bg-gray-50 dark:bg-gray-950 border-t border-gray-200/50 dark:border-gray-800/50">
            {/* Subtle top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-primary-500/30" />

            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
                    {/* Brand and Newsletter */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4 group">
                            <Sparkles className="h-7 w-7 text-primary-600 group-hover:text-primary-500 transition-colors" />
                            <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400 font-display">
                                ContentForge AI
                            </span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            AI-powered content creation platform. Generate blog posts, social media content,
                            email templates, and more in seconds.
                        </p>

                        {/* Newsletter */}
                        <form onSubmit={handleNewsletterSubmit}>
                            <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                                Subscribe to our newsletter
                            </p>
                            <div className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1"
                                />
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <Button type="submit" size="sm" isLoading={isLoading} className="bg-primary-600 hover:bg-primary-700 text-white border-none">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </motion.div>
                            </div>
                        </form>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                            Product
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                            Company
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                            Support
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                            Legal
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-14 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 dark:text-gray-500 text-sm">
                            © 2026 ContentForge AI. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center space-x-3">
                            {[
                                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <social.icon className="h-4 w-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
