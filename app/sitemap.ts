import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const routes = [
        '',
        '/features',
        '/pricing',
        '/about',
        '/contact',
        '/blog',
        '/privacy',
        '/terms',
        '/cookies',
        '/refund',
        '/login',
        '/signup',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/blog' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    }))
}
