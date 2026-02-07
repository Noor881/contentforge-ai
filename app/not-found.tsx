'use client'

import Link from 'next/link'
import { Home, Search, ArrowLeft, Sparkles, BookOpen, Layers, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const popularLinks = [
    { name: 'Features', href: '/features', icon: Layers },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Pricing', href: '/pricing', icon: Sparkles },
    { name: 'Contact', href: '/contact', icon: Mail },
]

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="absolute top-20 -left-32 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-32 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 text-center px-6 py-20 max-w-2xl mx-auto">
                {/* Animated 404 number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        <span className="text-[10rem] md:text-[14rem] font-extrabold font-display text-gray-100 dark:text-gray-900 leading-none select-none">
                            404
                        </span>
                        <motion.div
                            animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-primary-600 flex items-center justify-center shadow-2xl shadow-primary-600/30">
                                <Search className="h-10 w-10 md:h-14 md:w-14 text-white" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4"
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto"
                >
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </motion.p>

                {/* Action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
                >
                    <Link href="/">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white border-none shadow-lg min-w-[200px]">
                                <Home className="mr-2 h-5 w-5" />
                                Go Home
                            </Button>
                        </motion.div>
                    </Link>
                    <Link href="/features">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Button variant="outline" size="lg" className="border-2 min-w-[200px]">
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Explore Features
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Popular links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                        Popular Pages
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
                        {popularLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-primary-50 dark:hover:bg-primary-950/30 border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-800 transition-all duration-200"
                                >
                                    <link.icon className="h-5 w-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {link.name}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
