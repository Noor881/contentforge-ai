import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
import {
    Shield,
    Settings,
    Users,
    DollarSign,
    Mail,
    Globe,
    Lock,
    AlertTriangle,
    Save,
    RefreshCw,
} from 'lucide-react'

export default async function AdminSettingsPage() {
    // SECURITY: Require admin
    const admin = await requireAdmin()

    // Get admin users
    const admins = await prisma.user.findMany({
        where: { isAdmin: true },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    })

    // Get system stats
    const [totalUsers, totalContent] = await Promise.all([
        prisma.user.count(),
        prisma.content.count(),
    ])

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
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                            <p className="text-sm text-gray-500">System configuration and admin management</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Admin Users */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Shield className="h-5 w-5 text-red-500" />
                                Admin Users
                            </h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {admins.map((adminUser) => (
                                <div key={adminUser.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {adminUser.name || adminUser.email}
                                        </p>
                                        <p className="text-sm text-gray-500">{adminUser.email}</p>
                                    </div>
                                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                                        Admin
                                    </span>
                                </div>
                            ))}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-500 mb-2">To add a new admin, run this SQL:</p>
                                <code className="block p-3 bg-gray-900 text-green-400 rounded text-sm overflow-x-auto">
                                    UPDATE "User" SET "isAdmin" = true WHERE email = 'user@email.com';
                                </code>
                            </div>
                        </div>
                    </div>

                    {/* System Stats */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Settings className="h-5 w-5 text-gray-500" />
                                System Overview
                            </h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">Total Users</span>
                                <span className="font-bold text-gray-900 dark:text-white">{totalUsers}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">Total Content</span>
                                <span className="font-bold text-gray-900 dark:text-white">{totalContent}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">Admin Users</span>
                                <span className="font-bold text-gray-900 dark:text-white">{admins.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">Database</span>
                                <span className="font-bold text-green-600">Connected</span>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Configuration */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-green-500" />
                                Pricing Tiers
                            </h2>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-gray-900 dark:text-white">Free</span>
                                    <span className="text-gray-500">$0/mo</span>
                                </div>
                                <p className="text-sm text-gray-500">10 generations/month</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-gray-900 dark:text-white">Starter</span>
                                    <span className="text-gray-500">$19/mo</span>
                                </div>
                                <p className="text-sm text-gray-500">100 generations/month</p>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-green-700 dark:text-green-400">Pro (Popular)</span>
                                    <span className="text-green-600">$49/mo</span>
                                </div>
                                <p className="text-sm text-green-600">500 generations/month</p>
                            </div>
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-purple-700 dark:text-purple-400">Enterprise</span>
                                    <span className="text-purple-600">$199/mo</span>
                                </div>
                                <p className="text-sm text-purple-600">Unlimited generations</p>
                            </div>
                            <p className="text-xs text-gray-500 pt-2">
                                Edit pricing in: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">config/pricing.ts</code>
                            </p>
                        </div>
                    </div>

                    {/* Security Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Lock className="h-5 w-5 text-blue-500" />
                                Security Settings
                            </h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">IP Tracking</p>
                                    <p className="text-sm text-gray-500">Track user IP addresses</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Fingerprinting</p>
                                    <p className="text-sm text-gray-500">Device fingerprint tracking</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Risk Scoring</p>
                                    <p className="text-sm text-gray-500">Automatic fraud detection</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Admin Protection</p>
                                    <p className="text-sm text-gray-500">Admin-only route protection</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Enabled</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Environment Variables Note */}
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-blue-800 dark:text-blue-200">Environment Variables</h3>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                To configure PayPal, Stripe, or other services, update your environment variables in Vercel Dashboard or .env file.
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                <code className="bg-blue-100 dark:bg-blue-800 p-2 rounded">PAYPAL_CLIENT_ID</code>
                                <code className="bg-blue-100 dark:bg-blue-800 p-2 rounded">PAYPAL_CLIENT_SECRET</code>
                                <code className="bg-blue-100 dark:bg-blue-800 p-2 rounded">STRIPE_SECRET_KEY</code>
                                <code className="bg-blue-100 dark:bg-blue-800 p-2 rounded">GROQ_API_KEY</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
