import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
    title: 'Sign In',
    description: 'Sign in to your ContentForge AI account to access your dashboard and AI-powered content creation tools.',
    noIndex: true,
})

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
