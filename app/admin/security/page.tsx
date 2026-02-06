import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
import {
    Shield,
    AlertTriangle,
    Ban,
    Globe,
    Fingerprint,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    Activity,
    Lock,
    Unlock,
    RefreshCw,
    Download,
} from 'lucide-react'

export default async function AdminSecurityPage() {
    // SECURITY: Require admin
    await requireAdmin()

    // Get security stats
    const [
        flaggedUsers,
        blockedUsers,
        highRiskUsers,
        suspiciousActivities,
        recentActivities,
    ] = await Promise.all([
        prisma.user.count({ where: { isFlagged: true } }),
        prisma.user.count({ where: { isBlocked: true } }),
        prisma.user.count({ where: { riskScore: { gte: 50 } } }),
        prisma.suspiciousActivity.count(),
        prisma.suspiciousActivity.findMany({
            take: 20,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, name: true, email: true, isBlocked: true } },
            },
        }),
    ])

    // Get users with high risk scores
    const riskyUsers = await prisma.user.findMany({
        where: { riskScore: { gte: 30 } },
        orderBy: { riskScore: 'desc' },
        take: 20,
        select: {
            id: true,
            name: true,
            email: true,
            riskScore: true,
            isFlagged: true,
            isBlocked: true,
            flagReason: true,
            signupIp: true,
            lastIp: true,
            deviceFingerprint: true,
            createdAt: true,
        },
    })

    // Get unique IPs that have been flagged
    const flaggedIPs = await prisma.suspiciousActivity.groupBy({
        by: ['ip'],
        _count: { ip: true },
        orderBy: { _count: { ip: 'desc' } },
        take: 10,
    })

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/admin" className="text-gray-400 hover:text-gray-600">
                                <Shield className="h-6 w-6" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Security Center
                                </h1>
                                <p className="text-sm text-gray-500">IP tracking, fingerprints & fraud prevention</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Security Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            <span className="text-sm text-gray-500">Flagged Users</span>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{flaggedUsers}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Ban className="h-5 w-5 text-red-500" />
                            <span className="text-sm text-gray-500">Blocked Users</span>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{blockedUsers}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-5 w-5 text-orange-500" />
                            <span className="text-sm text-gray-500">High Risk (50+)</span>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{highRiskUsers}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Eye className="h-5 w-5 text-purple-500" />
                            <span className="text-sm text-gray-500">Total Alerts</span>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">{suspiciousActivities}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Suspicious Activities */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Activity className="h-5 w-5 text-red-500" />
                                Suspicious Activities
                            </h2>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
                            {recentActivities.length === 0 ? (
                                <p className="p-4 text-center text-gray-500">No suspicious activity</p>
                            ) : (
                                recentActivities.map((activity) => (
                                    <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`px-2 py-1 text-xs rounded font-medium ${activity.riskScore >= 80
                                                ? 'bg-red-100 text-red-700'
                                                : activity.riskScore >= 50
                                                    ? 'bg-orange-100 text-orange-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {activity.activityType}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                Risk: {activity.riskScore}
                                            </span>
                                        </div>
                                        <div className="text-sm space-y-1">
                                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Globe className="h-4 w-4" />
                                                IP: {activity.ip}
                                            </p>
                                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Fingerprint className="h-4 w-4" />
                                                FP: {activity.fingerprint?.slice(0, 16)}...
                                            </p>
                                            {activity.user && (
                                                <p className="text-gray-500">
                                                    User: {activity.user.email}
                                                    {activity.user.isBlocked && (
                                                        <span className="ml-2 text-xs text-red-600">(Blocked)</span>
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">
                                            {new Date(activity.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* High Risk Users */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-orange-500" />
                                High Risk Users
                            </h2>
                            <Link href="/admin/users?filter=high-risk" className="text-sm text-blue-600 hover:underline">
                                View All →
                            </Link>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
                            {riskyUsers.length === 0 ? (
                                <p className="p-4 text-center text-gray-500">No high-risk users</p>
                            ) : (
                                riskyUsers.map((user) => (
                                    <div key={user.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {user.name || user.email}
                                                </p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {user.isBlocked && (
                                                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                                                        Blocked
                                                    </span>
                                                )}
                                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${user.riskScore >= 80
                                                    ? 'bg-red-100 text-red-700'
                                                    : user.riskScore >= 50
                                                        ? 'bg-orange-100 text-orange-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {user.riskScore}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500 space-y-1">
                                            <p className="flex items-center gap-1">
                                                <Globe className="h-3 w-3" />
                                                {user.lastIp || user.signupIp || 'No IP'}
                                            </p>
                                            <p className="flex items-center gap-1">
                                                <Fingerprint className="h-3 w-3" />
                                                {user.deviceFingerprint?.slice(0, 20) || 'No fingerprint'}...
                                            </p>
                                            {user.flagReason && (
                                                <p className="text-yellow-600">Reason: {user.flagReason}</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Flagged IPs */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Globe className="h-5 w-5 text-blue-500" />
                            Most Flagged IP Addresses
                        </h2>
                    </div>
                    <div className="p-4">
                        {flaggedIPs.length === 0 ? (
                            <p className="text-center text-gray-500">No flagged IPs</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {flaggedIPs.map((ip) => (
                                    <div key={ip.ip} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                        <p className="font-mono text-sm text-gray-900 dark:text-white">{ip.ip}</p>
                                        <p className="text-xs text-gray-500">{ip._count.ip} flags</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
