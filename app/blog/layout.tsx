import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = genMeta({
    title: 'Blog',
    description: 'Tips, tutorials, and insights on AI-powered content creation, SEO strategy, social media marketing, and productivity for modern content creators.',
})

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    )
}
