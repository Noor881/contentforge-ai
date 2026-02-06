import { cn } from '@/lib/utils'

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export function Spinner({ size = 'md', className }: LoadingProps) {
    const sizes = {
        sm: 'h-6 w-6',
        md: 'h-10 w-10',
        lg: 'h-16 w-16',
    }

    return (
        <div
            className={cn(
                'animate-spin rounded-full border-4 border-gray-300 border-t-primary-600',
                sizes[size],
                className
            )}
        />
    )
}

export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={cn('skeleton rounded-lg', className)} />
    )
}

export function PageLoader() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <Spinner size="lg" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
        </div>
    )
}

export function CardSkeleton() {
    return (
        <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6" />
        </div>
    )
}

interface LoadingDotsProps {
    className?: string
}

export function LoadingDots({ className }: LoadingDotsProps) {
    return (
        <div className={cn('flex space-x-2', className)}>
            <div className="h-2 w-2 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="h-2 w-2 bg-primary-600 rounded-full animate-bounce" />
        </div>
    )
}

// Default export for backward compatibility
export default function Loading() {
    return <PageLoader />
}
