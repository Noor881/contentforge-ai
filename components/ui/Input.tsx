import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helpText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, helpText, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {label}
                        {props.required && <span className="text-danger-500 ml-1">*</span>}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
                        'bg-white dark:bg-gray-800',
                        'border-gray-300 dark:border-gray-600',
                        'text-gray-900 dark:text-gray-100',
                        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                        'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-sm text-danger-600 dark:text-danger-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
                {helpText && !error && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
