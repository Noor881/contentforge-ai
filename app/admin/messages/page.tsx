'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import {
    Mail,
    Inbox,
    Trash2,
    Eye,
    EyeOff,
    RefreshCw,
    Users,
    X,
    CheckCircle,
    Clock,
    Send,
    UserMinus,
    Search,
    Filter,
    MessageSquare,
    Newspaper,
} from 'lucide-react'

interface ContactMessage {
    id: string
    name: string
    email: string
    subject: string
    message: string
    isRead: boolean
    createdAt: string
}

interface NewsletterSub {
    id: string
    email: string
    isActive: boolean
    createdAt: string
}

export default function AdminMessagesPage() {
    const [activeTab, setActiveTab] = useState<'messages' | 'newsletter'>('messages')
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [newsletters, setNewsletters] = useState<NewsletterSub[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState<string | null>(null)
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterRead, setFilterRead] = useState<'all' | 'unread' | 'read'>('all')
    const [stats, setStats] = useState({ totalMessages: 0, unreadMessages: 0, totalSubscribers: 0, activeSubscribers: 0 })

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/messages')
            if (res.ok) {
                const data = await res.json()
                setMessages(data.messages || [])
                setNewsletters(data.newsletters || [])
                setStats(data.stats || { totalMessages: 0, unreadMessages: 0, totalSubscribers: 0, activeSubscribers: 0 })
            }
        } catch (error) {
            console.error('Failed to fetch data:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleMessageAction = async (id: string, action: 'read' | 'unread' | 'delete') => {
        setActionLoading(id)
        try {
            const res = await fetch(`/api/admin/messages/${id}`, {
                method: action === 'delete' ? 'DELETE' : 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: action !== 'delete' ? JSON.stringify({ action }) : undefined,
            })
            if (res.ok) {
                toast.success(action === 'delete' ? 'Message deleted' : `Marked as ${action}`)
                if (action === 'delete') {
                    setMessages(messages.filter(m => m.id !== id))
                    if (selectedMessage?.id === id) setSelectedMessage(null)
                } else {
                    setMessages(messages.map(m => m.id === id ? { ...m, isRead: action === 'read' } : m))
                }
                fetchData()
            } else {
                toast.error('Action failed')
            }
        } catch (error) {
            toast.error('Action failed')
        } finally {
            setActionLoading(null)
        }
    }

    const handleNewsletterAction = async (id: string, action: 'deactivate' | 'activate' | 'delete') => {
        setActionLoading(id)
        try {
            const res = await fetch(`/api/admin/newsletters/${id}`, {
                method: action === 'delete' ? 'DELETE' : 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: action !== 'delete' ? JSON.stringify({ action }) : undefined,
            })
            if (res.ok) {
                toast.success(action === 'delete' ? 'Subscriber removed' : `Subscriber ${action}d`)
                fetchData()
            } else {
                toast.error('Action failed')
            }
        } catch (error) {
            toast.error('Action failed')
        } finally {
            setActionLoading(null)
        }
    }

    const handleBulkMarkRead = async () => {
        try {
            const res = await fetch('/api/admin/messages/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'markAllRead' }),
            })
            if (res.ok) {
                toast.success('All messages marked as read')
                fetchData()
            }
        } catch (error) {
            toast.error('Failed to mark all as read')
        }
    }

    const filteredMessages = messages.filter(m => {
        const matchesSearch = !searchQuery ||
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.subject.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filterRead === 'all' || (filterRead === 'unread' ? !m.isRead : m.isRead)
        return matchesSearch && matchesFilter
    })

    const filteredNewsletters = newsletters.filter(n =>
        !searchQuery || n.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading messages...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Mail className="h-7 w-7 text-indigo-500" />
                        Messages & Newsletters
                    </h1>
                    <p className="text-gray-500 mt-1">Manage contact messages and newsletter subscribers</p>
                </div>
                <button
                    onClick={fetchData}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <Inbox className="h-5 w-5 text-blue-500" />
                        <span className="text-sm text-gray-500">Total Messages</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalMessages}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-5 w-5 text-orange-500" />
                        <span className="text-sm text-gray-500">Unread</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">{stats.unreadMessages}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <Newspaper className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-gray-500">Subscribers</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalSubscribers}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm text-gray-500">Active Subs</span>
                    </div>
                    <p className="text-3xl font-bold text-emerald-600">{stats.activeSubscribers}</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => { setActiveTab('messages'); setSearchQuery('') }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'messages'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                >
                    <MessageSquare className="h-4 w-4" />
                    Contact Messages
                    {stats.unreadMessages > 0 && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{stats.unreadMessages}</span>
                    )}
                </button>
                <button
                    onClick={() => { setActiveTab('newsletter'); setSearchQuery('') }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'newsletter'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                >
                    <Newspaper className="h-4 w-4" />
                    Newsletter Subscribers ({stats.totalSubscribers})
                </button>
            </div>

            {/* Messages Tab */}
            {activeTab === 'messages' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <div className="flex gap-3 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                />
                            </div>
                            <select
                                value={filterRead}
                                onChange={(e) => setFilterRead(e.target.value as any)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                            >
                                <option value="all">All</option>
                                <option value="unread">Unread</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                        {stats.unreadMessages > 0 && (
                            <button
                                onClick={handleBulkMarkRead}
                                className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors font-medium"
                            >
                                <CheckCircle className="h-4 w-4" />
                                Mark All Read
                            </button>
                        )}
                    </div>

                    {/* Messages List */}
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredMessages.length === 0 ? (
                            <p className="p-8 text-center text-gray-500">No messages found</p>
                        ) : (
                            filteredMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${!msg.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                                        }`}
                                    onClick={() => {
                                        setSelectedMessage(msg)
                                        if (!msg.isRead) handleMessageAction(msg.id, 'read')
                                    }}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {!msg.isRead && (
                                                    <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                )}
                                                <span className={`font-medium text-gray-900 dark:text-white truncate ${!msg.isRead ? 'font-semibold' : ''}`}>
                                                    {msg.name}
                                                </span>
                                                <span className="text-sm text-gray-500 truncate">&lt;{msg.email}&gt;</span>
                                            </div>
                                            <p className={`text-sm truncate ${!msg.isRead ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                                                {msg.subject}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate mt-1">{msg.message.slice(0, 100)}...</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleMessageAction(msg.id, 'delete')
                                                }}
                                                disabled={actionLoading === msg.id}
                                                className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Newsletter Tab */}
            {activeTab === 'newsletter' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search subscribers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredNewsletters.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                            No subscribers found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredNewsletters.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">{sub.email}</td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-1 text-xs rounded font-medium ${sub.isActive
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {sub.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(sub.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleNewsletterAction(sub.id, sub.isActive ? 'deactivate' : 'activate')}
                                                        disabled={actionLoading === sub.id}
                                                        className={`p-2 rounded transition-colors ${sub.isActive
                                                                ? 'hover:bg-orange-100 text-orange-600'
                                                                : 'hover:bg-green-100 text-green-600'
                                                            }`}
                                                        title={sub.isActive ? 'Deactivate' : 'Activate'}
                                                    >
                                                        {sub.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleNewsletterAction(sub.id, 'delete')}
                                                        disabled={actionLoading === sub.id}
                                                        className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                                                        title="Remove subscriber"
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
                </div>
            )}

            {/* Message Detail Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedMessage.subject}</h3>
                            <button onClick={() => setSelectedMessage(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">From:</span>{' '}
                                    <span className="font-medium text-gray-900 dark:text-white">{selectedMessage.name}</span>{' '}
                                    <span className="text-gray-500">&lt;{selectedMessage.email}&gt;</span>
                                </div>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-500">{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                <p className="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                            </div>
                            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                >
                                    <Send className="h-4 w-4" />
                                    Reply via Email
                                </a>
                                <button
                                    onClick={() => handleMessageAction(selectedMessage.id, selectedMessage.isRead ? 'unread' : 'read')}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    {selectedMessage.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    {selectedMessage.isRead ? 'Mark Unread' : 'Mark Read'}
                                </button>
                                <button
                                    onClick={() => {
                                        handleMessageAction(selectedMessage.id, 'delete')
                                        setSelectedMessage(null)
                                    }}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
