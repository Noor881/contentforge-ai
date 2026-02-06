'use client'

import { useState } from 'react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { Sparkles, Copy, Download, Save } from 'lucide-react'
import TTSPlayer from '@/components/TTSPlayer'
import ImagePromptsDisplay from '@/components/ImagePromptsDisplay'
import { ImagePrompt } from '@/lib/image-prompts'

export default function BlogPostGenerator() {
    const [formData, setFormData] = useState({
        topic: '',
        keywords: '',
        tone: 'professional',
        length: 'medium',
        includeImagePrompts: true,
    })
    const [generatedContent, setGeneratedContent] = useState('')
    const [imagePrompts, setImagePrompts] = useState<ImagePrompt[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsGenerating(true)

        try {
            const res = await fetch('/api/content/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'blog_post',
                    params: formData,
                    prompt: `Write a ${formData.length} blog post about "${formData.topic}" in a ${formData.tone} tone. Keywords: ${formData.keywords}`,
                    includeImagePrompts: formData.includeImagePrompts,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 429) {
                    toast.error(`Usage limit reached! ${data.current}/${data.limit} used this month.`)
                } else {
                    toast.error(data.error || 'Failed to generate content')
                }
                return
            }

            setGeneratedContent(data.content)
            if (data.imagePrompts) {
                setImagePrompts(data.imagePrompts)
            }
            toast.success('Blog post generated successfully!')
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleSave = async () => {
        if (!generatedContent) return

        setIsSaving(true)
        try {
            const res = await fetch('/api/content/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'blog_post',
                    title: formData.topic,
                    content: generatedContent,
                    prompt: formData.topic,
                    metadata: formData,
                }),
            })

            if (res.ok) {
                toast.success('Content saved to library!')
            } else {
                toast.error('Failed to save content')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setIsSaving(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent)
        toast.success('Copied to clipboard!')
    }

    const handleDownload = () => {
        const blob = new Blob([generatedContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${formData.topic.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`
        a.click()
        URL.revokeObjectURL(url)
        toast.success('Downloaded!')
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <Sparkles className="h-8 w-8 text-primary-600" />
                    Blog Post Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Create SEO-optimized blog posts in any tone and length
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <Card variant="default">
                    <CardHeader>
                        <CardTitle>Blog Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerate} className="space-y-6">
                            <Input
                                label="Topic"
                                required
                                placeholder="e.g., The Future of AI in Content Marketing"
                                value={formData.topic}
                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                helpText="What is your blog post about?"
                            />

                            <Input
                                label="Keywords (comma-separated)"
                                placeholder="e.g., AI, content marketing, automation"
                                value={formData.keywords}
                                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                helpText="Keywords to include for SEO"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tone
                                </label>
                                <select
                                    value={formData.tone}
                                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                                >
                                    <option value="professional">Professional</option>
                                    <option value="casual">Casual</option>
                                    <option value="friendly">Friendly</option>
                                    <option value="authoritative">Authoritative</option>
                                    <option value="humorous">Humorous</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Length
                                </label>
                                <select
                                    value={formData.length}
                                    onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                                >
                                    <option value="short">Short (~300 words)</option>
                                    <option value="medium">Medium (~600 words)</option>
                                    <option value="long">Long (~1000+ words)</option>
                                </select>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.includeImagePrompts}
                                    onChange={(e) => setFormData({ ...formData, includeImagePrompts: e.target.checked })}
                                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Generate image prompts for this post
                                </span>
                            </label>

                            <Button type="submit" className="w-full" size="lg" isLoading={isGenerating}>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Generate Blog Post
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Generated Content */}
                <div className="space-y-6">
                    <Card variant="default">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Generated Content</CardTitle>
                                {generatedContent && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCopy}
                                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                            title="Copy to clipboard"
                                        >
                                            <Copy className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                            title="Download as text file"
                                        >
                                            <Download className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors disabled:opacity-50"
                                            title="Save to library"
                                        >
                                            <Save className="h-5 w-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {generatedContent ? (
                                <div className="prose dark:prose-invert max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                                        {generatedContent}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Your generated blog post will appear here</p>
                                    <p className="text-sm mt-2">Fill in the details and click Generate</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
