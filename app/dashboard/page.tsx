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
} from 'lucide-react'
import { useSession } from 'next-auth/react'

const quickActions = [
    { name: 'Blog Post', href: '/dashboard/create/blog', icon: Pencil, color: 'text-blue-600' },
    { name: 'Social Media', href: '/dashboard/create/social', icon: MessageSquare, color: 'text-purple-600' },
    { name: 'Email', href: '/dashboard/create/email', icon: Mail, color: 'text-green-600' },
    { name: 'Video Script', href: '/dashboard/create/video', icon: Video, color: 'text-red-600' },
    { name: 'Ad Copy', href: '/dashboard/create/ad', icon: Target, color: 'text-orange-600' },
    { name: 'SEO Meta', href: '/dashboard/create/seo', icon: Search, color: 'text-cyan-600' },
    { name: 'Resume', href: '/dashboard/create/resume', icon: FileText, color: 'text-emerald-600' },
    { name: 'Cover Letter', href: '/dashboard/create/cover-letter', icon: FileText, color: 'text-teal-600' },
    { name: 'Lyrics', href: '/dashboard/create/lyrics', icon: Music, color: 'text-pink-600' },
    { name: 'Podcast', href: '/dashboard/create/podcast', icon: Mic, color: 'text-yellow-600' },
    { name: 'Product Desc', href: '/dashboard/create/product', icon: ShoppingBag, color: 'text-indigo-600' },
    { name: 'LinkedIn', href: '/dashboard/create/linkedin', icon: Share2, color: 'text-blue-700' },
    { name: 'Poem', href: '/dashboard/create/poem', icon: Feather, color: 'text-rose-600' },
]

export default function DashboardPage() {
    const { data: session } = useSession()
    const [trialStatus, setTrialStatus] = useState<any>(null)
    const [usage, setUsage] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const [trialRes, usageRes] = await Promise.all([
                    fetch('/api/user/trial-status'),
                    fetch('/api/user/usage'),
                ])

                if (trialRes.ok) setTrialStatus(await trialRes.json())
                if (usageRes.ok) setUsage(await usageRes.json())
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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card variant="default">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    Usage This Month
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {usage?.currentUsage || 0}/{usage?.limit || 0}
                                </p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                <TrendingUp className="h-8 w-8 text-primary-600" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all"
                                    style={{ width: `${Math.min(Number(usagePercentage), 100)}%` }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card variant="default">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    Current Plan
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {session?.user?.subscriptionTier || 'Free'}
                                </p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Sparkles className="h-8 w-8 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card variant="default">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    Account Status
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {session?.user?.subscriptionStatus || 'Active'}
                                </p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <AlertCircle className="h-8 w-8 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card variant="default" className="mb-8">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {quickActions.map((action) => {
                            const Icon = action.icon
                            return (
                                <Link
                                    key={action.href}
                                    href={action.href}
                                    className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon className={`h-6 w-6 ${action.color}`} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                                        {action.name}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Content - Placeholder */}
            <Card variant="default">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Content</CardTitle>
                        <Link
                            href="/dashboard/library"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                            View All →
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No content generated yet.</p>
                        <p className="text-sm mt-2">Start creating amazing content with AI!</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
