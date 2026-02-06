import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import SocialProof from '@/components/landing/SocialProof'
import PricingPreview from '@/components/landing/PricingPreview'
import FAQ from '@/components/landing/FAQ'
import CTASection from '@/components/landing/CTASection'

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
