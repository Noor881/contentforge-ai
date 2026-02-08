import type { Metadata } from 'next'

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'ContentForge AI'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const APP_DESCRIPTION = 'AI-powered content creation platform that helps marketers, creators, and businesses generate high-quality blog posts, social media content, email templates, video scripts, and ad copy in seconds.'

export function generateMetadata({
    title,
    description,
    image = '/og-image.png',
    noIndex = false,
    canonical,
}: {
    title: string
    description?: string
    image?: string
    noIndex?: boolean
    canonical?: string
}): Metadata {
    const fullTitle = title === APP_NAME ? title : `${title} | ${APP_NAME}`
    const desc = description || APP_DESCRIPTION
    const imageUrl = image.startsWith('http') ? image : `${APP_URL}${image}`

    return {
        title: fullTitle,
        description: desc,
        applicationName: APP_NAME,
        keywords: [
            // Primary keywords
            'AI content creation',
            'content generator',
            'AI writing tool',
            // Long-tail keywords - Informational intent
            'how to use AI for content creation',
            'AI content generation tutorial for beginners',
            'best AI tools for writing blog posts 2024',
            // Long-tail keywords - Commercial intent
            'free AI content generator online',
            'AI blog post writer for small business',
            'affordable AI writing assistant',
            // Long-tail keywords - Feature-specific
            'automated social media content creation tool',
            'AI email marketing template generator',
            'professional video script AI writer',
            'AI ad copy generator for Facebook Google LinkedIn',
            'SEO optimized content generator',
            // Long-tail keywords - Use-case specific
            'AI writing tool for content marketing',
            'generate blog posts with artificial intelligence',
            'create social media posts automatically',
            'AI powered email newsletter writer',
            // Brand + category keywords
            'ContentForge AI content platform',
            'best AI content creation software 2024',
        ],
        authors: [{ name: APP_NAME }],
        creator: APP_NAME,
        publisher: APP_NAME,
        robots: noIndex ? 'noindex,nofollow' : 'index,follow',
        alternates: canonical ? {
            canonical,
        } : undefined,
        openGraph: {
            type: 'website',
            siteName: APP_NAME,
            title: fullTitle,
            description: desc,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: desc,
            images: [imageUrl],
        },
        other: {
            'fb:app_id': '123456789', // Replace with actual FB app ID
        },
    }
}

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: APP_NAME,
        url: APP_URL,
        logo: `${APP_URL}/logo.png`,
        sameAs: [
            'https://twitter.com/contentforge',
            'https://linkedin.com/company/contentforge',
        ],
    }
}

export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: APP_NAME,
        url: APP_URL,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${APP_URL}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    }
}

export function generateProductSchema({
    name,
    description,
    price,
    currency = 'USD',
}: {
    name: string
    description: string
    price: number
    currency?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        brand: {
            '@type': 'Brand',
            name: APP_NAME,
        },
        offers: {
            '@type': 'Offer',
            price,
            priceCurrency: currency,
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '524',
        },
    }
}

export function generateBlogPostSchema({
    title,
    description,
    datePublished,
    dateModified,
    authorName,
    image,
}: {
    title: string
    description: string
    datePublished: string
    dateModified?: string
    authorName: string
    image: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        image,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
            '@type': 'Person',
            name: authorName,
        },
        publisher: {
            '@type': 'Organization',
            name: APP_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${APP_URL}/logo.png`,
            },
        },
    }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${APP_URL}${item.url}`,
        })),
    }
}

export function generateSiteNavigationSchema() {
    const navigationItems = [
        { name: 'Features', url: '/features' },
        { name: 'Pricing', url: '/pricing' },
        { name: 'Blog', url: '/blog' },
        { name: 'About', url: '/about' },
        { name: 'Contact', url: '/contact' },
        { name: 'Login', url: '/login' },
        { name: 'Sign Up', url: '/signup' },
    ]

    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: navigationItems.map((item, index) => ({
            '@type': 'SiteNavigationElement',
            position: index + 1,
            name: item.name,
            url: `${APP_URL}${item.url}`,
        })),
    }
}
