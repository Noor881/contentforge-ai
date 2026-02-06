import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
import {
    Shield,
    CreditCard,
    Users,
    TrendingUp,
    DollarSign,
    Calendar,
    RefreshCw,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Clock,
    ChevronRight,
} from 'lucide-react'

export default async function AdminSubscriptionsPage() {
    // SECURITY: Require admin
    await requireAdmin()

    // Get subscription stats
    const [
        totalSubscriptions,
        activeSubscriptions,
        cancelledSubscriptions,
        trialUsers,
        proUsers,
        enterpriseUsers,
    ] = await Promise.all([
        prisma.subscription.count(),
        prisma.subscription.count({ where: { status: 'active' } }),
        prisma.subscription.count({ where: { status: 'cancelled' } }),
        prisma.user.count({ where: { isTrialActive: true } }),
        prisma.user.count({ where: { subscriptionTier: 'pro' } }),
        prisma.user.count({ where: { subscriptionTier: 'enterprise' } }),
    ])

    // Get all subscriptions with user info
    const subscriptions = await prisma.subscription.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    subscriptionStatus: true,
                    subscriptionTier: true,
                    isBlocked: true,
                    createdAt: true,
                },
            },
        },
    })

    // Calculate MRR
    const mrr = (proUsers * 29) + (enterpriseUsers * 99)

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
                                    Subscription Management
                                </h1>
                                <p className="text-sm text-gray-500">Manage all user subscriptions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-5 w-5 text-blue-500" />
                            <span className="text-sm text-gray-500">Total</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSubscriptions}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-gray-500">Active</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{activeSubscriptions}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-5 w-5 text-yellow-500" />
                            <span className="text-sm text-gray-500">Trials</span>
                        </div>
                        <p className="text-2xl font-bold text-yellow-600">{trialUsers}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-5 w-5 text-purple-500" />
                            <span className="text-sm text-gray-500">Pro</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{proUsers}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="h-5 w-5 text-indigo-500" />
                            <span className="text-sm text-gray-500">Enterprise</span>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">{enterpriseUsers}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-white" />
                            <span className="text-sm text-green-100">MRR</span>
                        </div>
                        <p className="text-2xl font-bold text-white">${mrr}</p>
                    </div>
                </div>

                {/* Subscriptions Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="font-semibold text-gray-900 dark:text-white">All Subscriptions</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stripe ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period End</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {subscriptions.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                            No subscriptions found
                                        </td>
                                    </tr>
                                ) : (
                                    subscriptions.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {sub.user.name || 'No name'}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{sub.user.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-1 text-xs rounded font-medium ${sub.tier === 'enterprise'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : sub.tier === 'pro'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {sub.tier.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-1 text-xs rounded font-medium ${sub.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : sub.status === 'past_due'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : sub.status === 'cancelled'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <p className="text-xs font-mono text-gray-500">
                                                    {sub.stripeSubscriptionId?.slice(0, 20) || 'N/A'}...
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600">
                                                {sub.stripeCurrentPeriodEnd
                                                    ? new Date(sub.stripeCurrentPeriodEnd).toLocaleDateString()
                                                    : 'N/A'}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600">
                                                {new Date(sub.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <Link
                                                    href={`/admin/users?search=${sub.user.email}`}
                                                    className="text-blue-600 hover:underline text-sm"
                                                >
                                                    View User →
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
