import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { generateMetadata as genMeta, generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo'
import Toast from '@/components/ui/Toast'
import { SessionProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
})

export const metadata: Metadata = genMeta({
    title: 'ContentForge AI',
    description: 'AI-powered content creation platform that helps marketers, creators, and businesses generate high-quality blog posts, social media content, email templates, video scripts, and ad copy in seconds. Start your free 3-day trial today!',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const organizationSchema = generateOrganizationSchema()
    const websiteSchema = generateWebsiteSchema()

    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <head>
                {/* JSON-LD Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationSchema),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(websiteSchema),
                    }}
                />

                {/* Favicons */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />

                {/* Analytics - Add your analytics code here */}
                {process.env.NODE_ENV === 'production' && (
                    <>
                        {/* Google Analytics would go here */}
                    </>
                )}
            </head>
            <body className={`${inter.className} antialiased`}>
                <SessionProvider>
                    {children}
                    <Toast />
                </SessionProvider>
                <Analytics />
            </body>
        </html>
    )
}
