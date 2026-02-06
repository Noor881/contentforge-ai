import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { generateMetadata as genMeta } from '@/lib/seo'
import PricingCards from '@/components/pricing/PricingCards'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
    title: 'Pricing',
    description: 'Choose the perfect plan for your content creation needs. Start with a 3-day free trial, upgrade to Pro for $29/month, or go Enterprise for unlimited content generation.',
})

export default function PricingPage() {
    return (
        <>
            <Header />
            <main className="py-20">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h1 className="text-responsive-xl font-display font-bold text-gray-900 dark:text-white mb-6">
                            Simple, <span className="gradient-text">Transparent Pricing</span>
                        </h1>
                        <p className="text-responsive-md text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Start creating amazing content today. All plans include a 3-day free trial with no credit card required.
                        </p>
                    </div>

                    <PricingCards />

                    {/* FAQ specific to Pricing */}
                    <div className="mt-20 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-8">Pricing FAQs</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: 'What happens after my trial ends?',
                                    a: 'After your 3-day trial, your account becomes view-only. You can upgrade to Pro or Enterprise at any time to continue generating content.',
                                },
                                {
                                    q: 'Can I change plans?',
                                    a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.',
                                },
                                {
                                    q: 'Do you offer annual billing?',
                                    a: 'Yes! Contact us for annual pricing with a 20% discount.',
                                },
                                {
                                    q: 'What payment methods do you accept?',
                                    a: 'We accept all major credit cards (Visa, MasterCard, American Express) via Stripe.',
                                },
                            ].map((item, i) => (
                                <details key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                                    <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                                        {item.q}
                                    </summary>
                                    <p className="mt-3 text-gray-600 dark:text-gray-400">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
