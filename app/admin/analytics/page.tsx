import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
import {
    Shield,
    BarChart3,
    TrendingUp,
    Users,
    FileText,
    Calendar,
    ArrowUp,
    ArrowDown,
} from 'lucide-react'

export default async function AdminAnalyticsPage() {
    // SECURITY: Require admin
    await requireAdmin()

    const now = new Date()
    const today = new Date(now.setHours(0, 0, 0, 0))
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    // Get comprehensive analytics
    const [
        totalUsers,
        usersToday,
        usersThisWeek,
        usersThisMonth,
        usersLastMonth,
        totalContent,
        contentToday,
        contentThisWeek,
        contentThisMonth,
        contentLastMonth,
        proUsers,
        enterpriseUsers,
        trialUsers,
        contentByType,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { createdAt: { gte: today } } }),
        prisma.user.count({ where: { createdAt: { gte: thisWeek } } }),
        prisma.user.count({ where: { createdAt: { gte: thisMonth } } }),
        prisma.user.count({ where: { createdAt: { gte: lastMonth, lt: thisMonth } } }),
        prisma.content.count(),
        prisma.content.count({ where: { createdAt: { gte: today } } }),
        prisma.content.count({ where: { createdAt: { gte: thisWeek } } }),
        prisma.content.count({ where: { createdAt: { gte: thisMonth } } }),
        prisma.content.count({ where: { createdAt: { gte: lastMonth, lt: thisMonth } } }),
        prisma.user.count({ where: { subscriptionTier: 'pro' } }),
        prisma.user.count({ where: { subscriptionTier: 'enterprise' } }),
        prisma.user.count({ where: { isTrialActive: true } }),
        prisma.content.groupBy({
            by: ['type'],
            _count: { type: true },
            orderBy: { _count: { type: 'desc' } },
        }),
    ])

    // Calculate growth
    const userGrowth = usersLastMonth > 0 ? Math.round(((usersThisMonth - usersLastMonth) / usersLastMonth) * 100) : 100
    const contentGrowth = contentLastMonth > 0 ? Math.round(((contentThisMonth - contentLastMonth) / contentLastMonth) * 100) : 100

    // MRR
    const mrr = (proUsers * 29) + (enterpriseUsers * 99)
    const conversionRate = totalUsers > 0 ? Math.round(((proUsers + enterpriseUsers) / totalUsers) * 100) : 0

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-600">
                            <Shield className="h-6 w-6" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                            <p className="text-sm text-gray-500">Platform performance and growth metrics</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500">Total Users</span>
                            <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
                        <div className={`flex items-center gap-1 mt-2 text-sm ${userGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {userGrowth >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                            {Math.abs(userGrowth)}% vs last month
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500">Total Content</span>
                            <FileText className="h-5 w-5 text-purple-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalContent}</p>
                        <div className={`flex items-center gap-1 mt-2 text-sm ${contentGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {contentGrowth >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                            {Math.abs(contentGrowth)}% vs last month
                        </div>
                    </div>
                    <div className="bg-green-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-green-100">MRR</span>
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-3xl font-bold">${mrr}</p>
                        <p className="text-sm text-green-200 mt-2">{proUsers + enterpriseUsers} paying customers</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500">Conversion</span>
                            <BarChart3 className="h-5 w-5 text-orange-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{conversionRate}%</p>
                        <p className="text-sm text-gray-500 mt-2">Free to paid</p>
                    </div>
                </div>

                {/* Time-based Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* User Stats */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-500" />
                            User Growth
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">Today</span>
                                <span className="font-bold text-gray-900 dark:text-white">{usersToday}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">This Week</span>
                                <span className="font-bold text-gray-900 dark:text-white">{usersThisWeek}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">This Month</span>
                                <span className="font-bold text-gray-900 dark:text-white">{usersThisMonth}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">Last Month</span>
                                <span className="font-bold text-gray-900 dark:text-white">{usersLastMonth}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Stats */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-purple-500" />
                            Content Generation
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">Today</span>
                                <span className="font-bold text-gray-900 dark:text-white">{contentToday}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">This Week</span>
                                <span className="font-bold text-gray-900 dark:text-white">{contentThisWeek}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">This Month</span>
                                <span className="font-bold text-gray-900 dark:text-white">{contentThisMonth}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">Last Month</span>
                                <span className="font-bold text-gray-900 dark:text-white">{contentLastMonth}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscription Breakdown */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Subscription Distribution</h2>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <p className="text-3xl font-bold text-gray-600">{totalUsers - proUsers - enterpriseUsers - trialUsers}</p>
                            <p className="text-sm text-gray-500">Free</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-3xl font-bold text-blue-600">{trialUsers}</p>
                            <p className="text-sm text-blue-600">Trials</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-3xl font-bold text-green-600">{proUsers}</p>
                            <p className="text-sm text-green-600">Pro</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <p className="text-3xl font-bold text-purple-600">{enterpriseUsers}</p>
                            <p className="text-sm text-purple-600">Enterprise</p>
                        </div>
                    </div>
                </div>

                {/* Content by Type */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Popular Content Types</h2>
                    <div className="space-y-3">
                        {contentByType.map((item, index) => {
                            const percentage = totalContent > 0 ? (item._count.type / totalContent) * 100 : 0
                            return (
                                <div key={item.type}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-600 dark:text-gray-400 capitalize">{item.type.replace('-', ' ')}</span>
                                        <span className="text-gray-900 dark:text-white font-medium">{item._count.type}</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${index === 0 ? 'bg-blue-500' :
                                                index === 1 ? 'bg-purple-500' :
                                                    index === 2 ? 'bg-green-500' :
                                                        index === 3 ? 'bg-orange-500' :
                                                            'bg-gray-500'
                                                }`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
