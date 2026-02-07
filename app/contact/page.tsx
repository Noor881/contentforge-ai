import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'
import ContactPageContent from './ContactPageContent'

export const metadata: Metadata = genMeta({
    title: 'Contact ContentForge AI - Get in Touch',
    description: 'Have questions about ContentForge AI? Contact our team for support, partnerships, or general inquiries. We typically respond within 24 hours.',
    canonical: '/contact',
})

export default function ContactPage() {
    return (
        <>
            <Header />
            <ContactPageContent />
            <Footer />
        </>
    )
}
