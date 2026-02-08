'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Video, Play, Download, Loader2, AlertCircle, Check, RefreshCw, Sparkles } from 'lucide-react'
import {
    VIDEO_MODEL_LIST,
    VIDEO_SPEED_CONFIG,
    VIDEO_QUALITY_CONFIG,
    VideoGenerationResponse,
} from '@/lib/text-to-video-types'

export default function TextToVideoGenerator() {
    const [prompt, setPrompt] = useState('')
    const [negativePrompt, setNegativePrompt] = useState('')
    const [selectedModel, setSelectedModel] = useState(VIDEO_MODEL_LIST[0].id)
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<VideoGenerationResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showAdvanced, setShowAdvanced] = useState(false)

    const currentModel = VIDEO_MODEL_LIST.find(m => m.id === selectedModel) || VIDEO_MODEL_LIST[0]

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt describing the video you want to create.')
            return
        }

        setIsGenerating(true)
        setError(null)
        setResult(null)

        try {
            const response = await fetch('/api/generate-video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt.trim(),
                    negativePrompt: negativePrompt.trim() || undefined,
                    model: selectedModel,
                }),
            })

            const data = (await response.json()) as VideoGenerationResponse

            if (!data.success) {
                setError(data.error || 'Failed to generate video. Please try again.')
                return
            }

            setResult(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleDownload = () => {
        if (!result?.videoBase64) return

        const link = document.createElement('a')
        link.href = `data:video/mp4;base64,${result.videoBase64}`
        link.download = `contentforge-video-${Date.now()}.mp4`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary-600">
                        <Video className="h-7 w-7 text-white" />
                    </div>
                    AI Text-to-Video Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Transform text prompts into short video clips using multiple AI models
                </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Left Panel — Controls */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Model Selector */}
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Sparkles className="h-4 w-4 text-violet-500" />
                                Choose Model
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {VIDEO_MODEL_LIST.map((model) => {
                                    const isSelected = selectedModel === model.id
                                    const speedCfg = VIDEO_SPEED_CONFIG[model.speed]
                                    const qualityCfg = VIDEO_QUALITY_CONFIG[model.quality]
                                    return (
                                        <button
                                            key={model.id}
                                            onClick={() => setSelectedModel(model.id)}
                                            className={`relative w-full p-3 rounded-xl border-2 text-left transition-all duration-200 ${isSelected
                                                ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 ring-1 ring-violet-500/30'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-2 right-2">
                                                    <Check className="h-4 w-4 text-violet-600" />
                                                </div>
                                            )}
                                            <div className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                                                {model.name}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 pr-5">
                                                {model.description}
                                            </p>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${speedCfg.color}`}>
                                                    {speedCfg.label}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${qualityCfg.color}`}>
                                                    {qualityCfg.label}
                                                </span>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Prompt */}
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle className="text-base">Prompt</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="A futuristic city with flying cars at sunset, cinematic lighting..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none text-sm"
                                rows={4}
                                disabled={isGenerating}
                            />

                            {/* Advanced Toggle */}
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
                            >
                                {showAdvanced ? 'Hide' : 'Show'} advanced options
                            </button>

                            {showAdvanced && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                                        Negative prompt (what to avoid)
                                    </label>
                                    <input
                                        type="text"
                                        value={negativePrompt}
                                        onChange={(e) => setNegativePrompt(e.target.value)}
                                        placeholder="blurry, low quality, distorted..."
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                                        disabled={isGenerating}
                                    />
                                </div>
                            )}

                            <Button
                                onClick={handleGenerate}
                                disabled={isGenerating || !prompt.trim()}
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                                size="lg"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        Generating with {currentModel.name}...
                                    </>
                                ) : (
                                    <>
                                        <Play className="h-5 w-5 mr-2" />
                                        Generate Video
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel — Result */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-red-800 dark:text-red-300">Generation Failed</p>
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                                <button
                                    onClick={() => { setError(null); handleGenerate() }}
                                    className="mt-2 text-sm text-red-700 dark:text-red-400 hover:underline flex items-center gap-1"
                                >
                                    <RefreshCw className="h-3 w-3" /> Try again
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading */}
                    {isGenerating && (
                        <Card variant="default">
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-16">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full border-4 border-violet-200 dark:border-violet-800 border-t-violet-600 animate-spin" />
                                        <Video className="h-8 w-8 text-violet-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <p className="mt-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Generating with {currentModel.name}...
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Video generation can take 30-120 seconds
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Result */}
                    {result?.success && result.videoBase64 ? (
                        <Card variant="default" className="overflow-hidden">
                            <div className="rounded-t-xl overflow-hidden bg-black">
                                <video
                                    src={`data:video/mp4;base64,${result.videoBase64}`}
                                    controls
                                    autoPlay
                                    loop
                                    className="w-full"
                                />
                            </div>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                                            {result.model}
                                        </span>
                                        <span className="text-xs text-gray-400 ml-2">
                                            ~{result.duration}s
                                        </span>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleDownload}
                                    >
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : !isGenerating && !error && (
                        <Card variant="default">
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
                                    <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
                                        <Video className="h-10 w-10" />
                                    </div>
                                    <p className="font-medium text-gray-600 dark:text-gray-400">Your video will appear here</p>
                                    <p className="text-sm mt-1">Choose a model, enter a prompt, and click Generate</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
