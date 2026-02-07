import Link from 'next/link'
import { Metadata } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { Calendar, Clock, ArrowRight, BookOpen, Pencil, MessageSquare, Mail, Video, Target, Search } from 'lucide-react'

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

const categoryColors: Record<string, string> = {
    'Tutorial': 'bg-teal-600',
    'Strategy': 'bg-blue-600',
    'Email Marketing': 'bg-rose-600',
    'Social Media': 'bg-purple-600',
    'Video Marketing': 'bg-red-600',
    'SEO': 'bg-green-600',
    'Content Strategy': 'bg-amber-600',
}

const categoryIcons: Record<string, any> = {
    'Tutorial': Pencil,
    'Strategy': Target,
    'Email Marketing': Mail,
    'Social Media': MessageSquare,
    'Video Marketing': Video,
    'SEO': Search,
    'Content Strategy': BookOpen,
}

function getCategoryColor(category: string): string {
    return categoryColors[category] || 'bg-primary-600'
}

function getIcon(category: string) {
    return categoryIcons[category] || BookOpen
}

export default function BlogPage() {
    const featuredPost = blogPosts[blogPosts.length - 1]
    const restPosts = blogPosts.slice(0, -1)

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950">
            {/* Hero */}
            <div className="relative py-20 lg:py-28 mesh-gradient-bg grain-overlay">
                <div className="absolute inset-0 dot-grid" />
                <div className="container-custom relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold mb-8">
                        <BookOpen className="w-4 h-4 text-primary-500" />
                        <span className="text-gray-700 dark:text-gray-300">Expert Insights & Guides</span>
                    </div>

                    <h1 className="text-responsive-xl font-display text-gray-900 dark:text-white mb-6">
                        ContentForge AI <span className="text-primary-600 dark:text-primary-400">Blog</span>
                    </h1>
                    <p className="text-responsive-md text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Tips, tutorials, and insights on AI-powered content creation.
                        Learn how to create better content, faster.
                    </p>
                </div>
            </div>

            <div className="container-custom py-16">
                {/* Featured Post */}
                <div className="mb-20">
                    <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
                        Featured Article
                    </h2>
                    <Link href={`/blog/${featuredPost.slug}`} className="block group">
                        <div className="glass-card overflow-hidden">
                            <div className="flex flex-col lg:flex-row">
                                {/* Cover Image */}
                                <div className={`relative lg:w-2/5 h-64 lg:h-auto ${getCategoryColor(featuredPost.category)} flex items-center justify-center overflow-hidden`}>
                                    <div className="absolute inset-0 dot-grid opacity-20" />
                                    {(() => {
                                        const Icon = getIcon(featuredPost.category)
                                        return <Icon className="h-24 w-24 text-white/30" />
                                    })()}
                                    <div className="absolute bottom-6 left-6">
                                        <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold uppercase tracking-wider">
                                            {featuredPost.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-8 lg:p-10">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4" />
                                            {featuredPost.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                                                {featuredPost.author.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span>{featuredPost.author}</span>
                                            <span>·</span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(featuredPost.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <span className="text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read Article <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* All Posts Grid */}
                <div>
                    <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8">
                        All Articles
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {restPosts.map((post) => {
                            const Icon = getIcon(post.category)
                            return (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                                    <div className="glass-card h-full overflow-hidden card-hover">
                                        {/* Solid color cover */}
                                        <div className={`relative h-44 ${getCategoryColor(post.category)} flex items-center justify-center overflow-hidden`}>
                                            <div className="absolute inset-0 dot-grid opacity-20" />
                                            <Icon className="h-16 w-16 text-white/25" />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <span className="flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                                                    <Clock className="h-3 w-3" />
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 flex-grow line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100 dark:border-gray-800">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-6 h-6 rounded-full ${getCategoryColor(post.category)} flex items-center justify-center text-white text-[10px] font-bold`}>
                                                        {post.author.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                                                        {new Date(post.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <span className="text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all text-xs">
                                                    Read <ArrowRight className="h-3.5 w-3.5" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20">
                    <div className="relative overflow-hidden rounded-3xl">
                        <div className="absolute inset-0 bg-primary-600" />
                        <div className="absolute inset-0 grain-overlay" />
                        <div className="relative text-center px-8 py-16 lg:px-16 lg:py-20 z-10">
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
                                Ready to Transform Your Content Creation?
                            </h2>
                            <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
                                Join thousands of marketers and creators using ContentForge AI to produce
                                better content in less time.
                            </p>
                            <Link
                                href="/signup"
                                className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl text-lg"
                            >
                                Start Your Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
