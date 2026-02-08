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
            // AI Image Generation keywords
            'AI image generator',
            'free AI image generator',
            'text to image AI',
            'AI art generator online',
            'AI image generation from text',
            'stable diffusion online free',
            'FLUX AI image generator',
            // AI Video Generation keywords
            'AI video generator',
            'text to video AI',
            'AI video maker from text',
            'free AI video generator',
            'AI video creation tool',
            'text to video converter AI',
            // Long-tail keywords - Informational intent
            'how to use AI for content creation',
            'AI content generation tutorial for beginners',
            'best AI tools for writing blog posts 2024',
            'how to generate images with AI free',
            'best AI image generators 2024',
            // Long-tail keywords - Commercial intent
            'free AI content generator online',
            'AI blog post writer for small business',
            'affordable AI writing assistant',
            'free AI image creator no signup',
            'best free text to video AI tool',
            // Long-tail keywords - Feature-specific
            'automated social media content creation tool',
            'AI email marketing template generator',
            'professional video script AI writer',
            'AI ad copy generator for Facebook Google LinkedIn',
            'SEO optimized content generator',
            'AI powered image generation for marketing',
            // Long-tail keywords - Use-case specific
            'AI writing tool for content marketing',
            'generate blog posts with artificial intelligence',
            'create social media posts automatically',
            'AI powered email newsletter writer',
            'create product images with AI',
            'AI video for social media content',
            // Brand + category keywords
            'ContentForge AI content platform',
            'best AI content creation software 2024',
            'all in one AI content and image generator',
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

export function generateAIToolSchema({
    name,
    description,
    url,
    category,
}: {
    name: string
    description: string
    url: string
    category: 'ImageGeneration' | 'VideoGeneration' | 'TextGeneration'
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name,
        description,
        url: `${APP_URL}${url}`,
        applicationCategory: category === 'ImageGeneration'
            ? 'MultimediaApplication'
            : category === 'VideoGeneration'
                ? 'MultimediaApplication'
                : 'BusinessApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free tier available with Hugging Face API',
        },
        provider: {
            '@type': 'Organization',
            name: APP_NAME,
            url: APP_URL,
        },
        featureList: category === 'ImageGeneration'
            ? ['FLUX.1 Schnell', 'Stable Diffusion XL', 'Stable Diffusion 3.5', 'DreamShaper XL', 'Realistic Vision', 'OpenJourney']
            : category === 'VideoGeneration'
                ? ['CogVideoX', 'AnimateDiff Lightning', 'ModelScope T2V', 'Zeroscope V2']
                : ['Blog Posts', 'Social Media', 'Email Templates', 'Ad Copy'],
    }
}
