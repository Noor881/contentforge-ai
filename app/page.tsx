import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import PromoBanner from '@/components/landing/PromoBanner'
import { generateFAQSchema } from '@/lib/seo'
import dynamic from 'next/dynamic'

const Features = dynamic(() => import('@/components/landing/Features'), {
    loading: () => <div className="py-24 lg:py-32" />,
})
const SocialProof = dynamic(() => import('@/components/landing/SocialProof'), {
    loading: () => <div className="py-24 lg:py-32" />,
})
const PricingPreview = dynamic(() => import('@/components/landing/PricingPreview'), {
    loading: () => <div className="py-24 lg:py-32" />,
})
const FAQ = dynamic(() => import('@/components/landing/FAQ'), {
    loading: () => <div className="py-24 lg:py-32" />,
})
const CTASection = dynamic(() => import('@/components/landing/CTASection'), {
    loading: () => <div className="py-24 lg:py-32" />,
})

// FAQ data for schema markup
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

export default function HomePage() {
    const faqSchema = generateFAQSchema(faqs)

    return (
        <>
            {/* FAQ Schema for Rich Results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <PromoBanner />
            <Header />
            <main>
                <Hero />
                <Features />
                <SocialProof />
                <PricingPreview />
                <FAQ />
                <CTASection />
            </main>
            <Footer />
        </>
    )
}
