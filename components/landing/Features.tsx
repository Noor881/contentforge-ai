'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

const steps = [
    {
        number: 1,
        title: 'Give the AI something to work with.',
        description: 'Fill in a few details about your content — product name, topic, tone, and any key points you want covered.',
        video: 'https://contentforge.ai/videos/step-1.mp4',
        accent: 'bg-primary-600',
        accentText: 'text-primary-600',
        accentBorder: 'border-primary-600',
    },
    {
        number: 2,
        title: 'Watch the AI generate unique, high-quality content.',
        description: 'Our AI engine crafts original, engaging content tailored to your inputs — in just seconds.',
        video: 'https://contentforge.ai/videos/step-2.mp4',
        accent: 'bg-purple-600',
        accentText: 'text-purple-600',
        accentBorder: 'border-purple-600',
    },
    {
        number: 3,
        title: 'Save and edit the content to your liking.',
        description: 'Review the results, make quick edits, and save or export your content — ready to publish anywhere.',
        video: 'https://contentforge.ai/videos/step-3.mp4',
        accent: 'bg-orange-500',
        accentText: 'text-orange-500',
        accentBorder: 'border-orange-500',
    },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="flex flex-col items-start"
        >
            {/* Step Badge */}
            <motion.span
                whileHover={{ scale: 1.1 }}
                className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-bold text-white ${step.accent} shadow-lg mb-5`}
            >
                Step {step.number}.
            </motion.span>

            {/* Step Title */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-snug">
                {step.title}
            </h3>

            {/* Step Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                {step.description}
            </p>

            {/* Video Container */}
            <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-900 cursor-pointer group"
                onClick={handlePlayPause}
            >
                {/* Subtle glow behind the card */}
                <div className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl ${step.accent}`} />

                <div className="relative aspect-[4/3] bg-gray-50 dark:bg-gray-900">
                    <video
                        ref={videoRef}
                        src={step.video}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />

                    {/* Play overlay */}
                    {!isPlaying && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"
                        >
                            <motion.div
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-14 h-14 rounded-full ${step.accent} shadow-2xl flex items-center justify-center`}
                            >
                                <svg
                                    className="w-6 h-6 text-white ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default function Features() {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-950/50" />
            <div className="absolute inset-0 dot-grid opacity-50" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                        <span className="text-gray-700 dark:text-gray-300">Simple 3-Step Process</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-responsive-lg font-display text-gray-900 dark:text-white mb-5"
                    >
                        How it{' '}
                        <span className="text-primary-600 dark:text-primary-400">Works</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-responsive-md text-gray-600 dark:text-gray-400"
                    >
                        Use Tools to generate all kinds of short-form content, such as blog post
                        outlines and product descriptions. Use Documents to create and generate
                        long-form content, like full blog posts and website pages, with the help of AI.
                    </motion.p>
                </div>

                {/* Steps Grid — 3 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
                    {steps.map((step, index) => (
                        <StepCard key={step.number} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
