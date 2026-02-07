'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Users,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    Ban,
    CheckCircle,
    Trash2,
    Eye,
    Shield,
    AlertTriangle,
    Mail,
    CreditCard,
    Edit,
    MoreVertical,
    Download,
    RefreshCw,
    UserCog,
    Fingerprint,
    Globe,
    Clock,
    BarChart3,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface User {
    id: string
    name: string | null
    email: string
    image: string | null
    isAdmin: boolean
    isBlocked: boolean
    blockReason: string | null
    isFlagged: boolean
    flagReason: string | null
    riskScore: number
    subscriptionStatus: string
    subscriptionTier: string
    trialEndDate: string | null
    monthlyUsageCount: number
    totalGenerationCount: number
    signupIp: string | null
    lastIp: string | null
    deviceFingerprint: string | null
    createdAt: string
    updatedAt: string
    _count?: {
        content: number
    }
}

function AdminUsersContent() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [totalUsers, setTotalUsers] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [showUserModal, setShowUserModal] = useState(false)
    const [actionLoading, setActionLoading] = useState<string | null>(null)
    const [bulkLoading, setBulkLoading] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams()
    const perPage = 20

    useEffect(() => {
        const filterParam = searchParams.get('filter')
        if (filterParam) setFilter(filterParam)
    }, [searchParams])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: perPage.toString(),
                search,
                filter,
            })
            const res = await fetch(`/api/admin/users?${params}`)
            const data = await res.json()
            if (res.ok) {
                setUsers(data.users)
                setTotalUsers(data.total)
            } else {
                toast.error(data.error || 'Failed to fetch users')
            }
        } catch (error) {
            toast.error('Failed to fetch users')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [currentPage, filter])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setCurrentPage(1)
        fetchUsers()
    }

    const handleAction = async (userId: string, action: string, data?: any) => {
        setActionLoading(userId)
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, ...data }),
            })
            const result = await res.json()
            if (res.ok) {
                toast.success(result.message || 'Action completed')
                fetchUsers()
                if (selectedUser?.id === userId) {
                    setSelectedUser(null)
                    setShowUserModal(false)
                }
            } else {
                toast.error(result.error || 'Action failed')
            }
        } catch (error) {
            toast.error('Action failed')
        } finally {
            setActionLoading(null)
        }
    }

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to DELETE this user? This cannot be undone.')) return
        setActionLoading(userId)
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                toast.success('User deleted')
                fetchUsers()
                setShowUserModal(false)
            } else {
                toast.error('Failed to delete user')
            }
        } catch (error) {
            toast.error('Failed to delete user')
        } finally {
            setActionLoading(null)
        }
    }

    const handleBulkAction = async (action: string) => {
        if (selectedUsers.length === 0) return
        const count = selectedUsers.length
        if (!confirm(`Are you sure you want to ${action} ${count} user(s)?`)) return
        setBulkLoading(true)
        let successCount = 0
        for (const userId of selectedUsers) {
            try {
                if (action === 'delete') {
                    const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
                    if (res.ok) successCount++
                } else {
                    const res = await fetch(`/api/admin/users/${userId}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action }),
                    })
                    if (res.ok) successCount++
                }
            } catch (error) {
                console.error(`Failed ${action} for user ${userId}:`, error)
            }
        }
        toast.success(`${action} completed for ${successCount}/${count} users`)
        setSelectedUsers([])
        setBulkLoading(false)
        fetchUsers()
    }

    const handleExportCSV = () => {
        const headers = ['Name', 'Email', 'Subscription', 'Status', 'Usage', 'Risk Score', 'Blocked', 'Flagged', 'Admin', 'Joined']
        const rows = users.map(u => [
            u.name || 'No name',
            u.email,
            u.subscriptionTier,
            u.subscriptionStatus,
            u.monthlyUsageCount,
            u.riskScore,
            u.isBlocked ? 'Yes' : 'No',
            u.isFlagged ? 'Yes' : 'No',
            u.isAdmin ? 'Yes' : 'No',
            new Date(u.createdAt).toLocaleDateString(),
        ])
        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        URL.revokeObjectURL(url)
        toast.success('Users exported to CSV')
    }

    const toggleSelectUser = (userId: string) => {
        setSelectedUsers(prev =>
            prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
        )
    }

    const toggleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([])
        } else {
            setSelectedUsers(users.map(u => u.id))
        }
    }

    const totalPages = Math.ceil(totalUsers / perPage)

    const filterOptions = [
        { value: 'all', label: 'All Users' },
        { value: 'active', label: 'Active Subscriptions' },
        { value: 'trial', label: 'Trial Users' },
        { value: 'free', label: 'Free Users' },
        { value: 'flagged', label: 'Flagged' },
        { value: 'blocked', label: 'Blocked' },
        { value: 'admin', label: 'Admins' },
        { value: 'high-risk', label: 'High Risk (50+)' },
    ]

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
                                    User Management
                                </h1>
                                <p className="text-sm text-gray-500">{totalUsers} total users</p>
                            </div>
                        </div>
                        <button
                            onClick={() => fetchUsers()}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search & Filter Bar */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, IP, or fingerprint..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Search
                            </button>
                        </form>

                        {/* Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-400" />
                            <select
                                value={filter}
                                onChange={(e) => {
                                    setFilter(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                {filterOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Export */}
                        <button
                            onClick={handleExportCSV}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                        >
                            <Download className="h-4 w-4" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {selectedUsers.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                            {selectedUsers.length} user(s) selected
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => handleBulkAction('block')}
                                disabled={bulkLoading}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                <Ban className="h-3.5 w-3.5" /> Block All
                            </button>
                            <button
                                onClick={() => handleBulkAction('unblock')}
                                disabled={bulkLoading}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                                <CheckCircle className="h-3.5 w-3.5" /> Unblock All
                            </button>
                            <button
                                onClick={() => handleBulkAction('resetUsage')}
                                disabled={bulkLoading}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className="h-3.5 w-3.5" /> Reset Usage
                            </button>
                            <button
                                onClick={() => handleBulkAction('delete')}
                                disabled={bulkLoading}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-800 text-white rounded-lg text-sm font-medium hover:bg-red-900 transition-colors disabled:opacity-50"
                            >
                                <Trash2 className="h-3.5 w-3.5" /> Delete All
                            </button>
                            <button
                                onClick={() => setSelectedUsers([])}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                )}

                {/* Users Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.length === users.length && users.length > 0}
                                            onChange={toggleSelectAll}
                                            className="rounded border-gray-300"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        User
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Subscription
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Usage
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Risk
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        IP / Fingerprint
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Joined
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {loading ? (
                                    <tr>
                                        <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            {/* Checkbox */}
                                            <td className="px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(user.id)}
                                                    onChange={() => toggleSelectUser(user.id)}
                                                    className="rounded border-gray-300"
                                                />
                                            </td>
                                            {/* User Info */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                        {(user.name || user.email)[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                            {user.name || 'No name'}
                                                            {user.isAdmin && (
                                                                <span className="px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded">
                                                                    Admin
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {user.isBlocked && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                                                            <Ban className="h-3 w-3" /> Blocked
                                                        </span>
                                                    )}
                                                    {user.isFlagged && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                                                            <AlertTriangle className="h-3 w-3" /> Flagged
                                                        </span>
                                                    )}
                                                    {!user.isBlocked && !user.isFlagged && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                                            <CheckCircle className="h-3 w-3" /> Active
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Subscription */}
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col">
                                                    <span className={`text-sm font-medium ${user.subscriptionTier === 'pro' || user.subscriptionTier === 'enterprise'
                                                        ? 'text-green-600'
                                                        : 'text-gray-600'
                                                        }`}>
                                                        {user.subscriptionTier.toUpperCase()}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {user.subscriptionStatus}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Usage */}
                                            <td className="px-4 py-4">
                                                <div className="text-sm">
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {user.monthlyUsageCount}
                                                    </span>
                                                    <span className="text-gray-500">/mo</span>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {user.totalGenerationCount} total
                                                </p>
                                            </td>

                                            {/* Risk Score */}
                                            <td className="px-4 py-4">
                                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${user.riskScore >= 80
                                                    ? 'bg-red-100 text-red-700'
                                                    : user.riskScore >= 50
                                                        ? 'bg-orange-100 text-orange-700'
                                                        : user.riskScore >= 20
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-green-100 text-green-700'
                                                    }`}>
                                                    {user.riskScore}
                                                </div>
                                            </td>

                                            {/* IP / Fingerprint */}
                                            <td className="px-4 py-4">
                                                <div className="text-xs space-y-1">
                                                    <p className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                                        <Globe className="h-3 w-3" />
                                                        {user.lastIp || user.signupIp || 'N/A'}
                                                    </p>
                                                    <p className="flex items-center gap-1 text-gray-500">
                                                        <Fingerprint className="h-3 w-3" />
                                                        {user.deviceFingerprint?.slice(0, 12) || 'N/A'}...
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Joined */}
                                            <td className="px-4 py-4">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </p>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user)
                                                            setShowUserModal(true)
                                                        }}
                                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (user.isBlocked) {
                                                                handleAction(user.id, 'unblock')
                                                            } else {
                                                                const reason = prompt('Enter block reason (optional):')
                                                                handleAction(user.id, 'block', { reason: reason || 'Blocked by admin' })
                                                            }
                                                        }}
                                                        disabled={actionLoading === user.id}
                                                        className={`p-2 rounded-lg transition-colors ${user.isBlocked
                                                            ? 'hover:bg-green-100 text-green-600'
                                                            : 'hover:bg-red-100 text-red-600'
                                                            }`}
                                                        title={user.isBlocked ? 'Unblock' : 'Block'}
                                                    >
                                                        {user.isBlocked ? (
                                                            <CheckCircle className="h-4 w-4" />
                                                        ) : (
                                                            <Ban className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        disabled={actionLoading === user.id}
                                                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {(currentPage - 1) * perPage + 1} to{' '}
                            {Math.min(currentPage * perPage, totalUsers)} of {totalUsers} users
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 text-sm">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Detail Modal */}
            {showUserModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                User Details
                            </h2>
                            <button
                                onClick={() => setShowUserModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Profile Section */}
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                    {(selectedUser.name || selectedUser.email)[0].toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {selectedUser.name || 'No name'}
                                    </h3>
                                    <p className="text-gray-500">{selectedUser.email}</p>
                                </div>
                            </div>

                            {/* Status Badges */}
                            <div className="flex flex-wrap gap-2">
                                {selectedUser.isAdmin && (
                                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                        Admin
                                    </span>
                                )}
                                {selectedUser.isBlocked && (
                                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                        Blocked: {selectedUser.blockReason || 'No reason'}
                                    </span>
                                )}
                                {selectedUser.isFlagged && (
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                        Flagged: {selectedUser.flagReason || 'No reason'}
                                    </span>
                                )}
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedUser.subscriptionTier === 'pro'
                                    ? 'bg-green-100 text-green-700'
                                    : selectedUser.subscriptionTier === 'enterprise'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {selectedUser.subscriptionTier.toUpperCase()}
                                </span>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Subscription Status</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {selectedUser.subscriptionStatus}
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Risk Score</p>
                                    <p className={`font-medium ${selectedUser.riskScore >= 50 ? 'text-red-600' : 'text-green-600'
                                        }`}>
                                        {selectedUser.riskScore}
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Monthly Usage</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {selectedUser.monthlyUsageCount} generations
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Total Generations</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {selectedUser.totalGenerationCount}
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Signup IP</p>
                                    <p className="font-mono text-sm text-gray-900 dark:text-white">
                                        {selectedUser.signupIp || 'N/A'}
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Last IP</p>
                                    <p className="font-mono text-sm text-gray-900 dark:text-white">
                                        {selectedUser.lastIp || 'N/A'}
                                    </p>
                                </div>
                                <div className="col-span-2 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Device Fingerprint</p>
                                    <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
                                        {selectedUser.deviceFingerprint || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                {/* Plan Assignment */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Assign Plan
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                            defaultValue={selectedUser.subscriptionTier}
                                            onChange={(e) => {
                                                handleAction(selectedUser.id, 'assignPlan', { tier: e.target.value })
                                            }}
                                            disabled={actionLoading === selectedUser.id}
                                        >
                                            <option value="free">Free ($0)</option>
                                            <option value="trial">Trial (3 days Pro access)</option>
                                            <option value="starter">Starter ($19/month)</option>
                                            <option value="pro">Pro ($49/month)</option>
                                            <option value="enterprise">Enterprise ($199/month)</option>
                                        </select>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Current: {selectedUser.subscriptionTier} • Status: {selectedUser.subscriptionStatus}</p>
                                </div>

                                {/* Extend Trial */}
                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Extend Trial
                                    </label>
                                    <div className="flex gap-2">
                                        {[3, 7, 14, 30].map(days => (
                                            <button
                                                key={days}
                                                onClick={() => handleAction(selectedUser.id, 'extendTrial', { days })}
                                                disabled={actionLoading === selectedUser.id}
                                                className="flex-1 px-3 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors disabled:opacity-50"
                                            >
                                                {days}d
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Trial end: {selectedUser.trialEndDate ? new Date(selectedUser.trialEndDate).toLocaleDateString() : 'No active trial'}
                                    </p>
                                </div>

                                {/* Quick Actions Row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => {
                                            if (selectedUser.isBlocked) {
                                                handleAction(selectedUser.id, 'unblock')
                                            } else {
                                                const reason = prompt('Enter block reason (optional):')
                                                handleAction(selectedUser.id, 'block', { reason: reason || 'Blocked by admin' })
                                            }
                                        }}
                                        disabled={actionLoading === selectedUser.id}
                                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${selectedUser.isBlocked
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-red-600 text-white hover:bg-red-700'
                                            }`}
                                    >
                                        {selectedUser.isBlocked ? <CheckCircle className="h-5 w-5" /> : <Ban className="h-5 w-5" />}
                                        {selectedUser.isBlocked ? 'Unblock User' : 'Block User'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            const reason = prompt('Enter flag reason:')
                                            if (reason) {
                                                handleAction(selectedUser.id, 'flag', { reason })
                                            }
                                        }}
                                        disabled={actionLoading === selectedUser.id || selectedUser.isFlagged}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50"
                                    >
                                        <AlertTriangle className="h-5 w-5" />
                                        {selectedUser.isFlagged ? 'Already Flagged' : 'Flag User'}
                                    </button>
                                    <button
                                        onClick={() => handleAction(selectedUser.id, 'clearFlags')}
                                        disabled={actionLoading === selectedUser.id || !selectedUser.isFlagged}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50"
                                    >
                                        <CheckCircle className="h-5 w-5" />
                                        Clear Flags
                                    </button>
                                    <button
                                        onClick={() => handleAction(selectedUser.id, 'resetUsage')}
                                        disabled={actionLoading === selectedUser.id}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        <RefreshCw className="h-5 w-5" />
                                        Reset Usage
                                    </button>
                                    <button
                                        onClick={() => handleAction(selectedUser.id, selectedUser.isAdmin ? 'removeAdmin' : 'makeAdmin')}
                                        disabled={actionLoading === selectedUser.id}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                                    >
                                        <Shield className="h-5 w-5" />
                                        {selectedUser.isAdmin ? 'Remove Admin' : 'Make Admin'}
                                    </button>
                                    <button
                                        onClick={() => handleAction(selectedUser.id, 'cancelSubscription')}
                                        disabled={actionLoading === selectedUser.id || selectedUser.subscriptionStatus === 'free' || selectedUser.subscriptionStatus === 'none'}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
                                    >
                                        <CreditCard className="h-5 w-5" />
                                        Cancel Subscription
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(selectedUser.id)}
                                        disabled={actionLoading === selectedUser.id}
                                        className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors border-2 border-red-700"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                        Delete User Permanently
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function AdminUsersPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading users...</p>
                </div>
            </div>
        }>
            <AdminUsersContent />
        </Suspense>
    )
}
