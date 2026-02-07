'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
    ArrowLeft,
    Copy,
    Download,
    Trash2,
    Star,
    Clock,
    FileText,
    BarChart3,
    Volume2,
    Share2,
    Edit3,
} from 'lucide-react'
import { formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'
import Link from 'next/link'
import TTSPlayer from '@/components/TTSPlayer'

const typeLabels: Record<string, string> = {
    blog_post: 'Blog Post',
    social_media: 'Social Media',
    email: 'Email',
    video_script: 'Video Script',
    ad_copy: 'Ad Copy',
    seo_meta: 'SEO Meta',
    resume: 'Resume',
    cover_letter: 'Cover Letter',
    lyrics: 'Lyrics',
    podcast: 'Podcast Script',
    product: 'Product Description',
    linkedin: 'LinkedIn Post',
    poem: 'Poem',
    article: 'Article',
}

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

export default function ContentDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [content, setContent] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [showTTS, setShowTTS] = useState(false)

    useEffect(() => {
        fetchContent()
    }, [params.id])

    const fetchContent = async () => {
        try {
            const res = await fetch(`/api/content/${params.id}`)
            if (res.ok) {
                const data = await res.json()
                setContent(data)
                setEditedContent(data.content)
            } else {
                toast.error('Content not found')
                router.push('/dashboard/library')
            }
        } catch (error) {
            toast.error('Failed to load content')
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(content.content)
        toast.success('Copied to clipboard!')
    }

    const handleDownloadText = () => {
        const blob = new Blob([content.content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${content.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`
        a.click()
        URL.revokeObjectURL(url)
        toast.success('Downloaded as text!')
    }

    const handleDownloadMarkdown = () => {
        const md = `# ${content.title}\n\n${content.content}`
        const blob = new Blob([md], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${content.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`
        a.click()
        URL.revokeObjectURL(url)
        toast.success('Downloaded as Markdown!')
    }

    const handleToggleFavorite = async () => {
        try {
            const res = await fetch(`/api/content/${params.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isFavorite: !content.isFavorite }),
            })
            if (res.ok) {
                setContent({ ...content, isFavorite: !content.isFavorite })
                toast.success(content.isFavorite ? 'Removed from favorites' : 'Added to favorites')
            }
        } catch (error) {
            toast.error('Failed to update favorite')
        }
    }

    const handleSaveEdit = async () => {
        setIsSaving(true)
        try {
            const res = await fetch(`/api/content/${params.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: editedContent }),
            })
            if (res.ok) {
                setContent({ ...content, content: editedContent })
                setIsEditing(false)
                toast.success('Content saved!')
            }
        } catch (error) {
            toast.error('Failed to save changes')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to permanently delete this content?')) return

        try {
            const res = await fetch(`/api/content/${params.id}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success('Content deleted')
                router.push('/dashboard/library')
            }
        } catch (error) {
            toast.error('Failed to delete content')
        }
    }

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary-600"></div>
            </div>
        )
    }

    if (!content) {
        return (
            <div className="max-w-4xl mx-auto text-center py-20">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Content not found</h2>
                <Link href="/dashboard/library">
                    <Button className="mt-4">Back to Library</Button>
                </Link>
            </div>
        )
    }

    const wordCount = content.content.split(/\s+/).filter(Boolean).length
    const charCount = content.content.length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
                href="/dashboard/library"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 text-sm transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Library
            </Link>

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[content.type] || 'bg-gray-100 text-gray-700'}`}>
                        {typeLabels[content.type] || content.type}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(content.createdAt)}
                    </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {content.title}
                </h1>

                {/* Stats Bar */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                        <BarChart3 className="h-4 w-4" />
                        {wordCount.toLocaleString()} words
                    </span>
                    <span>{charCount.toLocaleString()} characters</span>
                    <span>~{readingTime} min read</span>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={handleToggleFavorite}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${content.isFavorite
                            ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                >
                    <Star className={`h-4 w-4 ${content.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    {content.isFavorite ? 'Favorited' : 'Favorite'}
                </button>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-all"
                >
                    <Copy className="h-4 w-4" />
                    Copy
                </button>
                <button
                    onClick={handleDownloadText}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-all"
                >
                    <Download className="h-4 w-4" />
                    Text
                </button>
                <button
                    onClick={handleDownloadMarkdown}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-all"
                >
                    <Download className="h-4 w-4" />
                    Markdown
                </button>
                <button
                    onClick={() => setShowTTS(!showTTS)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${showTTS
                            ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20 text-primary-700'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                >
                    <Volume2 className="h-4 w-4" />
                    Listen
                </button>
                <button
                    onClick={() => { setIsEditing(!isEditing); setEditedContent(content.content) }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${isEditing
                            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-700'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                >
                    <Edit3 className="h-4 w-4" />
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium transition-all ml-auto"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </button>
            </div>

            {/* TTS Player */}
            {showTTS && (
                <div className="mb-6">
                    <TTSPlayer text={content.content.slice(0, 4096)} />
                </div>
            )}

            {/* Content */}
            <Card variant="default">
                <CardContent>
                    {isEditing ? (
                        <div className="space-y-4">
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="w-full min-h-[500px] px-4 py-3 rounded-lg border-2 border-blue-300 dark:border-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none resize-y font-mono text-sm"
                            />
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    {editedContent.split(/\s+/).filter(Boolean).length} words • {editedContent.length} characters
                                </p>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                    <Button onClick={handleSaveEdit} isLoading={isSaving}>Save Changes</Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="prose dark:prose-invert max-w-none">
                            <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                                {content.content}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Metadata */}
            {content.prompt && (
                <Card variant="default" className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-sm">Original Prompt</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                            {content.prompt}
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
