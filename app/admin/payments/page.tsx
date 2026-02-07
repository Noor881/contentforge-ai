import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
import {
    Shield,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Calendar,
    CreditCard,
    RefreshCw,
    Download,
    ChevronRight,
    CheckCircle,
    XCircle,
    Clock,
} from 'lucide-react'

export default async function AdminPaymentsPage() {
    // SECURITY: Require admin
    await requireAdmin()

    // Get subscription data for revenue calculations
    const subscriptions = await prisma.subscription.findMany({
        where: { status: 'active' },
        include: {
            user: {
                select: { subscriptionTier: true },
            },
        },
    })

    // Calculate revenue
    let totalMRR = 0
    subscriptions.forEach((sub) => {
        if (sub.user.subscriptionTier === 'pro') totalMRR += 29
        else if (sub.user.subscriptionTier === 'enterprise') totalMRR += 99
    })

    const totalARR = totalMRR * 12

    // Get user counts for revenue breakdown
    const [freeUsers, proUsers, enterpriseUsers] = await Promise.all([
        prisma.user.count({ where: { subscriptionTier: 'free' } }),
        prisma.user.count({ where: { subscriptionTier: 'pro' } }),
        prisma.user.count({ where: { subscriptionTier: 'enterprise' } }),
    ])



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
                                    Payments & Revenue
                                </h1>
                                <p className="text-sm text-gray-500">Track payments and revenue metrics</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Revenue Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-6 w-6" />
                            <span className="text-green-100">Monthly Revenue (MRR)</span>
                        </div>
                        <p className="text-4xl font-bold">${totalMRR.toLocaleString()}</p>
                        <p className="text-sm text-green-200 mt-2">From {subscriptions.length} active subscriptions</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-6 w-6" />
                            <span className="text-blue-100">Annual Revenue (ARR)</span>
                        </div>
                        <p className="text-4xl font-bold">${totalARR.toLocaleString()}</p>
                        <p className="text-sm text-blue-200 mt-2">Projected yearly</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-6 w-6 text-purple-500" />
                            <span className="text-gray-500">Pro Users</span>
                        </div>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">{proUsers}</p>
                        <p className="text-sm text-gray-500 mt-2">${proUsers * 29}/mo revenue</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-6 w-6 text-indigo-500" />
                            <span className="text-gray-500">Enterprise Users</span>
                        </div>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">{enterpriseUsers}</p>
                        <p className="text-sm text-gray-500 mt-2">${enterpriseUsers * 99}/mo revenue</p>
                    </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Revenue Breakdown</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">Free Tier</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{freeUsers} users</span>
                                </div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-400" style={{ width: `${(freeUsers / (freeUsers + proUsers + enterpriseUsers)) * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">Pro ($29/mo)</span>
                                    <span className="font-medium text-green-600">${proUsers * 29}/mo</span>
                                </div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: `${(proUsers / (freeUsers + proUsers + enterpriseUsers)) * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">Enterprise ($99/mo)</span>
                                    <span className="font-medium text-purple-600">${enterpriseUsers * 99}/mo</span>
                                </div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500" style={{ width: `${(enterpriseUsers / (freeUsers + proUsers + enterpriseUsers)) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Revenue Metrics</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Avg Revenue Per User</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    ${subscriptions.length > 0 ? Math.round(totalMRR / subscriptions.length) : 0}
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {freeUsers + proUsers + enterpriseUsers > 0
                                        ? Math.round(((proUsers + enterpriseUsers) / (freeUsers + proUsers + enterpriseUsers)) * 100)
                                        : 0}%
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Total Customers</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {proUsers + enterpriseUsers}
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Lifetime Value (Est)</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    ${subscriptions.length > 0 ? Math.round((totalMRR / subscriptions.length) * 12) : 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Note about Stripe integration */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <CreditCard className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Stripe Integration Required</h3>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                For real-time payment tracking and transaction history, connect your Stripe account via the Stripe Dashboard webhook integration.
                                Payment data shown here is calculated from subscription records.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
