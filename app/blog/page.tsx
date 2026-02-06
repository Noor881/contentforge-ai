'use client'

import { useState, useEffect } from 'react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Calendar, User, Tag } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
    id: string
    title: string
    excerpt: string
    author: string
    date: string
    category: string
    slug: string
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Placeholder: In production, fetch from CMS or API
        setPosts([
            {
                id: '1',
                title: 'Getting Started with AI Content Generation',
                excerpt: 'Learn how to leverage AI to create high-quality content faster than ever before.',
                author: 'ContentForge Team',
                date: '2024-01-15',
                category: 'Tutorial',
                slug: 'getting-started-ai-content'
            },
            {
                id: '2',
                title: '10 Best Practices for SEO Content',
                excerpt: 'Discover the essential strategies to optimize your content for search engines.',
                author: 'ContentForge Team',
                date: '2024-01-10',
                category: 'SEO',
                slug: 'seo-best-practices'
            }
        ])
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Blog
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Tips, tutorials, and insights on AI-powered content creation
                    </p>
                </div>

                <div className="space-y-8">
                    {posts.map((post) => (
                        <Card key={post.id} variant="default" hover>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            <span>{post.category}</span>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
