'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
    Sparkles,
    ImageIcon,
    Video,
    Pencil,
    MessageSquare,
    Mail,
    Target,
    FileText,
    FolderOpen,
    ArrowRight,
    Zap,
    TrendingUp,
    Clock,
    Star,
    BookOpen,
    Feather,
    Music,
    Search,
    ShoppingBag,
    Share2,
    Mic,
    Volume2,
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface ContentStats {
    totalContent: number
    favorites: number
    thisMonth: number
}

const aiStudioCards = [
    {
        title: 'AI Image Generator',
        description: '6 models including FLUX, SDXL, DreamShaper',
        href: '/dashboard/create/image-gen',
        icon: ImageIcon,
        bgColor: 'bg-primary-600',
        shadowColor: 'shadow-primary-500/25',
        tag: 'NEW',
    },
    {
        title: 'AI Text-to-Video',
        description: '5 models including CogVideoX, AnimateDiff',
        href: '/dashboard/create/text-to-video',
        icon: Video,
        bgColor: 'bg-primary-700',
        shadowColor: 'shadow-primary-500/25',
        tag: 'NEW',
    },
]

const quickTools = [
    { name: 'Blog Post', href: '/dashboard/create/blog', icon: Pencil, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Social Media', href: '/dashboard/create/social', icon: MessageSquare, color: 'text-pink-600 bg-pink-50 dark:bg-pink-900/20' },
    { name: 'Ad Copy', href: '/dashboard/create/ad', icon: Target, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
    { name: 'Email', href: '/dashboard/create/email', icon: Mail, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
    { name: 'SEO Meta', href: '/dashboard/create/seo', icon: Search, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' },
    { name: 'Resume', href: '/dashboard/create/resume', icon: FileText, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' },
    { name: 'Advanced Blog', href: '/dashboard/create/blogger', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
    { name: 'Poem', href: '/dashboard/create/poem', icon: Feather, color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20' },
    { name: 'Lyrics', href: '/dashboard/create/lyrics', icon: Music, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
    { name: 'Product Desc', href: '/dashboard/create/product', icon: ShoppingBag, color: 'text-teal-600 bg-teal-50 dark:bg-teal-900/20' },
    { name: 'LinkedIn', href: '/dashboard/create/linkedin', icon: Share2, color: 'text-sky-600 bg-sky-50 dark:bg-sky-900/20' },
    { name: 'Video Script', href: '/dashboard/create/video', icon: Video, color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
    { name: 'Podcast Script', href: '/dashboard/create/podcast', icon: Mic, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
    { name: 'Text to Speech', href: '/dashboard/create/tts', icon: Volume2, color: 'text-lime-600 bg-lime-50 dark:bg-lime-900/20' },
    { name: 'Cover Letter', href: '/dashboard/create/cover-letter', icon: FileText, color: 'text-violet-600 bg-violet-50 dark:bg-violet-900/20' },
]

export default function DashboardPage() {
    const { data: session } = useSession()
    const firstName = session?.user?.name?.split(' ')[0] || 'there'
    const [stats, setStats] = useState<ContentStats>({ totalContent: 0, favorites: 0, thisMonth: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/content/stats')
                if (res.ok) {
                    const data = await res.json()
                    setStats({
                        totalContent: data.totalContent || 0,
                        favorites: data.favorites || 0,
                        thisMonth: data.thisMonth || 0,
                    })
                }
            } catch {
                // Stats are non-critical
            }
        }
        fetchStats()
    }, [])

    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-800 p-8 lg:p-10">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary-600/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-primary-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1 rounded-md bg-primary-500/20">
                            <Sparkles className="h-4 w-4 text-primary-300" />
                        </div>
                        <span className="text-xs font-semibold text-primary-300 uppercase tracking-widest">Command Center</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        {greeting}, {firstName} 👋
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl">
                        Your AI-powered content creation hub. Generate images, videos, and text — all in one place.
                    </p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Content', value: stats.totalContent, icon: FolderOpen, color: 'text-blue-600' },
                    { label: 'This Month', value: stats.thisMonth, icon: TrendingUp, color: 'text-green-600' },
                    { label: 'Favorites', value: stats.favorites, icon: Star, color: 'text-amber-500' },
                ].map((stat) => {
                    const StatIcon = stat.icon
                    return (
                        <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 ${stat.color}`}>
                                <StatIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* AI Studio Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary-500" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Studio</h2>
                        <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-[10px] font-bold uppercase tracking-wider">
                            Powered by Hugging Face
                        </span>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {aiStudioCards.map((card) => {
                        const CardIcon = card.icon
                        return (
                            <Link
                                key={card.href}
                                href={card.href}
                                className={`group relative overflow-hidden rounded-xl ${card.bgColor} p-6 text-white shadow-xl ${card.shadowColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-8 translate-x-8" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-white/15 backdrop-blur-sm">
                                            <CardIcon className="h-6 w-6" />
                                        </div>
                                        <span className="px-2 py-1 rounded-md bg-white/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                                            {card.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                                    <p className="text-sm text-white/80 mb-4">{card.description}</p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                                        <span>Launch Studio</span>
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* All Tools Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-gray-400" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">All Tools</h2>
                    </div>
                    <Link href="/dashboard/library" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                        View Library <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {quickTools.map((tool) => {
                        const ToolIcon = tool.icon
                        return (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 text-center"
                            >
                                <div className={`inline-flex p-2.5 rounded-xl ${tool.color} mb-3 group-hover:scale-110 transition-transform`}>
                                    <ToolIcon className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    {tool.name}
                                </p>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Footer Info */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Free Tier Active</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        AI image and video generation is powered by Hugging Face&apos;s free inference API.
                        Models may take a few extra seconds to warm up on first use.
                    </p>
                </div>
            </div>
        </div>
    )
}
