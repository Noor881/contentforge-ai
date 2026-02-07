'use client'

import { Copy, Download } from 'lucide-react'
import Button from './ui/Button'
import toast from 'react-hot-toast'
import { ImagePrompt } from '@/lib/image-prompts'

interface ImagePromptsDisplayProps {
    prompts: ImagePrompt[]
    className?: string
}

export default function ImagePromptsDisplay({ prompts, className = '' }: ImagePromptsDisplayProps) {
    const copyPrompt = (prompt: string) => {
        navigator.clipboard.writeText(prompt)
        toast.success('Copied to clipboard!')
    }

    const copyAllPrompts = () => {
        const allPrompts = prompts.map(p => `${p.title}:\n${p.prompt}\n`).join('\n')
        navigator.clipboard.writeText(allPrompts)
        toast.success('Copied all prompts!')
    }

    const downloadJSON = () => {
        const jsonStr = JSON.stringify(prompts, null, 2)
        const blob = new Blob([jsonStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'image-prompts.json'
        a.click()
        URL.revokeObjectURL(url)
        toast.success('Downloaded!')
    }

    if (!prompts || prompts.length === 0) {
        return null
    }

    return (
        <div className={`bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    🎨 AI Image Prompts ({prompts.length})
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={copyAllPrompts}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        title="Copy all prompts"
                    >
                        <Copy className="h-4 w-4" />
                    </button>
                    <button
                        onClick={downloadJSON}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        title="Download as JSON"
                    >
                        <Download className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {prompts.map((prompt, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                    {index + 1}. {prompt.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {prompt.context}
                                </p>
                                <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mb-2">
                                    <p className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                                        {prompt.prompt}
                                    </p>
                                </div>
                                {prompt.style && (
                                    <p className="text-xs text-purple-600 dark:text-purple-400">
                                        Style: {prompt.style}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => copyPrompt(prompt.prompt)}
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex-shrink-0"
                                title="Copy prompt"
                            >
                                <Copy className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                💡 Use these prompts with MidJourney, DALL-E, Stable Diffusion, or any AI image generator
            </p>
        </div>
    )
}
