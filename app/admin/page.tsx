import { requireAdmin, getAdminStats } from '@/lib/admin'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
import {
    Users,
    CreditCard,
    BarChart3,
    Shield,
    FileText,
    Settings,
    AlertTriangle,
    DollarSign,
    Activity,
    TrendingUp,
    UserCheck,
    UserX,
    Eye,
    Globe,
    Fingerprint,
    Clock,
} from 'lucide-react'

export default async function AdminDashboard() {
    // SECURITY: Require admin or redirect
    const admin = await requireAdmin()

    // Get comprehensive stats
    const stats = await getAdminStats()

    // Get recent activity
    const recentUsers = await prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            subscriptionStatus: true,
            isBlocked: true,
            isFlagged: true,
        },
    })

    const recentContent = await prisma.content.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true, email: true } },
        },
    })

    const suspiciousActivities = await prisma.suspiciousActivity.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true, email: true } },
        },
    })

    // Calculate revenue (from subscriptions)
    const paidSubscriptions = await prisma.subscription.count({
        where: { status: 'active' },
    })
    const estimatedMRR = paidSubscriptions * 29 // Average price

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Admin Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Shield className="h-8 w-8 text-red-600" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Admin Dashboard
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Welcome, {admin.name || admin.email}
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard"
                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                            ← Back to App
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                    {[
                        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue' },
                        { label: 'Active Trials', value: stats.activeTrialUsers, icon: Clock, color: 'yellow' },
                        { label: 'Paid Users', value: stats.paidUsers, icon: UserCheck, color: 'green' },
                        { label: 'Flagged', value: stats.flaggedUsers, icon: AlertTriangle, color: 'orange' },
                        { label: 'Blocked', value: stats.blockedUsers, icon: UserX, color: 'red' },
                        { label: 'Est. MRR', value: `$${estimatedMRR}`, icon: DollarSign, color: 'emerald' },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
                                <span className="text-sm text-gray-500">{stat.label}</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Content Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-purple-600 rounded-xl p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-5 w-5" />
                            <span className="text-purple-100">Total Content</span>
                        </div>
                        <p className="text-3xl font-bold">{stats.totalContent}</p>
                    </div>
                    <div className="bg-green-600 rounded-xl p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-5 w-5" />
                            <span className="text-green-100">Generated Today</span>
                        </div>
                        <p className="text-3xl font-bold">{stats.contentToday}</p>
                    </div>
                    <div className="bg-orange-600 rounded-xl p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5" />
                            <span className="text-orange-100">Security Alerts</span>
                        </div>
                        <p className="text-3xl font-bold">{suspiciousActivities.length}</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Users */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Recent Users
                            </h2>
                            <Link href="/admin/users" className="text-sm text-blue-600 hover:underline">
                                View All →
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {recentUsers.map((user) => (
                                <div key={user.id} className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {user.name || 'No name'}
                                        </p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {user.isFlagged && (
                                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                                                Flagged
                                            </span>
                                        )}
                                        {user.isBlocked && (
                                            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                                Blocked
                                            </span>
                                        )}
                                        <span className={`px-2 py-1 text-xs rounded ${user.subscriptionStatus === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : user.subscriptionStatus === 'trial'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.subscriptionStatus}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security Alerts */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Shield className="h-5 w-5 text-red-500" />
                                Security Alerts
                            </h2>
                            <Link href="/admin/security" className="text-sm text-blue-600 hover:underline">
                                View All →
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {suspiciousActivities.length === 0 ? (
                                <p className="p-4 text-gray-500 text-center">No security alerts</p>
                            ) : (
                                suspiciousActivities.map((activity) => (
                                    <div key={activity.id} className="p-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-red-600">{activity.activityType}</span>
                                            <span className="text-xs text-gray-500">
                                                Risk: {activity.riskScore}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            IP: {activity.ip} | FP: {activity.fingerprint?.slice(0, 12)}...
                                        </p>
                                        {activity.user && (
                                            <p className="text-xs text-gray-500">
                                                User: {activity.user.email}
                                            </p>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Recent Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Recent Content
                            </h2>
                            <Link href="/admin/content" className="text-sm text-blue-600 hover:underline">
                                View All →
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {recentContent.map((content) => (
                                <div key={content.id} className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                                            {content.title}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                                            {content.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        By: {content.user?.email}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Quick Actions
                            </h2>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-3">
                            <Link
                                href="/admin/users?filter=flagged"
                                className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-700 dark:text-yellow-400 hover:bg-yellow-100 transition-colors"
                            >
                                <AlertTriangle className="h-5 w-5" />
                                <span className="text-sm font-medium">Review Flagged</span>
                            </Link>
                            <Link
                                href="/admin/security"
                                className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-400 hover:bg-red-100 transition-colors"
                            >
                                <Shield className="h-5 w-5" />
                                <span className="text-sm font-medium">Security Center</span>
                            </Link>
                            <Link
                                href="/admin/payments"
                                className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-400 hover:bg-green-100 transition-colors"
                            >
                                <DollarSign className="h-5 w-5" />
                                <span className="text-sm font-medium">View Payments</span>
                            </Link>
                            <Link
                                href="/admin/analytics"
                                className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                            >
                                <BarChart3 className="h-5 w-5" />
                                <span className="text-sm font-medium">Analytics</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
