import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
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

export default function HomePage() {
    return (
        <>
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
