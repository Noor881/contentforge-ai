import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost, getAllBlogSlugs } from '@/lib/blog-data'
import { Calendar, User, Clock, ArrowLeft, Share2, Tag } from 'lucide-react'
import Button from '@/components/ui/Button'

interface PageProps {
    params: Promise<{ slug: string }>
}

// Generate static pages for all blog posts
export async function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({
        slug: slug,
    }))
}

// Generate SEO metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        return {
            title: 'Blog Post Not Found | ContentForge AI',
        }
    }

    return {
        title: `${post.title} | ContentForge AI Blog`,
        description: post.metaDescription,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.metaDescription,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.metaDescription,
        },
        alternates: {
            canonical: `https://contentforge-ai.com/blog/${post.slug}`,
        },
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        notFound()
    }

    // Get related posts (same category, excluding current post)
    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3)

    // If not enough related posts from same category, add from other categories
    if (relatedPosts.length < 3) {
        const otherPosts = blogPosts
            .filter(p => p.id !== post.id && !relatedPosts.includes(p))
            .slice(0, 3 - relatedPosts.length)
        relatedPosts.push(...otherPosts)
    }

    return (
        <article className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Blog
                    </Link>
                </div>

                {/* Article Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full font-medium">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        {post.excerpt}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pb-8 border-b border-gray-200 dark:border-gray-700">
                        <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
                            {post.author.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{post.author}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{post.authorRole}</p>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <div
                    className="prose prose-lg dark:prose-invert max-w-none mb-12
                        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-li:text-gray-700 dark:prose-li:text-gray-300
                        prose-strong:text-gray-900 dark:prose-strong:text-white
                        prose-a:text-primary-600 hover:prose-a:text-primary-700
                        prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:text-gray-100"
                    dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-12 pb-12 border-b border-gray-200 dark:border-gray-700">
                    <Tag className="h-4 w-4 text-gray-500" />
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Share Section */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Share this article</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Help others discover this content</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://contentforge-ai.com/blog/${post.slug}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                                <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group block bg-gray-50 dark:bg-gray-800 rounded-lg p-5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-2 block">
                                        {relatedPost.category}
                                    </span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2">
                                        {relatedPost.title}
                                    </h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                                        {relatedPost.readTime}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="text-center bg-primary-600 rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to Try ContentForge AI?
                    </h2>
                    <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                        Create blog posts, emails, social media content, and more with the power of AI.
                    </p>
                    <Link href="/signup">
                        <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                            Start Your Free Trial
                        </Button>
                    </Link>
                </div>
            </div>
        </article>
    )
}

// Helper function to format markdown content to HTML
function formatContent(content: string): string {
    // Basic markdown to HTML conversion
    let html = content
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
        // Code blocks
        .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>')
        // Inline code
        .replace(/`(.*?)`/gim, '<code>$1</code>')
        // Unordered lists
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        // Ordered lists
        .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
        // Horizontal rule
        .replace(/^---$/gim, '<hr />')
        // Line breaks
        .replace(/\n\n/gim, '</p><p>')
        .replace(/\n/gim, '<br />')

    // Wrap in paragraphs
    html = '<p>' + html + '</p>'

    // Clean up
    html = html
        .replace(/<p><h/g, '<h')
        .replace(/<\/h(\d)><\/p>/g, '</h$1>')
        .replace(/<p><li>/g, '<ul><li>')
        .replace(/<\/li><\/p>/g, '</li></ul>')
        .replace(/<p><pre>/g, '<pre>')
        .replace(/<\/pre><\/p>/g, '</pre>')
        .replace(/<p><hr \/><\/p>/g, '<hr />')
        .replace(/<p><\/p>/g, '')

    return html
}
