'use client'

import { useEffect, useState, useCallback } from 'react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { FileText, Trash2, ExternalLink, Search, Star, Copy, Download, Filter, X, Clock, BarChart3 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Spinner } from '@/components/ui/Loading'
import Link from 'next/link'
import toast from 'react-hot-toast'

const allTypes = [
    { value: 'all', label: 'All Content' },
    { value: 'blog_post', label: 'Blog Post' },
    { value: 'article', label: 'Article' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'email', label: 'Email' },
    { value: 'video_script', label: 'Video Script' },
    { value: 'ad_copy', label: 'Ad Copy' },
    { value: 'seo_meta', label: 'SEO Meta' },
    { value: 'resume', label: 'Resume' },
    { value: 'cover_letter', label: 'Cover Letter' },
    { value: 'lyrics', label: 'Lyrics' },
    { value: 'podcast', label: 'Podcast Script' },
    { value: 'product', label: 'Product Description' },
    { value: 'linkedin', label: 'LinkedIn Post' },
    { value: 'poem', label: 'Poem' },
]

const typeColors: Record<string, string> = {
    blog_post: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    article: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    social_media: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    email: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    video_script: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    ad_copy: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    seo_meta: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    resume: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    cover_letter: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
    lyrics: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    podcast: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    product: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    linkedin: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    poem: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
}

export default function ContentLibrary() {
    const [content, setContent] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
    const [total, setTotal] = useState(0)
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest')

    useEffect(() => {
        fetchContent()
    }, [filter])

    const fetchContent = async () => {
        setLoading(true)
        try {
            const query = filter !== 'all' ? `?type=${filter}&limit=200` : '?limit=200'
            const res = await fetch(`/api/content/list${query}`)
            const data = await res.json()
            setContent(data.content || [])
            setTotal(data.total || 0)
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
                setTotal(prev => prev - 1)
                toast.success('Content deleted')
            }
        } catch (error) {
            console.error('Failed to delete:', error)
            toast.error('Failed to delete content')
        }
    }

    const handleToggleFavorite = async (id: string, currentFav: boolean) => {
        try {
            const res = await fetch(`/api/content/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isFavorite: !currentFav }),
            })
            if (res.ok) {
                setContent(content.map(item =>
                    item.id === id ? { ...item, isFavorite: !currentFav } : item
                ))
                toast.success(currentFav ? 'Removed from favorites' : 'Added to favorites')
            }
        } catch (error) {
            toast.error('Failed to update favorite')
        }
    }

    const handleCopyContent = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to clipboard!')
    }

    const handleExportAll = () => {
        const exportData = filteredContent.map(item => ({
            title: item.title,
            type: getTypeLabel(item.type),
            content: item.content,
            created: new Date(item.createdAt).toLocaleDateString(),
            wordCount: item.content.split(/\s+/).length,
        }))
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `contentforge-library-${new Date().toISOString().split('T')[0]}.json`
        a.click()
        URL.revokeObjectURL(url)
        toast.success('Library exported!')
    }

    const getTypeLabel = (type: string) => {
        const found = allTypes.find(t => t.value === type)
        return found?.label || type
    }

    const getWordCount = (text: string) => text.split(/\s+/).filter(Boolean).length

    // Apply client-side search, favorites filter, and sorting
    const filteredContent = content
        .filter(item => {
            const matchesSearch = !searchQuery ||
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.content.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesFav = !showFavoritesOnly || item.isFavorite
            return matchesSearch && matchesFav
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            return a.title.localeCompare(b.title)
        })

    const totalWords = filteredContent.reduce((sum, item) => sum + getWordCount(item.content), 0)
    const favoritesCount = content.filter(c => c.isFavorite).length

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        Content Library
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {total} items • {totalWords.toLocaleString()} total words
                    </p>
                </div>
                <button
                    onClick={handleExportAll}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    <Download className="h-4 w-4" />
                    Export Library
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FileText className="h-4 w-4" />
                        Total Items
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{total}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BarChart3 className="h-4 w-4" />
                        Total Words
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalWords.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Star className="h-4 w-4" />
                        Favorites
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{favoritesCount}</p>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="mb-6 space-y-3">
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search content by title or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none transition-all text-sm"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${showFavoritesOnly
                                ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700'
                                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        <Star className={`h-4 w-4 ${showFavoritesOnly ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        Favorites
                    </button>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="title">Title A-Z</option>
                    </select>
                </div>

                {/* Type Filters */}
                <div className="flex flex-wrap gap-2">
                    {allTypes.map((type) => (
                        <button
                            key={type.value}
                            onClick={() => setFilter(type.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === type.value
                                ? 'bg-primary-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <Spinner size="lg" />
                </div>
            ) : filteredContent.length === 0 ? (
                <Card variant="default">
                    <CardContent>
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="font-medium">
                                {searchQuery ? 'No content matches your search' : showFavoritesOnly ? 'No favorites yet' : 'No content found'}
                            </p>
                            <p className="text-sm mt-2">
                                {searchQuery ? 'Try different keywords' : 'Start creating content to see it here'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredContent.map((item) => {
                        const wordCount = getWordCount(item.content)
                        return (
                            <Card key={item.id} variant="default" hover>
                                <CardContent>
                                    <div className="flex items-start gap-4">
                                        {/* Favorite Toggle */}
                                        <button
                                            onClick={() => handleToggleFavorite(item.id, item.isFavorite)}
                                            className="mt-1 flex-shrink-0"
                                            title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                        >
                                            <Star className={`h-5 w-5 transition-colors ${item.isFavorite
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300 hover:text-yellow-400 dark:text-gray-600'
                                                }`} />
                                        </button>

                                        {/* Content Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[item.type] || 'bg-gray-100 text-gray-700'}`}>
                                                    {getTypeLabel(item.type)}
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {formatDate(item.createdAt)}
                                                </span>
                                                <span className="text-sm text-gray-400 dark:text-gray-500">
                                                    {wordCount.toLocaleString()} words
                                                </span>
                                            </div>
                                            <Link href={`/dashboard/library/${item.id}`}>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 hover:text-primary-600 transition-colors cursor-pointer">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">
                                                {item.content.substring(0, 200)}...
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                                            <Link
                                                href={`/dashboard/library/${item.id}`}
                                                className="p-2 text-gray-500 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                                title="View details"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleCopyContent(item.content)}
                                                className="p-2 text-gray-500 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                                title="Copy content"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
