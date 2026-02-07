'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
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
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
    RefreshCw,
    X,
} from 'lucide-react'

interface ContentItem {
    id: string
    title: string
    type: string
    createdAt: string
    user: {
        name: string | null
        email: string
    } | null
}

interface ContentTypeCount {
    type: string
    _count: { type: number }
}

export default function AdminContentPage() {
    const [content, setContent] = useState<ContentItem[]>([])
    const [contentByType, setContentByType] = useState<ContentTypeCount[]>([])
    const [totalContent, setTotalContent] = useState(0)
    const [contentToday, setContentToday] = useState(0)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedType, setSelectedType] = useState<string>('all')
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
    const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)

    const fetchContent = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/content')
            if (res.ok) {
                const data = await res.json()
                setContent(data.content || [])
                setContentByType(data.contentByType || [])
                setTotalContent(data.totalContent || 0)
                setContentToday(data.contentToday || 0)
            }
        } catch (error) {
            console.error('Failed to fetch content:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContent()
    }, [])

    const handleDelete = async (contentId: string) => {
        if (!confirm('Are you sure you want to delete this content? This action cannot be undone.')) return
        setDeleteLoading(contentId)
        try {
            const res = await fetch(`/api/admin/content/${contentId}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                toast.success('Content deleted successfully')
                setContent(content.filter(c => c.id !== contentId))
                setTotalContent(prev => prev - 1)
                if (selectedContent?.id === contentId) setSelectedContent(null)
            } else {
                toast.error('Failed to delete content')
            }
        } catch (error) {
            toast.error('Failed to delete content')
        } finally {
            setDeleteLoading(null)
        }
    }

    const filteredContent = content.filter(item => {
        const matchesSearch = !searchQuery ||
            item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = selectedType === 'all' || item.type === selectedType
        return matchesSearch && matchesType
    })

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading content...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <FileText className="h-7 w-7 text-blue-500" />
                        Content Management
                    </h1>
                    <p className="text-gray-500 mt-1">View and manage all generated content</p>
                </div>
                <button
                    onClick={fetchContent}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                </button>
            </div>

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
                        <button
                            key={item.type}
                            onClick={() => setSelectedType(selectedType === item.type ? 'all' : item.type)}
                            className={`p-4 rounded-lg text-center transition-all ${selectedType === item.type
                                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400 dark:border-blue-600'
                                    : 'bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                        >
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{item._count.type}</p>
                            <p className="text-sm text-gray-500 capitalize">{item.type.replace('-', ' ')}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                        {selectedType !== 'all' ? `${selectedType.replace('-', ' ')} Content` : 'All Content'} ({filteredContent.length})
                    </h2>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title or user..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {selectedType !== 'all' && (
                            <button
                                onClick={() => setSelectedType('all')}
                                className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                            >
                                <X className="h-3 w-3" />
                                Clear filter
                            </button>
                        )}
                    </div>
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
                            {filteredContent.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                                        {searchQuery || selectedType !== 'all' ? 'No content matches your filters' : 'No content generated yet'}
                                    </td>
                                </tr>
                            ) : (
                                filteredContent.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-gray-900 dark:text-white truncate max-w-[300px]">
                                                {item.title}
                                            </p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded capitalize font-medium">
                                                {item.type.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {item.user?.email || 'Unknown'}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedContent(item)}
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                                    title="View details"
                                                >
                                                    <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={deleteLoading === item.id}
                                                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors text-red-600"
                                                    title="Delete content"
                                                >
                                                    {deleteLoading === item.id ? (
                                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Content Preview Modal */}
            {selectedContent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content Details</h3>
                            <button
                                onClick={() => setSelectedContent(null)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase">Title</label>
                                <p className="text-gray-900 dark:text-white font-medium">{selectedContent.title}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase">Type</label>
                                    <p className="text-gray-900 dark:text-white capitalize">{selectedContent.type.replace('-', ' ')}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase">Created</label>
                                    <p className="text-gray-900 dark:text-white">{new Date(selectedContent.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase">Author</label>
                                <p className="text-gray-900 dark:text-white">{selectedContent.user?.name || 'No name'}</p>
                                <p className="text-sm text-gray-500">{selectedContent.user?.email || 'Unknown'}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => {
                                    handleDelete(selectedContent.id)
                                    setSelectedContent(null)
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Content
                            </button>
                            <button
                                onClick={() => setSelectedContent(null)}
                                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
