import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'bordered' | 'subtle'
    hover?: boolean
    children: ReactNode
}

export default function Card({
    variant = 'default',
    hover = false,
    className,
    children,
    ...props
}: CardProps) {
    const variants = {
        default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-clean',
        bordered: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
        subtle: 'bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800',
    }

    return (
        <div
            className={cn(
                'rounded-lg p-6',
                variants[variant],
                hover && 'card-hover cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('mb-4', className)} {...props}>
            {children}
        </div>
    )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={cn('text-xl font-bold text-gray-900 dark:text-white', className)} {...props}>
            {children}
        </h3>
    )
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn('text-gray-600 dark:text-gray-400 text-sm', className)} {...props}>
            {children}
        </p>
    )
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('', className)} {...props}>
            {children}
        </div>
    )
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('mt-6 pt-4 border-t border-gray-200 dark:border-gray-700', className)} {...props}>
            {children}
        </div>
    )
}
