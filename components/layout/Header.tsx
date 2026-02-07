'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { data: session } = useSession()

    const navigation = [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <header className="sticky top-0 z-50 w-full glass border-b border-gray-200/50 dark:border-gray-800/50">
            <nav className="container-custom mx-auto">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2.5 group">
                        <div className="relative">
                            <Sparkles className="h-8 w-8 text-primary-600 group-hover:text-primary-500 transition-colors" />
                            <div className="absolute -inset-1 bg-primary-600 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                        </div>
                        <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400 font-display tracking-tight">
                            ContentForge AI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex md:items-center md:space-x-3">
                        {session ? (
                            <Link href="/dashboard">
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white border-none font-semibold">
                                        Dashboard
                                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                    </Button>
                                </motion.div>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="font-medium">
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                        <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white border-none font-semibold">
                                            Start Free Trial
                                        </Button>
                                    </motion.div>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden rounded-xl p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-1 border-t border-gray-200/50 dark:border-gray-800/50">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-4 space-y-2 px-1">
                                    {session ? (
                                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                            <Button size="sm" className="w-full bg-primary-600 hover:bg-primary-700 text-white border-none">
                                                Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                                <Button variant="outline" size="sm" className="w-full mb-2">
                                                    Log In
                                                </Button>
                                            </Link>
                                            <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                                                <Button size="sm" className="w-full bg-primary-600 hover:bg-primary-700 text-white border-none">
                                                    Start Free Trial
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}
