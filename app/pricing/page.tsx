import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { generateMetadata as genMeta, generateFAQSchema, generateProductSchema } from '@/lib/seo'
import PricingCards from '@/components/pricing/PricingCards'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
    title: 'Pricing - Affordable AI Content Creation Plans',
    description: 'Choose the perfect AI content creation plan for your needs. Start with a free 3-day trial, then upgrade to Pro for $29/month or go Enterprise for unlimited AI-generated blog posts, social media content, emails, and more.',
    canonical: '/pricing',
})

// FAQ data for schema and display
const pricingFAQs = [
    {
        question: 'What happens after my ContentForge AI free trial ends?',
        answer: 'After your 3-day trial, your account becomes view-only. You can upgrade to Pro or Enterprise at any time to continue generating AI content.',
    },
    {
        question: 'Can I change my ContentForge AI subscription plan?',
        answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.',
    },
    {
        question: 'Do you offer annual billing discounts?',
        answer: 'Yes! Contact us for annual pricing with a 20% discount on all ContentForge AI plans.',
    },
    {
        question: 'What payment methods does ContentForge AI accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express) via Stripe secure payment processing.',
    },
]

export default function PricingPage() {
    // Generate structured data schemas
    const faqSchema = generateFAQSchema(pricingFAQs)
    const proProductSchema = generateProductSchema({
        name: 'ContentForge AI Pro Plan',
        description: 'AI-powered content creation platform with unlimited blog posts, social media content, emails, video scripts, and ad copy generation.',
        price: 29,
        currency: 'USD',
    })

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(proProductSchema) }}
            />

            <Header />
            <main className="py-20">
                <article className="container-custom">
                    <header className="text-center mb-16">
                        <h1 className="text-responsive-xl font-display font-bold text-gray-900 dark:text-white mb-6">
                            Simple, <span className="gradient-text">Transparent Pricing</span>
                        </h1>
                        <p className="text-responsive-md text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Start creating amazing AI-generated content today. All plans include a 3-day free trial with no credit card required.
                        </p>
                    </header>

                    <section aria-labelledby="pricing-plans">
                        <h2 id="pricing-plans" className="sr-only">Pricing Plans</h2>
                        <PricingCards />
                    </section>

                    {/* FAQ specific to Pricing */}
                    <section className="mt-20 max-w-4xl mx-auto" aria-labelledby="pricing-faqs">
                        <h2 id="pricing-faqs" className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Pricing FAQs</h2>
                        <div className="space-y-4">
                            {pricingFAQs.map((item, i) => (
                                <details key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                                    <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                                        {item.question}
                                    </summary>
                                    <p className="mt-3 text-gray-600 dark:text-gray-400">{item.answer}</p>
                                </details>
                            ))}
                        </div>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    )
}
