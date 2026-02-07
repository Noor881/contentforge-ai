import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = genMeta({
    title: 'About ContentForge AI - Our Mission, Team & Story',
    description: 'Learn about ContentForge AI, our mission to democratize content creation with AI, and how we help thousands of creators produce better content faster.',
    canonical: '/about',
})

export default function AboutPage() {
    return (
        <>
            <Header />
            <AboutPageContent />
            <Footer />
        </>
    )
}
