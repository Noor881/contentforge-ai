'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
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
    Volume2,
    BookOpen,
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    Briefcase,
    Palette,
    Megaphone,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const toolCategories = [
    {
        name: 'Writing',
        icon: Pencil,
        items: [
            { name: 'Blog Post', href: '/dashboard/create/blog', icon: Pencil },
            { name: 'Advanced Blogger', href: '/dashboard/create/blogger', icon: BookOpen },
            { name: 'Poem', href: '/dashboard/create/poem', icon: Feather },
            { name: 'Lyrics', href: '/dashboard/create/lyrics', icon: Music },
        ],
    },
    {
        name: 'Marketing',
        icon: Megaphone,
        items: [
            { name: 'Social Media', href: '/dashboard/create/social', icon: MessageSquare },
            { name: 'Ad Copy', href: '/dashboard/create/ad', icon: Target },
            { name: 'Email Template', href: '/dashboard/create/email', icon: Mail },
            { name: 'SEO Meta', href: '/dashboard/create/seo', icon: Search },
            { name: 'Product Desc', href: '/dashboard/create/product', icon: ShoppingBag },
        ],
    },
    {
        name: 'Professional',
        icon: Briefcase,
        items: [
            { name: 'Resume', href: '/dashboard/create/resume', icon: FileText },
            { name: 'Cover Letter', href: '/dashboard/create/cover-letter', icon: FileText },
            { name: 'LinkedIn', href: '/dashboard/create/linkedin', icon: Share2 },
        ],
    },
    {
        name: 'Media',
        icon: Palette,
        items: [
            { name: 'Video Script', href: '/dashboard/create/video', icon: Video },
            { name: 'Podcast Script', href: '/dashboard/create/podcast', icon: Mic },
            { name: 'Text to Speech', href: '/dashboard/create/tts', icon: Volume2 },
        ],
    },
]

const mainNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Content Library', href: '/dashboard/library', icon: FolderOpen },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
]

export default function DashboardSidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()
    const isAdmin = session?.user?.isAdmin === true
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['Writing'])
    const [mobileOpen, setMobileOpen] = useState(false)

    const toggleCategory = (categoryName: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        )
    }

    const isActive = (href: string) => pathname === href
    const isCategoryActive = (items: { href: string }[]) => items.some(item => pathname === item.href)

    const sidebarContent = (
        <>
            {/* Main Navigation */}
            <nav className="p-4 space-y-1">
                {mainNavigation.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                            'flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors',
                            isActive(item.href)
                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Divider */}
            <div className="px-4 py-2">
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-3 mb-1 px-3">
                    Create Content
                </p>
            </div>

            {/* Tool Categories */}
            <nav className="px-4 space-y-1 pb-4 flex-1 overflow-y-auto">
                {toolCategories.map((category) => {
                    const isExpanded = expandedCategories.includes(category.name) || isCategoryActive(category.items)
                    const CategoryIcon = category.icon

                    return (
                        <div key={category.name}>
                            <button
                                onClick={() => toggleCategory(category.name)}
                                className={cn(
                                    'w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors',
                                    isCategoryActive(category.items)
                                        ? 'text-primary-700 dark:text-primary-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <CategoryIcon className="h-4 w-4" />
                                    {category.name}
                                </div>
                                {isExpanded ? (
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                            {isExpanded && (
                                <div className="ml-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700 space-y-0.5 mt-1 mb-2">
                                    {category.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={cn(
                                                'flex items-center gap-3 px-3 py-1.5 text-sm rounded-lg transition-colors',
                                                isActive(item.href)
                                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                            )}
                                        >
                                            <item.icon className="h-3.5 w-3.5" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                {isAdmin && (
                    <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    >
                        <Shield className="h-5 w-5" />
                        Admin Panel
                    </Link>
                )}
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 mt-1"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </>
    )

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                aria-label="Open menu"
            >
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={cn(
                    'lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                        <Sparkles className="h-6 w-6 text-primary-600" />
                        <span className="font-bold text-gray-900 dark:text-white">ContentForge AI</span>
                    </Link>
                    <button onClick={() => setMobileOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto">
                    {sidebarContent}
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden lg:flex lg:flex-col">
                {sidebarContent}
            </aside>
        </>
    )
}
