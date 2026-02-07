'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const faqs = [
    {
        question: 'How does the 3-day free trial work?',
        answer: 'Sign up with your email and start using ContentForge AI immediately. You get 5 content generations during your trial. No credit card required. After 3 days, upgrade to continue or your account becomes view-only.',
    },
    {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Absolutely! You can cancel your subscription at any time from your billing settings. There are no cancellation fees, and you\'ll retain access until the end of your billing period.',
    },
    {
        question: 'What types of content can I generate?',
        answer: 'You can create blog posts, social media content for all major platforms, email templates, video scripts, ad copy, SEO meta descriptions, resumes, cover letters, song lyrics, podcast scripts, product descriptions, LinkedIn posts, and poetry. Each tool is optimized for its specific use case.',
    },
    {
        question: 'Is the content original and plagiarism-free?',
        answer: 'Yes! Our AI generates unique content for every request. The content is original and does not copy from existing sources. However, we recommend reviewing and editing generated content before publishing.',
    },
    {
        question: 'How accurate is the AI-generated content?',
        answer: 'Our AI uses advanced language models to create high-quality, coherent content. While it\'s very accurate, we recommend reviewing and fact-checking the output, especially for technical or specialized topics.',
    },
    {
        question: 'Can I customize the tone and style?',
        answer: 'Yes! Every content tool allows you to specify tone (professional, casual, friendly, etc.) and other parameters like length, keywords, and platform-specific requirements.',
    },
    {
        question: 'What happens to my content after I generate it?',
        answer: 'All your generated content is saved in your content library. You can view, edit, export, or delete it anytime. We never use your content for training or share it with third parties.',
    },
    {
        question: 'Do you offer refunds?',
        answer: 'We offer a 30-day money-back guarantee for all new subscriptions. If you\'re not satisfied with ContentForge AI, contact us within 30 days for a full refund.',
    },
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 dot-grid opacity-30" />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold mb-6"
                    >
                        <HelpCircle className="w-4 h-4 text-primary-500" />
                        <span className="text-gray-700 dark:text-gray-300">Got Questions?</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-responsive-lg font-display text-gray-900 dark:text-white mb-5"
                    >
                        Frequently Asked <span className="text-primary-600 dark:text-primary-400">Questions</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-responsive-md text-gray-600 dark:text-gray-400"
                    >
                        Everything you need to know about ContentForge AI
                    </motion.p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group"
                        >
                            <div className={`glass-card overflow-hidden transition-all duration-300 ${openIndex === index ? 'ring-1 ring-primary-500/30' : ''}`}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900 dark:text-white pr-8 text-[15px]">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index
                                            ? 'bg-primary-100 dark:bg-primary-900/30'
                                            : 'bg-gray-100 dark:bg-gray-800'
                                            }`}
                                    >
                                        <ChevronDown className={`h-4 w-4 transition-colors ${openIndex === index
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-gray-500'
                                            }`} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 border-t border-gray-100 dark:border-gray-800/50 pt-4">
                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-14 text-center"
                >
                    <div className="glass-card inline-flex flex-col items-center gap-4 p-8 rounded-2xl">
                        <MessageCircle className="h-8 w-8 text-primary-500" />
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                            Still have questions?
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold hover:underline"
                        >
                            Contact our support team
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
