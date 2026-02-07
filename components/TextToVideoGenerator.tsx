'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Video, Play, Download, Loader2, AlertCircle } from 'lucide-react'
import { VideoGenerationResponse } from '@/lib/text-to-video-types'

interface TextToVideoGeneratorProps {
    userTier?: 'free' | 'basic' | 'pro'
}

export default function TextToVideoGenerator({ userTier = 'pro' }: TextToVideoGeneratorProps) {
    const [prompt, setPrompt] = useState('')
    const [negativePrompt, setNegativePrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<VideoGenerationResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt.trim(),
                    negativePrompt: negativePrompt.trim(),
                    tier: userTier,
                }),
            })

            const data = await response.json() as VideoGenerationResponse

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
        <Card variant="default" className="p-6">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                        <Video className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">AI Text-to-Video Generator</CardTitle>
                        <CardDescription>
                            Transform text prompts into short videos using AI
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div>
                    <label htmlFor="video-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Describe your video <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="video-prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="A futuristic city with flying cars at sunset, cinematic lighting..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        rows={4}
                        disabled={isGenerating}
                    />
                </div>

                {/* Negative Prompt (Advanced) */}
                <div>
                    <label htmlFor="negative-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Negative prompt <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                        id="negative-prompt"
                        type="text"
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        placeholder="blurry, low quality, distorted..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        disabled={isGenerating}
                    />
                </div>

                {/* Tier Badge */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Model tier:</span>
                    <span className={`px-2 py-1 rounded-full font-medium ${userTier === 'pro' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                            userTier === 'basic' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                        {userTier.charAt(0).toUpperCase() + userTier.slice(1)}
                    </span>
                </div>

                {/* Generate Button */}
                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full"
                    size="lg"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            Generating Video...
                        </>
                    ) : (
                        <>
                            <Play className="h-5 w-5 mr-2" />
                            Generate Video
                        </>
                    )}
                </Button>

                {/* Error Display */}
                {error && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-red-800 dark:text-red-300">Generation Failed</p>
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                        </div>
                    </div>
                )}

                {/* Result Display */}
                {result?.success && result.videoBase64 && (
                    <div className="space-y-4">
                        <div className="rounded-lg overflow-hidden bg-black">
                            <video
                                src={`data:video/mp4;base64,${result.videoBase64}`}
                                controls
                                autoPlay
                                loop
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Duration: ~{result.duration}s | Model: {result.model.split('/').pop()}</span>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleDownload}
                            >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                            </Button>
                        </div>
                    </div>
                )}

                {/* Usage Note */}
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Video generation uses AI models. Results may vary. Pro tier uses CogVideoX-2b for best quality.
                </p>
            </CardContent>
        </Card>
    )
}
