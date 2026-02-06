'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
        answer: 'You can create blog posts, social media content for all major platforms, email templates, video scripts, ad copy, and SEO meta descriptions. Each tool is optimized for its specific use case.',
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
        <section className="py-20">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-responsive-lg font-display font-bold text-gray-900 dark:text-white mb-4">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="text-responsive-md text-gray-600 dark:text-gray-400">
                        Everything you need to know about ContentForge AI
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                            >
                                <span className="font-semibold text-gray-900 dark:text-white pr-8">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 py-5 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Still have questions?
                    </p>
                    <a
                        href="/contact"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Contact our support team →
                    </a>
                </div>
            </div>
        </section>
    )
}
