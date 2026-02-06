'use client'

import { useEffect, useState } from 'react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import toast from 'react-hot-toast'
import { Search, Ban, Flag, X, Shield, Trash2, Check } from 'lucide-react'

interface User {
    id: string
    name: string | null
    email: string
    image: string | null
    createdAt: string
    isTrialActive: boolean
    subscriptionStatus: string
    subscriptionTier: string
    totalGenerationCount: number
    monthlyUsageCount: number
    signupIp: string | null
    lastIp: string | null
    isBlocked: boolean
    blockReason: string | null
    isFlagged: boolean
    flagReason: string | null
    riskScore: number
    isAdmin: boolean
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetchUsers()
    }, [search, statusFilter, page])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                search,
                status: statusFilter,
                page: page.toString(),
                limit: '20',
            })

            const res = await fetch(`/api/admin/users?${params}`)
            if (res.ok) {
                const data = await res.json()
                setUsers(data.users)
                setTotalPages(data.pagination.pages)
            }
        } catch (error) {
            toast.error('Failed to fetch users')
        } finally {
            setLoading(false)
        }
    }

    const updateUser = async (userId: string, updates: Partial<User>) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            })

            if (res.ok) {
                toast.success('User updated successfully')
                fetchUsers()
            } else {
                toast.error('Failed to update user')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    const deleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return
        }

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                toast.success('User deleted successfully')
                fetchUsers()
            } else {
                toast.error('Failed to delete user')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    User Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    View, search, and manage all user accounts
                </p>
            </div>

            {/* Filters */}
            <Card variant="default" className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                icon={Search}
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                            >
                                <option value="all">All Users</option>
                                <option value="trial">Active Trials</option>
                                <option value="paid">Paid Users</option>
                                <option value="flagged">Flagged</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card variant="default">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600 dark:text-gray-400">No users found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Subscription
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Usage
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {user.image ? (
                                                        <img
                                                            src={user.image}
                                                            alt=""
                                                            className="h-10 w-10 rounded-full mr-3"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3" />
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {user.name || 'No name'}
                                                            {user.isAdmin && (
                                                                <Shield className="inline-block h-4 w-4 ml-2 text-amber-500" />
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    {user.subscriptionTier}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {user.subscriptionStatus}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {user.totalGenerationCount} total
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {user.monthlyUsageCount} this month
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    {user.isBlocked && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            <Ban className="h-3 w-3 mr-1" />
                                                            Blocked
                                                        </span>
                                                    )}
                                                    {user.isFlagged && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                            <Flag className="h-3 w-3 mr-1" />
                                                            Flagged ({user.riskScore})
                                                        </span>
                                                    )}
                                                    {user.isTrialActive && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            Trial Active
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    {user.isBlocked ? (
                                                        <button
                                                            onClick={() => updateUser(user.id, { isBlocked: false })}
                                                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                            title="Unblock"
                                                        >
                                                            <Check className="h-5 w-5" />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => updateUser(user.id, { isBlocked: true, blockReason: 'Manual admin action' })}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                            title="Block"
                                                        >
                                                            <Ban className="h-5 w-5" />
                                                        </button>
                                                    )}
                                                    {user.isFlagged && (
                                                        <button
                                                            onClick={() => updateUser(user.id, { clearIpFlags: true })}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                            title="Clear Flags"
                                                        >
                                                            <X className="h-5 w-5" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteUser(user.id)}
                                                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span className="flex items-center px-4 text-gray-700 dark:text-gray-300">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="secondary"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}
