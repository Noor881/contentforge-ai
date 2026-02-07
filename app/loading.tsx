import { Sparkles } from 'lucide-react'

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950">
            {/* Branded spinner */}
            <div className="relative mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center animate-pulse shadow-lg shadow-primary-600/20">
                    <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -inset-2 rounded-3xl border-2 border-primary-600/20 animate-ping" />
            </div>

            {/* Brand name */}
            <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 font-display mb-6">
                ContentForge AI
            </p>

            {/* Skeleton content */}
            <div className="w-full max-w-4xl px-6 space-y-6">
                {/* Header skeleton */}
                <div className="flex items-center justify-between">
                    <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                    <div className="flex gap-3">
                        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                    </div>
                </div>

                {/* Hero skeleton */}
                <div className="text-center space-y-4 py-12">
                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto animate-pulse" />
                    <div className="h-10 w-96 max-w-full bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto animate-pulse" />
                    <div className="h-10 w-72 max-w-full bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto animate-pulse" />
                    <div className="h-5 w-80 max-w-full bg-gray-100 dark:bg-gray-900 rounded-lg mx-auto animate-pulse" />
                    <div className="flex gap-4 justify-center pt-4">
                        <div className="h-12 w-40 bg-primary-600/20 rounded-xl animate-pulse" />
                        <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                    </div>
                </div>

                {/* Cards skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
                            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                            <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-gray-100 dark:bg-gray-900 rounded animate-pulse" />
                                <div className="h-3 w-5/6 bg-gray-100 dark:bg-gray-900 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
