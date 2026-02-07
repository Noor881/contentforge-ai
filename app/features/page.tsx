import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'
import FeaturesPageContent from './FeaturesPageContent'

export const metadata: Metadata = genMeta({
    title: 'AI Content Creation Features - Blog, Social Media, Email & Video Tools',
    description: 'Explore 13+ powerful AI content creation tools. Generate SEO-optimized blog posts, viral social media content, email marketing campaigns, video scripts, and high-converting ad copy in seconds.',
    canonical: '/features',
})

export default function FeaturesPage() {
    return (
        <>
            <Header />
            <FeaturesPageContent />
            <Footer />
        </>
    )
}
