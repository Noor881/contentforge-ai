'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Sparkles, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'promo-banner-dismissed'

export default function PromoBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if banner was previously dismissed
        const dismissed = localStorage.getItem(STORAGE_KEY)
        if (!dismissed) {
            setIsVisible(true)
        }
    }, [])

    const handleDismiss = () => {
        setIsVisible(false)
        localStorage.setItem(STORAGE_KEY, 'true')
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="relative overflow-hidden"
                >
                    {/* Solid primary background matching website theme */}
                    <div className="relative bg-primary-600 dark:bg-primary-700">
                        {/* Subtle pattern overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />

                        <div className="relative container-custom mx-auto">
                            <div className="flex items-center justify-center gap-4 py-3 px-4 text-white">
                                {/* Icon */}
                                <motion.div
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    <Sparkles className="h-5 w-5 text-primary-200" />
                                </motion.div>

                                {/* Text */}
                                <p className="text-sm md:text-base font-medium text-center">
                                    <span className="hidden sm:inline">🎉 </span>
                                    <span className="font-bold">50% OFF</span> Annual Plans — Limited Time Only!
                                </p>

                                {/* CTA Button */}
                                <Link href="/pricing">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="hidden sm:flex items-center gap-1.5 bg-white text-primary-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-primary-50 transition-colors shadow-md"
                                    >
                                        Claim Offer
                                        <ArrowRight className="h-4 w-4" />
                                    </motion.button>
                                </Link>

                                {/* Mobile CTA */}
                                <Link href="/pricing" className="sm:hidden">
                                    <span className="text-primary-200 font-semibold text-sm underline underline-offset-2">
                                        Claim →
                                    </span>
                                </Link>

                                {/* Close Button */}
                                <button
                                    onClick={handleDismiss}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                                    aria-label="Dismiss banner"
                                >
                                    <X className="h-4 w-4 text-white/80 hover:text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
