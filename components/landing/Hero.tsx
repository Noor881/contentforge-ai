'use client'

import Link from 'next/link'
import Image from 'next/image'
import Button from '../ui/Button'
import { Sparkles, Zap, TrendingUp, ArrowRight, Play } from 'lucide-react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const TYPEWRITER_WORDS = [
    'Blog Posts',
    'Social Media',
    'Email Campaigns',
    'Video Scripts',
    'Ad Copy',
    'Song Lyrics',
    'Podcast Scripts',
    'Product Descriptions',
]

function useTypewriter(words: string[], speed = 80, pause = 2000) {
    const [text, setText] = useState('')
    const [wordIndex, setWordIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const word = words[wordIndex]
        let timeout: NodeJS.Timeout

        if (!isDeleting) {
            if (text.length < word.length) {
                timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), speed)
            } else {
                timeout = setTimeout(() => setIsDeleting(true), pause)
            }
        } else {
            if (text.length > 0) {
                timeout = setTimeout(() => setText(text.slice(0, -1)), speed / 2)
            } else {
                setIsDeleting(false)
                setWordIndex((prev) => (prev + 1) % words.length)
            }
        }

        return () => clearTimeout(timeout)
    }, [text, isDeleting, wordIndex, words, speed, pause])

    return text
}

function FloatingOrb({ delay, size, color, position }: { delay: number; size: string; color: string; position: string }) {
    return (
        <motion.div
            className={`absolute ${size} ${color} rounded-full blur-3xl opacity-20 ${position}`}
            animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.15, 1],
            }}
            transition={{
                duration: 8,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />
    )
}

function ParticleField() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        delay: Math.random() * 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}

export default function Hero() {
    const typedText = useTypewriter(TYPEWRITER_WORDS)
    const containerRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useTransform(mouseY, [-300, 300], [3, -3])
    const rotateY = useTransform(mouseX, [-300, 300], [-3, 3])
    const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
    const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
            mouseX.set(e.clientX - rect.left - rect.width / 2)
            mouseY.set(e.clientY - rect.top - rect.height / 2)
        }
    }

    return (
        <section
            className="relative overflow-hidden py-24 lg:py-40 mesh-gradient-bg grain-overlay"
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 dot-grid" />
            <FloatingOrb delay={0} size="w-96 h-96" color="bg-primary-500" position="-top-48 -left-48" />
            <FloatingOrb delay={2} size="w-80 h-80" color="bg-purple-500" position="top-20 -right-40" />
            <FloatingOrb delay={4} size="w-72 h-72" color="bg-orange-400" position="-bottom-36 left-1/3" />
            <FloatingOrb delay={1} size="w-64 h-64" color="bg-teal-400" position="bottom-20 right-1/4" />
            <ParticleField />

            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-5xl text-center">
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-10 inline-flex items-center gap-2.5 rounded-full glass px-5 py-2.5 text-sm font-semibold shimmer"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                        </span>
                        <span className="text-gray-800 dark:text-gray-200">
                            AI-Powered Content Creation for 2026
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-primary-600" />
                    </motion.div>

                    {/* Hero Heading with Typewriter */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="text-responsive-xl font-display text-gray-900 dark:text-white mb-6"
                    >
                        Create Professional{' '}
                        <br className="hidden lg:block" />
                        <span className="text-primary-600 dark:text-primary-400">{typedText}</span>
                        <span className="typewriter-cursor" />
                        <br className="hidden lg:block" />
                        <span className="text-gray-900 dark:text-white">in Seconds</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-responsive-md text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Generate blog posts, social media content, emails, video scripts, resumes,
                        cover letters, song lyrics, podcast scripts, and more with cutting-edge AI.
                        Save <strong className="text-primary-600 dark:text-primary-400">10+ hours</strong> every week.
                    </motion.p>

                    {/* Animated Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mb-12 flex flex-wrap justify-center gap-10 text-sm"
                    >
                        {[
                            { icon: Zap, value: '10,000+', label: 'Creators', color: 'text-yellow-500' },
                            { icon: TrendingUp, value: '500K+', label: 'Content Generated', color: 'text-primary-500' },
                            { icon: Sparkles, value: '4.9/5', label: 'Rating', color: 'text-purple-500' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 glass rounded-full px-5 py-2.5"
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong className="font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </strong>{' '}
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/signup">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button size="lg" className="min-w-[240px] text-lg py-4 px-8 bg-primary-600 hover:bg-primary-700 text-white border-none shadow-xl">
                                    Start 3-Day Free Trial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="/features">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button variant="secondary" size="lg" className="min-w-[240px] glass text-lg py-4 px-8 border-primary-200 dark:border-primary-800">
                                    <Play className="mr-2 h-5 w-5 text-primary-600" />
                                    See How It Works
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Trust Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
                    >
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            No credit card required
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Cancel anytime
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            3-day free trial
                        </span>
                    </motion.div>
                </div>


            </div>
        </section>
    )
}
