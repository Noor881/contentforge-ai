import Link from 'next/link'
import { Metadata } from 'next'
import { blogPosts } from '@/lib/blog-data'
import Card, { CardContent } from '@/components/ui/Card'
import { Calendar, User, Tag, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Blog | ContentForge AI - AI Content Creation Tips & Tutorials',
    description: 'Discover tips, tutorials, and insights on AI-powered content creation. Learn SEO strategies, email marketing, social media content, and more.',
    keywords: ['AI content creation', 'content marketing blog', 'SEO tips', 'AI writing', 'content strategy'],
    openGraph: {
        title: 'ContentForge AI Blog - AI Content Creation Tips & Tutorials',
        description: 'Discover tips, tutorials, and insights on AI-powered content creation.',
        type: 'website',
    },
}

export default function BlogPage() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        ContentForge AI <span className="gradient-text">Blog</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Tips, tutorials, and insights on AI-powered content creation. Learn how to create better content, faster.
                    </p>
                </div>

                {/* Featured Post */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Article</h2>
                    <Link href={`/blog/${blogPosts[6].slug}`} className="block group">
                        <Card variant="default" hover className="overflow-hidden">
                            <CardContent className="p-8">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full font-medium">
                                                {blogPosts[6].category}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {blogPosts[6].readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 transition-colors">
                                            {blogPosts[6].title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                                            {blogPosts[6].excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                {blogPosts[6].author}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(blogPosts[6].date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* All Posts */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                                <Card variant="default" hover className="h-full">
                                    <CardContent className="p-6 flex flex-col h-full">
                                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">
                                                {post.category}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <span className="text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Content Creation?
                    </h2>
                    <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of marketers and creators using ContentForge AI to produce better content in less time.
                    </p>
                    <Link
                        href="/signup"
                        className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-colors"
                    >
                        Start Your Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
