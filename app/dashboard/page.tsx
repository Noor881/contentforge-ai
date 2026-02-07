'use client'

import { useEffect, useState } from 'react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import {
    Sparkles,
    TrendingUp,
    Clock,
    AlertCircle,
    Pencil,
    MessageSquare,
    Mail,
    Video,
    Target,
    Search,
    FileText,
    Music,
    Mic,
    ShoppingBag,
    Share2,
    Feather,
    BarChart3,
    Zap,
    Star,
    ArrowRight,
    BookOpen,
    Volume2,
} from 'lucide-react'
import { useSession } from 'next-auth/react'

const quickActions = [
    { name: 'Blog Post', href: '/dashboard/create/blog', icon: Pencil, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { name: 'Social Media', href: '/dashboard/create/social', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { name: 'Email', href: '/dashboard/create/email', icon: Mail, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    { name: 'Video Script', href: '/dashboard/create/video', icon: Video, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
    { name: 'Ad Copy', href: '/dashboard/create/ad', icon: Target, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { name: 'SEO Meta', href: '/dashboard/create/seo', icon: Search, color: 'text-cyan-600', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
    { name: 'Resume', href: '/dashboard/create/resume', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { name: 'Cover Letter', href: '/dashboard/create/cover-letter', icon: FileText, color: 'text-teal-600', bg: 'bg-teal-100 dark:bg-teal-900/30' },
    { name: 'Lyrics', href: '/dashboard/create/lyrics', icon: Music, color: 'text-pink-600', bg: 'bg-pink-100 dark:bg-pink-900/30' },
    { name: 'Podcast', href: '/dashboard/create/podcast', icon: Mic, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { name: 'Product Desc', href: '/dashboard/create/product', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { name: 'LinkedIn', href: '/dashboard/create/linkedin', icon: Share2, color: 'text-blue-700', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { name: 'Poem', href: '/dashboard/create/poem', icon: Feather, color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-900/30' },
    { name: 'Advanced Blogger', href: '/dashboard/create/blogger', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { name: 'Text to Speech', href: '/dashboard/create/tts', icon: Volume2, color: 'text-violet-600', bg: 'bg-violet-100 dark:bg-violet-900/30' },
]

interface ContentItem {
    id: string
    title: string
    type: string
    createdAt: string
    content: string
}

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
    tts: 'Text to Speech',
}

const typeColors: Record<string, string> = {
    blog_post: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
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
    article: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

export default function DashboardPage() {
    const { data: session } = useSession()
    const [trialStatus, setTrialStatus] = useState<any>(null)
    const [usage, setUsage] = useState<any>(null)
    const [recentContent, setRecentContent] = useState<ContentItem[]>([])
    const [loading, setLoading] = useState(true)
    const [contentStats, setContentStats] = useState({ total: 0, thisWeek: 0, favorites: 0 })

    useEffect(() => {
        async function fetchData() {
            try {
                const [trialRes, usageRes, contentRes] = await Promise.all([
                    fetch('/api/user/trial-status'),
                    fetch('/api/user/usage'),
                    fetch('/api/content/list?limit=5'),
                ])

                if (trialRes.ok) setTrialStatus(await trialRes.json())
                if (usageRes.ok) setUsage(await usageRes.json())
                if (contentRes.ok) {
                    const contentData = await contentRes.json()
                    setRecentContent(contentData.content || [])
                    setContentStats({
                        total: contentData.total || 0,
                        thisWeek: contentData.content?.filter((c: ContentItem) => {
                            const weekAgo = new Date()
                            weekAgo.setDate(weekAgo.getDate() - 7)
                            return new Date(c.createdAt) > weekAgo
                        }).length || 0,
                        favorites: 0,
                    })
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const daysRemaining = trialStatus?.daysRemaining || 0
    const usagePercentage = usage ? ((usage.currentUsage / usage.limit) * 100).toFixed(0) : 0
    const isNearLimit = Number(usagePercentage) >= 80

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Here's what's happening with your content today.
                </p>
            </div>

            {/* Trial Banner */}
            {session?.user?.isTrialActive && (
                <div className="mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Clock className="h-8 w-8" />
                            <div>
                                <h3 className="text-xl font-bold">
                                    {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left in your trial
                                </h3>
                                <p className="text-white/90">
                                    Upgrade to Pro to unlock unlimited content generation
                                </p>
                            </div>
                        </div>
                        <Link href="/pricing">
                            <Button className="bg-white text-primary-600 hover:bg-gray-100">
                                Upgrade Now
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Usage Warning */}
            {isNearLimit && !session?.user?.isTrialActive && (
                <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                            You've used {usagePercentage}% of your monthly limit ({usage?.currentUsage}/{usage?.limit})
                        </p>
                        <p className="text-xs text-amber-600 dark:text-amber-400">Consider upgrading for more generations</p>
                    </div>
                    <Link href="/dashboard/billing" className="text-sm font-medium text-amber-700 hover:text-amber-800 underline">
                        Upgrade
                    </Link>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card variant="default">
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                <Zap className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Usage</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {usage?.currentUsage || 0}<span className="text-sm font-normal text-gray-400">/{usage?.limit || 0}</span>
                                </p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all ${isNearLimit ? 'bg-amber-500' : 'bg-gradient-to-r from-primary-600 to-secondary-600'}`}
                                    style={{ width: `${Math.min(Number(usagePercentage), 100)}%` }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card variant="default">
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Sparkles className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Plan</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                                    {session?.user?.subscriptionTier || 'Free'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card variant="default">
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <BarChart3 className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Content</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {contentStats.total}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card variant="default">
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {contentStats.thisWeek}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card variant="default" className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary-600" />
                        Create Content
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                        {quickActions.map((action) => {
                            const Icon = action.icon
                            return (
                                <Link
                                    key={action.href}
                                    href={action.href}
                                    className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
                                >
                                    <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <Icon className={`h-5 w-5 ${action.color}`} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                                        {action.name}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Content */}
            <Card variant="default">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-gray-500" />
                            Recent Content
                        </CardTitle>
                        <Link
                            href="/dashboard/library"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                        >
                            View All <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-primary-600"></div>
                        </div>
                    ) : recentContent.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="font-medium">No content generated yet</p>
                            <p className="text-sm mt-2 mb-4">Start creating amazing content with AI!</p>
                            <Link href="/dashboard/create/blog">
                                <Button size="sm">
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Create Your First Content
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentContent.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/dashboard/library/${item.id}`}
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[item.type] || 'bg-gray-100 text-gray-700'}`}>
                                                {typeLabels[item.type] || item.type}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                            {item.content.substring(0, 80)}...
                                        </p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xs text-gray-400">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {item.content.split(/\s+/).length} words
                                        </p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
