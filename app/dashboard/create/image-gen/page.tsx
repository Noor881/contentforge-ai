'use client'

import { useState } from 'react'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'
import {
    ImageIcon,
    Sparkles,
    Download,
    Copy,
    Loader2,
    AlertCircle,
    Zap,
    Star,
    Check,
    RefreshCw,
} from 'lucide-react'

interface ModelInfo {
    id: string
    name: string
    description: string
    speed: string
    quality: string
    style?: string
    defaultWidth?: number
    defaultHeight?: number
}

const IMAGE_MODELS: ModelInfo[] = [
    {
        id: 'black-forest-labs/FLUX.1-schnell',
        name: 'FLUX.1 Schnell',
        description: 'Fastest high-quality model. Great for quick iterations.',
        speed: 'fast',
        quality: 'high',
        style: 'Versatile',
        defaultWidth: 1024,
        defaultHeight: 1024,
    },
    {
        id: 'stabilityai/stable-diffusion-xl-base-1.0',
        name: 'Stable Diffusion XL',
        description: 'Industry standard. Excellent detail and style range.',
        speed: 'medium',
        quality: 'high',
        style: 'Versatile',
        defaultWidth: 1024,
        defaultHeight: 1024,
    },
    {
        id: 'stabilityai/stable-diffusion-3.5-large',
        name: 'Stable Diffusion 3.5',
        description: 'Latest model. Superior text rendering and composition.',
        speed: 'slow',
        quality: 'best',
        style: 'Premium',
        defaultWidth: 1024,
        defaultHeight: 1024,
    },
    {
        id: 'Lykon/dreamshaper-xl-v2-turbo',
        name: 'DreamShaper XL',
        description: 'Optimized for creative and artistic outputs.',
        speed: 'fast',
        quality: 'high',
        style: 'Artistic',
        defaultWidth: 1024,
        defaultHeight: 1024,
    },
    {
        id: 'SG161222/Realistic_Vision_V5.1_noVAE',
        name: 'Realistic Vision V5.1',
        description: 'Photorealistic outputs for portraits and scenes.',
        speed: 'medium',
        quality: 'high',
        style: 'Photorealistic',
        defaultWidth: 512,
        defaultHeight: 512,
    },
    {
        id: 'prompthero/openjourney-v4',
        name: 'OpenJourney V4',
        description: 'Midjourney-style artistic renders and concept art.',
        speed: 'fast',
        quality: 'high',
        style: 'Midjourney-style',
        defaultWidth: 512,
        defaultHeight: 512,
    },
]

const DIMENSION_PRESETS = [
    { label: 'Square', width: 512, height: 512, icon: '◻️' },
    { label: 'Portrait', width: 512, height: 768, icon: '▯' },
    { label: 'Landscape', width: 768, height: 512, icon: '▭' },
    { label: 'HD Square', width: 1024, height: 1024, icon: '🔲' },
]

