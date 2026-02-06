'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
    LayoutDashboard,
    Sparkles,
    FolderOpen,
    Settings,
    CreditCard,
    Pencil,
    MessageSquare,
    Mail,
    Video,
    Target,
    Search,
    FileText,
    Music,
    Mic,
    ShoppingBag,
    Share2,
    Feather,
    LogOut,
    Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
        name: 'Create Content', icon: Sparkles, subItems: [
            { name: 'Blog Post', href: '/dashboard/create/blog', icon: Pencil },
            { name: 'Social Media', href: '/dashboard/create/social', icon: MessageSquare },
            { name: 'Email Template', href: '/dashboard/create/email', icon: Mail },
            { name: 'Video Script', href: '/dashboard/create/video', icon: Video },
            { name: 'Ad Copy', href: '/dashboard/create/ad', icon: Target },
            { name: 'SEO Meta', href: '/dashboard/create/seo', icon: Search },
            { name: 'Resume', href: '/dashboard/create/resume', icon: FileText },
            { name: 'Cover Letter', href: '/dashboard/create/cover-letter', icon: FileText },
            { name: 'Lyrics', href: '/dashboard/create/lyrics', icon: Music },
            { name: 'Podcast', href: '/dashboard/create/podcast', icon: Mic },
            { name: 'Product Desc', href: '/dashboard/create/product', icon: ShoppingBag },
            { name: 'LinkedIn', href: '/dashboard/create/linkedin', icon: Share2 },
            { name: 'Poem', href: '/dashboard/create/poem', icon: Feather },
        ]
    },
    { name: 'Content Library', href: '/dashboard/library', icon: FolderOpen },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
]

export default function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden lg:block">
            <nav className="p-4 space-y-1">
                {navigation.map((item) => {
                    if (item.subItems) {
                        return (
                            <div key={item.name}>
                                <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                </div>
                                <div className="ml-8 space-y-1">
                                    {item.subItems.map((subItem) => {
                                        const isActive = pathname === subItem.href
                                        return (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className={cn(
                                                    'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
                                                    isActive
                                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                )}
                                            >
                                                <subItem.icon className="h-4 w-4" />
                                                {subItem.name}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }

                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href!}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
                                isActive
                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Admin Link and Sign Out */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <Link
                    href="/admin"
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                    <Shield className="h-5 w-5" />
                    Admin Panel
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 mt-1"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
