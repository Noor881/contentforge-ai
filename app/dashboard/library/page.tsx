'use client'

import { useEffect, useState } from 'react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { FileText, Trash2, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Loading from '@/components/ui/Loading'

export default function ContentLibrary() {
    const [content, setContent] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchContent()
    }, [filter])

    const fetchContent = async () => {
        try {
            const query = filter !== 'all' ? `?type=${filter}` : ''
            const res = await fetch(`/api/content/list${query}`)
            const data = await res.json()
            setContent(data.content || [])
        } catch (error) {
            console.error('Failed to load content:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this content?')) return

        try {
            const res = await fetch(`/api/content/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setContent(content.filter(item => item.id !== id))
            }
        } catch (error) {
            console.error('Failed to delete:', error)
        }
    }

    const getTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            blog_post: 'Blog Post',
            social_media: 'Social Media',
            email: 'Email',
            video_script: 'Video Script',
            ad_copy: 'Ad Copy',
            seo_meta: 'SEO Meta',
        }
        return labels[type] || type
    }

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            blog_post: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            social_media: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
            email: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            video_script: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            ad_copy: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
            seo_meta: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
        }
        return colors[type] || 'bg-gray-100 text-gray-700'
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Content Library
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    View and manage all your generated content
                </p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
                {['all', 'blog_post', 'social_media', 'email', 'video_script', 'ad_copy', 'seo_meta'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === type
                                ? 'bg-primary-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        {type === 'all' ? 'All Content' : getTypeLabel(type)}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <Loading.Spinner size="lg" />
                </div>
            ) : content.length === 0 ? (
                <Card variant="default">
                    <CardContent>
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No content found</p>
                            <p className="text-sm mt-2">Start creating content to see it here</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {content.map((item) => (
                        <Card key={item.id} variant="default" hover>
                            <CardContent>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                                                {getTypeLabel(item.type)}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(item.createdAt)}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {item.content.substring(0, 200)}...
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <button
                                            onClick={() => window.open(`/dashboard/library/${item.id}`, '_blank')}
                                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                            title="View details"
                                        >
                                            <ExternalLink className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