const SPEED_CONFIG: Record<string, { label: string; color: string }> = {
    fast: { label: '⚡ Fast', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    medium: { label: '⏱️ Medium', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
    slow: { label: '🐢 Slow', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
}

const QUALITY_CONFIG: Record<string, { label: string; color: string }> = {
    basic: { label: '★', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400' },
    good: { label: '★★', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    high: { label: '★★★', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    best: { label: '★★★★', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
}

interface GeneratedImage {
    base64: string
    contentType: string
    model: string
    dimensions: { width: number; height: number }
    prompt: string
    timestamp: number
}

export default function ImageGeneratorPage() {
    const [prompt, setPrompt] = useState('')
    const [negativePrompt, setNegativePrompt] = useState('')
    const [selectedModel, setSelectedModel] = useState(IMAGE_MODELS[0].id)
    const [selectedDimension, setSelectedDimension] = useState(0)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
    const [showAdvanced, setShowAdvanced] = useState(false)

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.error('Please enter a prompt!')
            return
        }

        setIsGenerating(true)
        setError(null)

        try {
            const preset = DIMENSION_PRESETS[selectedDimension]
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt.trim(),
                    negativePrompt: negativePrompt.trim() || undefined,
                    model: selectedModel,
                    width: preset.width,
                    height: preset.height,
                }),
            })

            const data = await response.json()

            if (!data.success) {
                setError(data.error || 'Failed to generate image')
                if (data.retryable) {
                    toast.error('Model is loading. Try again in a few seconds.')
                } else {
                    toast.error(data.error || 'Generation failed')
                }
                return
            }

            const newImage: GeneratedImage = {
                base64: data.imageBase64,
                contentType: data.contentType,
                model: data.model,
                dimensions: data.dimensions,
                prompt: prompt.trim(),
                timestamp: Date.now(),
            }

            setGeneratedImages(prev => [newImage, ...prev])
            toast.success(`Image generated with ${data.model}!`)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred'
            setError(message)
            toast.error(message)
        } finally {
            setIsGenerating(false)
        }
    }

    const handleDownload = (image: GeneratedImage) => {
        const link = document.createElement('a')
        link.href = `data:${image.contentType};base64,${image.base64}`
        link.download = `contentforge-${image.model.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('Image downloaded!')
    }

    const handleCopy = async (image: GeneratedImage) => {
        try {
            const response = await fetch(`data:${image.contentType};base64,${image.base64}`)
            const blob = await response.blob()
            await navigator.clipboard.write([
                new ClipboardItem({ [blob.type]: blob }),
            ])
            toast.success('Image copied to clipboard!')
        } catch {
            toast.error('Failed to copy image')
        }
    }

    const currentModel = IMAGE_MODELS.find(m => m.id === selectedModel) || IMAGE_MODELS[0]

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary-600">
                        <ImageIcon className="h-7 w-7 text-white" />
                    </div>
                    AI Image Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Create stunning images from text prompts using multiple AI models
                </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Left Panel — Controls */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Model Selector */}
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Sparkles className="h-4 w-4 text-primary-500" />
                                Choose Model
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-2">
                                {IMAGE_MODELS.map((model) => {
                                    const isSelected = selectedModel === model.id
                                    const speedCfg = SPEED_CONFIG[model.speed]
                                    const qualityCfg = QUALITY_CONFIG[model.quality]
                                    return (
                                        <button
                                            key={model.id}
                                            onClick={() => setSelectedModel(model.id)}
                                            className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 ${isSelected
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500/30'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-2 right-2">
                                                    <Check className="h-4 w-4 text-primary-600" />
                                                </div>
                                            )}
                                            <div className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                                                {model.name}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 pr-5">
                                                {model.description}
                                            </p>
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${speedCfg.color}`}>
                                                    {speedCfg.label}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${qualityCfg.color}`}>
                                                    {qualityCfg.label}
                                                </span>
                                                {model.style && (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                                        {model.style}
                                                    </span>
                                                )}
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
                            <div>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="A futuristic city with flying cars at sunset, cinematic lighting, ultra detailed..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
                                    rows={4}
                                    disabled={isGenerating}
                                />
                            </div>

                            {/* Dimension Presets */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                                    Dimensions
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {DIMENSION_PRESETS.map((preset, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedDimension(idx)}
                                            className={`p-2 rounded-lg text-center text-xs font-medium border-2 transition-all ${selectedDimension === idx
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-lg mb-0.5">{preset.icon}</div>
                                            <div>{preset.label}</div>
                                            <div className="text-[10px] text-gray-400">{preset.width}×{preset.height}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Advanced Toggle */}
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
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
                                        placeholder="blurry, low quality, distorted, deformed..."
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                        disabled={isGenerating}
                                    />
                                </div>
                            )}

                            {/* Generate Button */}
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
                                        <Sparkles className="h-5 w-5 mr-2" />
                                        Generate Image
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel — Results */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Error Display */}
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

                    {/* Generation in Progress */}
                    {isGenerating && (
                        <Card variant="default">
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-16">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 animate-spin" />
                                        <Sparkles className="h-8 w-8 text-primary-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <p className="mt-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Generating with {currentModel.name}...
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        This may take 10-30 seconds depending on the model
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Generated Images Gallery */}
                    {generatedImages.length > 0 ? (
                        <div className="space-y-6">
                            {generatedImages.map((image, idx) => (
                                <Card key={image.timestamp} variant="default" className="overflow-hidden">
                                    <div className="relative group">
                                        <img
                                            src={`data:${image.contentType};base64,${image.base64}`}
                                            alt={image.prompt}
                                            className="w-full rounded-t-xl"
                                        />
                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                                            <button
                                                onClick={() => handleDownload(image)}
                                                className="p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg transition-all hover:scale-110"
                                                title="Download"
                                            >
                                                <Download className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleCopy(image)}
                                                className="p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg transition-all hover:scale-110"
                                                title="Copy to clipboard"
                                            >
                                                <Copy className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[300px]">
                                                    &ldquo;{image.prompt}&rdquo;
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                                                        {image.model}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400">
                                                        {image.dimensions.width}×{image.dimensions.height}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleDownload(image)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleCopy(image)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : !isGenerating && (
                        <Card variant="default">
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
                                    <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
                                        <ImageIcon className="h-10 w-10" />
                                    </div>
                                    <p className="font-medium text-gray-600 dark:text-gray-400">Your images will appear here</p>
                                    <p className="text-sm mt-1">Choose a model, enter a prompt, and click Generate</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Info Footer */}
            <div className="mt-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Free AI Image Generation</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Powered by Hugging Face Inference API. Models are free but rate-limited. If a model is loading,
                            wait a few seconds and try again. Different models excel at different styles — experiment to find your favorite!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
