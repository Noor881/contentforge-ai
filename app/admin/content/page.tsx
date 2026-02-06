import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
import {
    Shield,
    FileText,
    Search,
    Trash2,
    Eye,
    Calendar,
    User,
    Tag,
    BarChart3,
} from 'lucide-react'

export default async function AdminContentPage() {
    // SECURITY: Require admin
    await requireAdmin()

    // Get content stats
    const [
        totalContent,
        contentByType,
        recentContent,
    ] = await Promise.all([
        prisma.content.count(),
        prisma.content.groupBy({
            by: ['type'],
            _count: { type: true },
        }),
        prisma.content.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } },
            },
        }),
    ])

    // Calculate content today
    const contentToday = await prisma.content.count({
        where: {
            createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
    })

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
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h1>
                            <p className="text-sm text-gray-500">View and manage all generated content</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <span className="text-sm text-gray-500">Total Content</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalContent}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-gray-500">Generated Today</span>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{contentToday}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Tag className="h-5 w-5 text-purple-500" />
                            <span className="text-sm text-gray-500">Content Types</span>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">{contentByType.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-5 w-5 text-orange-500" />
                            <span className="text-sm text-gray-500">Avg/Day</span>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">
                            {Math.round(totalContent / 30)}
                        </p>
                    </div>
                </div>

                {/* Content by Type */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Content by Type</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {contentByType.map((item) => (
                            <div key={item.type} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{item._count.type}</p>
                                <p className="text-sm text-gray-500 capitalize">{item.type.replace('-', ' ')}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Content Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="font-semibold text-gray-900 dark:text-white">Recent Content</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {recentContent.map((content) => (
                                    <tr key={content.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-gray-900 dark:text-white truncate max-w-[300px]">
                                                {content.title}
                                            </p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded capitalize">
                                                {content.type.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            {content.user?.email || 'Unknown'}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            {new Date(content.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="View">
                                                <Eye className="h-4 w-4 text-gray-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
