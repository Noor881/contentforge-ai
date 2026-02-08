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
    ImageIcon,
    Wand2,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const aiStudioItems = [
    { name: 'AI Image Generator', href: '/dashboard/create/image-gen', icon: ImageIcon },
    { name: 'AI Text-to-Video', href: '/dashboard/create/text-to-video', icon: Video },
]

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
    const [collapsed, setCollapsed] = useState(false)

    const toggleCategory = (categoryName: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        )
    }

    const isActive = (href: string) => pathname === href
    const isCategoryActive = (items: { href: string }[]) => items.some(item => pathname === item.href)

    const sidebarContent = (showLabels: boolean) => (
        <>
            {/* AI Studio Section */}
            <div className={cn('px-3 pt-4', showLabels ? 'pb-2' : 'pb-1')}>
                {showLabels && (
                    <p className="text-[10px] font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest mb-2 px-2">
                        AI Studio
                    </p>
                )}
                <div className="space-y-1">
                    {aiStudioItems.map((item) => {
                        const ItemIcon = item.icon
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                title={!showLabels ? item.name : undefined}
                                className={cn(
                                    'flex items-center gap-2.5 rounded-xl transition-all duration-200 group',
                                    showLabels ? 'px-3 py-2.5' : 'px-2 py-2.5 justify-center',
                                    isActive(item.href)
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                                )}
                            >
                                <div className={cn(
                                    'flex-shrink-0 rounded-lg p-1.5 transition-colors',
                                    isActive(item.href) ? 'bg-white/20' : 'bg-primary-600'
                                )}>
                                    <ItemIcon className={cn('h-4 w-4', isActive(item.href) ? 'text-white' : 'text-white')} />
                                </div>
                                {showLabels && (
                                    <span className="text-sm font-medium truncate">{item.name}</span>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Separator */}
            <div className="px-4 py-2">
                <div className="border-t border-gray-200 dark:border-gray-700/50" />
            </div>

            {/* Main Navigation */}
            <nav className={cn('space-y-0.5', showLabels ? 'px-3' : 'px-2')}>
                {mainNavigation.map((item) => {
                    const ItemIcon = item.icon
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            title={!showLabels ? item.name : undefined}
                            className={cn(
                                'flex items-center gap-3 text-sm rounded-xl transition-all duration-200',
                                showLabels ? 'px-3 py-2.5' : 'px-2 py-2.5 justify-center',
                                isActive(item.href)
                                    ? 'bg-gray-100 dark:bg-gray-700/60 text-gray-900 dark:text-white font-semibold'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                            )}
                        >
                            <ItemIcon className={cn('h-[18px] w-[18px] flex-shrink-0', isActive(item.href) ? 'text-primary-600 dark:text-primary-400' : '')} />
                            {showLabels && <span className="truncate">{item.name}</span>}
                        </Link>
                    )
                })}
            </nav>

            {/* Separator */}
            <div className="px-4 py-2">
                <div className="border-t border-gray-200 dark:border-gray-700/50" />
                {showLabels && (
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-2 mb-1 px-2">
                        Create Content
                    </p>
                )}
            </div>

            {/* Tool Categories */}
            <nav className={cn('flex-1 overflow-y-auto space-y-0.5 pb-4', showLabels ? 'px-3' : 'px-2')}>
                {toolCategories.map((category) => {
                    const isExpanded = (expandedCategories.includes(category.name) || isCategoryActive(category.items)) && showLabels
                    const CategoryIcon = category.icon

                    return (
                        <div key={category.name}>
                            {showLabels ? (
                                <button
                                    onClick={() => toggleCategory(category.name)}
                                    className={cn(
                                        'w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-colors',
                                        isCategoryActive(category.items)
                                            ? 'text-primary-700 dark:text-primary-400 font-medium bg-primary-50/50 dark:bg-primary-900/10'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <CategoryIcon className="h-[18px] w-[18px]" />
                                        <span className="truncate">{category.name}</span>
                                    </div>
                                    {isExpanded ? (
                                        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                                    ) : (
                                        <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                                    )}
                                </button>
                            ) : (
                                <div title={category.name} className="flex justify-center py-2">
                                    <CategoryIcon className="h-[18px] w-[18px] text-gray-400" />
                                </div>
                            )}
                            {isExpanded && (
                                <div className="ml-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700/50 space-y-0.5 mt-0.5 mb-1">
                                    {category.items.map((item) => {
                                        const SubIcon = item.icon
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileOpen(false)}
                                                className={cn(
                                                    'flex items-center gap-2.5 px-3 py-1.5 text-[13px] rounded-lg transition-colors',
                                                    isActive(item.href)
                                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium'
                                                        : 'text-gray-500 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                                )}
                                            >
                                                <SubIcon className="h-3.5 w-3.5 flex-shrink-0" />
                                                <span className="truncate">{item.name}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className={cn('border-t border-gray-200 dark:border-gray-700/50 mt-auto', showLabels ? 'p-3' : 'p-2')}>
                {isAdmin && (
                    <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        title={!showLabels ? 'Admin Panel' : undefined}
                        className={cn(
                            'flex items-center gap-2.5 text-sm rounded-xl transition-colors text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20',
                            showLabels ? 'px-3 py-2' : 'px-2 py-2 justify-center'
                        )}
                    >
                        <Shield className="h-[18px] w-[18px]" />
                        {showLabels && <span>Admin Panel</span>}
                    </Link>
                )}
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    title={!showLabels ? 'Sign Out' : undefined}
                    className={cn(
                        'w-full flex items-center gap-2.5 text-sm rounded-xl transition-colors text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 mt-0.5',
                        showLabels ? 'px-3 py-2' : 'px-2 py-2 justify-center'
                    )}
                >
                    <LogOut className="h-[18px] w-[18px]" />
                    {showLabels && <span>Sign Out</span>}
                </button>
            </div>
        </>
    )

    return (
        <>
            {/* Mobile Hamburger */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                aria-label="Open menu"
            >
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={cn(
                    'lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                        <div className="p-1.5 rounded-lg bg-primary-600">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">ContentForge AI</span>
                    </Link>
                    <button onClick={() => setMobileOpen(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto">
                    {sidebarContent(true)}
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    'hidden lg:flex lg:flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 relative',
                    collapsed ? 'w-[60px]' : 'w-64'
                )}
            >
                {/* Collapse Toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-6 z-10 p-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? (
                        <ChevronsRight className="h-3 w-3 text-gray-500" />
                    ) : (
                        <ChevronsLeft className="h-3 w-3 text-gray-500" />
                    )}
                </button>

                {sidebarContent(!collapsed)}
            </aside>
        </>
    )
}
