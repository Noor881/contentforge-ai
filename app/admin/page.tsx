'use client'

import { useEffect, useState } from 'react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import {
    Users,
    TrendingUp,
    FileText,
    AlertTriangle,
    DollarSign,
    Calendar
} from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

interface Stats {
    totalUsers: number
    activeTrialUsers: number
    paidUsers: number
    flaggedUsers: number
    blockedUsers: number
    totalContent: number
    contentToday: number
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/admin/stats')
            if (res.ok) {
                const data = await res.json()
                setStats(data)
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        } finally {
            setLoading(false)
        }
    }

    const statCards = stats ? [
        {
            title: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
        },
        {
            title: 'Active Trials',
            value: stats.activeTrialUsers.toLocaleString(),
            icon: Calendar,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
        },
        {
            title: 'Paid Users',
            value: stats.paidUsers.toLocaleString(),
            icon: DollarSign,
            color: 'text-green-600',
            bg: 'bg-green-50',
        },
        {
            title: 'Total Content',
            value: stats.totalContent.toLocaleString(),
            icon: FileText,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
        },
        {
            title: 'Content Today',
            value: stats.contentToday.toLocaleString(),
            icon: TrendingUp,
            color: 'text-teal-600',
            bg: 'bg-teal-50',
        },
        {
            title: 'Flagged Users',
            value: stats.flaggedUsers.toLocaleString(),
            icon: AlertTriangle,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
        },
    ] : []

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage users, monitor activity, and control platform settings
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <Card key={index} variant="default" hover>
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className={`p-3 rounded-lg ${stat.bg}`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="default">
                    <CardHeader>
                        <CardTitle>User Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            View, search, and manage all user accounts
                        </p>
                        <Link href="/admin/users">
                            <Button className="w-full">Manage Users</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card variant="default">
                    <CardHeader>
                        <CardTitle>Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            View detailed analytics and usage reports
                        </p>
                        <Link href="/admin/analytics">
                            <Button className="w-full" variant="secondary">View Analytics</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
