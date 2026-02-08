'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
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
    Trash2,
    UserPlus,
    UserMinus,
    Clock,
    Zap,
    Database,
    Key,
    CheckCircle,
    XCircle,
    Search,
} from 'lucide-react'

interface AdminUser {
    id: string
    name: string | null
    email: string
    createdAt: string
}

interface SystemStats {
    totalUsers: number
    totalContent: number
    adminCount: number
    databaseStatus: string
}

export default function AdminSettingsPage() {
    const [admins, setAdmins] = useState<AdminUser[]>([])
    const [stats, setStats] = useState<SystemStats>({ totalUsers: 0, totalContent: 0, adminCount: 0, databaseStatus: 'connected' })
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState<string | null>(null)
    const [newAdminEmail, setNewAdminEmail] = useState('')
    const [addingAdmin, setAddingAdmin] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/settings')
            if (res.ok) {
                const data = await res.json()
                setAdmins(data.admins || [])
                setStats(data.stats || { totalUsers: 0, totalContent: 0, adminCount: 0, databaseStatus: 'connected' })
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handlePromoteAdmin = async () => {
        if (!newAdminEmail.trim()) {
            toast.error('Please enter an email address')
            return
        }
        setAddingAdmin(true)
        try {
            const res = await fetch('/api/admin/settings/promote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: newAdminEmail.trim() }),
            })
            const data = await res.json()
            if (res.ok) {
                toast.success(data.message || 'User promoted to admin')
                setNewAdminEmail('')
                fetchData()
            } else {
                toast.error(data.error || 'Failed to promote user')
            }
        } catch (error) {
            toast.error('Failed to promote user')
        } finally {
            setAddingAdmin(false)
        }
    }

    const handleRemoveAdmin = async (userId: string, email: string) => {
        if (!confirm(`Remove admin privileges from ${email}?`)) return
        setActionLoading(userId)
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'removeAdmin' }),
            })
            if (res.ok) {
                toast.success('Admin privileges removed')
                fetchData()
            } else {
                toast.error('Failed to remove admin')
            }
        } catch (error) {
            toast.error('Failed to remove admin')
        } finally {
            setActionLoading(null)
        }
    }

    const handleResetAllUsage = async () => {
        if (!confirm('This will reset monthly usage counters for ALL users. Continue?')) return
        setActionLoading('reset-usage')
        try {
            const res = await fetch('/api/admin/settings/reset-usage', { method: 'POST' })
            if (res.ok) {
                toast.success('All monthly usage counters reset')
            } else {
                toast.error('Failed to reset usage')
            }
        } catch (error) {
            toast.error('Operation failed')
        } finally {
            setActionLoading(null)
        }
    }

    const handleClearSecurityAlerts = async () => {
        if (!confirm('Clear all resolved security alerts? This cannot be undone.')) return
        setActionLoading('clear-alerts')
        try {
            const res = await fetch('/api/admin/settings/clear-alerts', { method: 'POST' })
            if (res.ok) {
                toast.success('Security alerts cleared')
            } else {
                toast.error('Failed to clear alerts')
            }
        } catch (error) {
            toast.error('Operation failed')
        } finally {
            setActionLoading(null)
        }
    }

    const envVars = [
        { name: 'GROQ_API_KEY', label: 'Groq AI', critical: true },
        { name: 'NEXTAUTH_SECRET', label: 'NextAuth', critical: true },
        { name: 'DATABASE_URL', label: 'Database', critical: true },
        { name: 'GOOGLE_CLIENT_ID', label: 'Google OAuth', critical: false },
        { name: 'PAYPAL_CLIENT_ID', label: 'PayPal', critical: false },
        { name: 'STRIPE_SECRET_KEY', label: 'Stripe', critical: false },
        { name: 'RESEND_API_KEY', label: 'Email (Resend)', critical: false },
    ]

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading settings...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Settings className="h-7 w-7 text-gray-500" />
                    Settings & Configuration
                </h1>
                <p className="text-gray-500 mt-1">System configuration, admin management, and maintenance tools</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Admin Users Management */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Shield className="h-5 w-5 text-red-500" />
                            Admin Users ({admins.length})
                        </h2>
                    </div>
                    <div className="p-4 space-y-3">
                        {admins.map((adminUser) => (
                            <div key={adminUser.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {adminUser.name || 'No name'}
                                    </p>
                                    <p className="text-sm text-gray-500">{adminUser.email}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded font-medium">
                                        Admin
                                    </span>
                                    {admins.length > 1 && (
                                        <button
                                            onClick={() => handleRemoveAdmin(adminUser.id, adminUser.email)}
                                            disabled={actionLoading === adminUser.id}
                                            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-red-600"
                                            title="Remove admin privileges"
                                        >
                                            <UserMinus className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Add New Admin */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Promote User to Admin
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Enter user email..."
                                        value={newAdminEmail}
                                        onChange={(e) => setNewAdminEmail(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                                        onKeyDown={(e) => e.key === 'Enter' && handlePromoteAdmin()}
                                    />
                                </div>
                                <button
                                    onClick={handlePromoteAdmin}
                                    disabled={addingAdmin || !newAdminEmail.trim()}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 text-sm font-medium"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    {addingAdmin ? 'Promoting...' : 'Promote'}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                The user must already have an account. Enter their registered email address.
                            </p>
                        </div>
                    </div>
                </div>

                {/* System Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Database className="h-5 w-5 text-blue-500" />
                            System Overview
                        </h2>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-400">Total Users</span>
                            <span className="font-bold text-gray-900 dark:text-white">{stats.totalUsers}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-400">Total Content</span>
                            <span className="font-bold text-gray-900 dark:text-white">{stats.totalContent}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-400">Admin Users</span>
                            <span className="font-bold text-gray-900 dark:text-white">{stats.adminCount}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-400">Database</span>
                            <span className="font-bold text-green-600 flex items-center gap-1">
                                <CheckCircle className="h-4 w-4" />
                                Connected
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-400">Node.js Runtime</span>
                            <span className="font-mono text-sm text-gray-900 dark:text-white">v18+</span>
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
                            <p className="text-sm text-gray-500">3 generations (lifetime)</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div className="flex justify-between mb-1">
                                <span className="font-medium text-gray-900 dark:text-white">Starter</span>
                                <span className="text-gray-500">$19/mo</span>
                            </div>
                            <p className="text-sm text-gray-500">50 generations/month</p>
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
                    <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">IP Tracking</p>
                                <p className="text-sm text-gray-500">Track user IP addresses</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Enabled
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Device Fingerprinting</p>
                                <p className="text-sm text-gray-500">Browser fingerprint tracking</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Enabled
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Risk Scoring</p>
                                <p className="text-sm text-gray-500">Automatic fraud detection</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Enabled
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Admin Route Protection</p>
                                <p className="text-sm text-gray-500">Server-side admin verification</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Enabled
                            </span>
                        </div>
                    </div>
                </div>

                {/* Maintenance Tools */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            Maintenance Tools
                        </h2>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={handleResetAllUsage}
                            disabled={actionLoading === 'reset-usage'}
                            className="flex flex-col items-center gap-3 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all group disabled:opacity-50"
                        >
                            <RefreshCw className={`h-8 w-8 text-blue-600 ${actionLoading === 'reset-usage' ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                            <div className="text-center">
                                <p className="font-medium text-blue-700 dark:text-blue-400">Reset Monthly Usage</p>
                                <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">Reset all user generation counters to 0</p>
                            </div>
                        </button>

                        <button
                            onClick={handleClearSecurityAlerts}
                            disabled={actionLoading === 'clear-alerts'}
                            className="flex flex-col items-center gap-3 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-2 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 transition-all group disabled:opacity-50"
                        >
                            <AlertTriangle className={`h-8 w-8 text-orange-600 ${actionLoading === 'clear-alerts' ? 'animate-pulse' : ''}`} />
                            <div className="text-center">
                                <p className="font-medium text-orange-700 dark:text-orange-400">Clear Security Alerts</p>
                                <p className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-1">Remove all resolved suspicious activity logs</p>
                            </div>
                        </button>

                        <button
                            onClick={() => fetchData()}
                            className="flex flex-col items-center gap-3 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transition-all group"
                        >
                            <Database className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
                            <div className="text-center">
                                <p className="font-medium text-green-700 dark:text-green-400">Refresh Data</p>
                                <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-1">Reload all admin panel data</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Environment Status */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Key className="h-5 w-5 text-purple-500" />
                            Environment & API Keys Status
                        </h2>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {envVars.map((env) => (
                                <div
                                    key={env.name}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{env.label}</p>
                                        <p className="text-xs text-gray-500 font-mono">{env.name}</p>
                                    </div>
                                    {env.critical ? (
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    ) : (
                                        <span className="text-xs text-gray-400">Optional</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            Configure API keys in Vercel Dashboard → Settings → Environment Variables
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
