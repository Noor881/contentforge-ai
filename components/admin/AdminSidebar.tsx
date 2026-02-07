'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
    Shield,
    Users,
    CreditCard,
    DollarSign,
    BarChart3,
    AlertTriangle,
    FileText,
    Settings,
    LogOut,
    LayoutDashboard,
    Home,
    Mail,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
    adminName: string
}

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
    { name: 'Payments', href: '/admin/payments', icon: DollarSign },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Security', href: '/admin/security', icon: AlertTriangle },
    { name: 'Content', href: '/admin/content', icon: FileText },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar({ adminName }: AdminSidebarProps) {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600 rounded-lg">
                        <Shield className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">Admin Panel</h1>
                        <p className="text-xs text-gray-400 truncate">{adminName}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/admin' && pathname.startsWith(item.href))

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
                                isActive
                                    ? 'bg-red-600 text-white font-medium'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 space-y-1">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                    <Home className="h-5 w-5" />
                    Back to Dashboard
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-red-400 hover:bg-red-900/30"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
