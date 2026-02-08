'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, Sparkles, ArrowRight, ChevronDown, Pencil, MessageSquare, Mail, Video, Target, Search, FileText, Music, Mic, ShoppingBag, Share2, Feather, BookOpen, Volume2, ImageIcon, Wand2 } from 'lucide-react'
import Button from '../ui/Button'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

// Tool categories for mega-menu
const toolCategories = [
    {
        name: '✨ AI Studio',
        featured: true,
        tools: [
            { name: 'AI Image Generator', href: '/dashboard/create/image-gen', icon: ImageIcon, color: 'text-primary-600', bg: 'bg-primary-100 dark:bg-primary-900/30' },
            { name: 'AI Text-to-Video', href: '/dashboard/create/text-to-video', icon: Video, color: 'text-primary-600', bg: 'bg-primary-100 dark:bg-primary-900/30' },
        ],
    },
    {
        name: 'Content Writing',
        tools: [
            { name: 'Blog Post', href: '/dashboard/create/blog', icon: Pencil, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { name: 'Social Media', href: '/dashboard/create/social', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            { name: 'Email', href: '/dashboard/create/email', icon: Mail, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
            { name: 'LinkedIn', href: '/dashboard/create/linkedin', icon: Share2, color: 'text-blue-700', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { name: 'Advanced Blogger', href: '/dashboard/create/blogger', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
        ],
    },
    {
        name: 'Marketing & Ads',
        tools: [
            { name: 'Ad Copy', href: '/dashboard/create/ad', icon: Target, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
            { name: 'SEO Meta', href: '/dashboard/create/seo', icon: Search, color: 'text-cyan-600', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
            { name: 'Product Description', href: '/dashboard/create/product', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
        ],
    },
    {
        name: 'Creative',
        tools: [
            { name: 'Video Script', href: '/dashboard/create/video', icon: Video, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
            { name: 'Podcast Script', href: '/dashboard/create/podcast', icon: Mic, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
            { name: 'Lyrics', href: '/dashboard/create/lyrics', icon: Music, color: 'text-pink-600', bg: 'bg-pink-100 dark:bg-pink-900/30' },
            { name: 'Poem', href: '/dashboard/create/poem', icon: Feather, color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-900/30' },
        ],
    },
    {
        name: 'Professional',
        tools: [
            { name: 'Resume', href: '/dashboard/create/resume', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
            { name: 'Cover Letter', href: '/dashboard/create/cover-letter', icon: FileText, color: 'text-teal-600', bg: 'bg-teal-100 dark:bg-teal-900/30' },
        ],
    },
    {
        name: 'Utilities',
        tools: [
            { name: 'Text to Speech', href: '/dashboard/create/tts', icon: Volume2, color: 'text-violet-600', bg: 'bg-violet-100 dark:bg-violet-900/30' },
        ],
    },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false)
    const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false)
    const { data: session } = useSession()
    const featuresRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const navigation = [
        { name: 'Pricing', href: '/pricing' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ]

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (featuresRef.current && !featuresRef.current.contains(event.target as Node)) {
                setIsFeaturesOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIsFeaturesOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsFeaturesOpen(false)
        }, 150)
    }

    return (
        <header className="sticky top-0 z-50 w-full glass border-b border-gray-200/50 dark:border-gray-800/50">
            <nav className="container-custom mx-auto" aria-label="Main navigation">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2.5 group" aria-label="ContentForge AI Home">
                        <div className="relative">
                            <Sparkles className="h-8 w-8 text-primary-600 group-hover:text-primary-500 transition-colors" />
                            <div className="absolute -inset-1 bg-primary-600 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                        </div>
                        <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400 font-display tracking-tight">
                            ContentForge AI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-1">
                        {/* Features Dropdown */}
                        <div
                            ref={featuresRef}
                            className="relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 flex items-center gap-1"
                                onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                            >
                                Features
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Mega Menu Dropdown */}
                            <AnimatePresence>
                                {isFeaturesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[700px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                                    >
                                        {/* Glass overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-purple-50/30 dark:from-primary-950/30 dark:to-purple-950/20" />

                                        <div className="relative p-6">
                                            <div className="grid grid-cols-3 gap-6">
                                                {toolCategories.map((category) => (
                                                    <div key={category.name}>
                                                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                                                            {category.name}
                                                        </h3>
                                                        <div className="space-y-1">
                                                            {category.tools.map((tool) => {
                                                                const Icon = tool.icon
                                                                return (
                                                                    <Link
                                                                        key={tool.href}
                                                                        href={tool.href}
                                                                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group/item"
                                                                        onClick={() => setIsFeaturesOpen(false)}
                                                                    >
                                                                        <div className={`w-9 h-9 rounded-lg ${tool.bg} flex items-center justify-center group-hover/item:scale-110 transition-transform`}>
                                                                            <Icon className={`h-5 w-5 ${tool.color}`} />
                                                                        </div>
                                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors">
                                                                            {tool.name}
                                                                        </span>
                                                                    </Link>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Footer CTA */}
                                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                                                <Link
                                                    href="/features"
                                                    className="flex items-center justify-between p-3 rounded-xl bg-primary-50 dark:bg-primary-950/50 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors group/cta"
                                                    onClick={() => setIsFeaturesOpen(false)}
                                                >
                                                    <div>
                                                        <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">
                                                            Explore All 17+ AI Tools
                                                        </p>
                                                        <p className="text-xs text-primary-600/70 dark:text-primary-500/70">
                                                            See detailed features and examples
                                                        </p>
                                                    </div>
                                                    <ArrowRight className="h-5 w-5 text-primary-600 group-hover/cta:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Other Nav Items */}
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex md:items-center md:space-x-3">
                        {session ? (
                            <Link href="/dashboard">
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white border-none font-semibold">
                                        Dashboard
                                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                    </Button>
                                </motion.div>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="font-medium">
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                        <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white border-none font-semibold">
                                            Start Free Trial
                                        </Button>
                                    </motion.div>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden rounded-xl p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-1 border-t border-gray-200/50 dark:border-gray-800/50">
                                {/* Mobile Features Accordion */}
                                <button
                                    onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-colors"
                                >
                                    Features
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileFeaturesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isMobileFeaturesOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-4 pr-2 py-2 space-y-3">
                                                {toolCategories.map((category) => (
                                                    <div key={category.name}>
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                                                            {category.name}
                                                        </p>
                                                        <div className="space-y-1">
                                                            {category.tools.map((tool) => {
                                                                const Icon = tool.icon
                                                                return (
                                                                    <Link
                                                                        key={tool.href}
                                                                        href={tool.href}
                                                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                                        onClick={() => {
                                                                            setIsMenuOpen(false)
                                                                            setIsMobileFeaturesOpen(false)
                                                                        }}
                                                                    >
                                                                        <div className={`w-8 h-8 rounded-lg ${tool.bg} flex items-center justify-center`}>
                                                                            <Icon className={`h-4 w-4 ${tool.color}`} />
                                                                        </div>
                                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                            {tool.name}
                                                                        </span>
                                                                    </Link>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                                <Link
                                                    href="/features"
                                                    className="flex items-center gap-2 p-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
                                                    onClick={() => {
                                                        setIsMenuOpen(false)
                                                        setIsMobileFeaturesOpen(false)
                                                    }}
                                                >
                                                    View All Features
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Other Mobile Nav Items */}
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-4 space-y-2 px-1">
                                    {session ? (
                                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                            <Button size="sm" className="w-full bg-primary-600 hover:bg-primary-700 text-white border-none">
                                                Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                                <Button variant="outline" size="sm" className="w-full mb-2">
                                                    Log In
                                                </Button>
                                            </Link>
                                            <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                                                <Button size="sm" className="w-full bg-primary-600 hover:bg-primary-700 text-white border-none">
                                                    Start Free Trial
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}
