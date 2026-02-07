import { MetadataRoute } from 'next'
import { getAllBlogSlugs } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Static routes
    const staticRoutes = [
        { route: '', changeFrequency: 'daily' as const, priority: 1.0 },
        { route: '/features', changeFrequency: 'weekly' as const, priority: 0.9 },
        { route: '/pricing', changeFrequency: 'weekly' as const, priority: 0.9 },
        { route: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
        { route: '/contact', changeFrequency: 'monthly' as const, priority: 0.6 },
        { route: '/blog', changeFrequency: 'daily' as const, priority: 0.9 },
        { route: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
        { route: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
        { route: '/cookies', changeFrequency: 'yearly' as const, priority: 0.3 },
        { route: '/refund', changeFrequency: 'yearly' as const, priority: 0.3 },
        { route: '/login', changeFrequency: 'monthly' as const, priority: 0.5 },
        { route: '/signup', changeFrequency: 'monthly' as const, priority: 0.8 },
    ]

    // Dynamic blog post routes
    const blogSlugs = getAllBlogSlugs()
    const blogRoutes = blogSlugs.map((slug) => ({
        route: `/blog/${slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Combine all routes
    const allRoutes = [...staticRoutes, ...blogRoutes]

    return allRoutes.map(({ route, changeFrequency, priority }) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
    }))
}
