'use client'

import { useState, useRef } from 'react'
import Button from './ui/Button'
import { Volume2, Download, Loader2, Play, Pause } from 'lucide-react'
import toast from 'react-hot-toast'
import { TTSVoice, VOICE_DESCRIPTIONS } from '@/lib/tts'

interface TTSPlayerProps {
    text: string
    className?: string
}

export default function TTSPlayer({ text, className = '' }: TTSPlayerProps) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [selectedVoice, setSelectedVoice] = useState<TTSVoice>('hannah')
    const [speed, setSpeed] = useState<number>(1.0)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const generateAudio = async () => {
        if (!text || text.trim().length === 0) {
            toast.error('No text to convert to speech')
            return
        }

        setIsGenerating(true)

        try {
            const res = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text.slice(0, 4096), // Limit to 4096 chars
                    voice: selectedVoice,
                    speed,
                }),
            })

            if (!res.ok) {
                const error = await res.json()
                toast.error(error.error || 'Failed to generate speech')
                return
            }

            const blob = await res.blob()
            const url = URL.createObjectURL(blob)

            // Clean up old audio URL
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl)
            }

            setAudioUrl(url)

            // Create new audio element
            if (audioRef.current) {
                audioRef.current.pause()
            }

            const audio = new Audio(url)
            audioRef.current = audio

            audio.onended = () => setIsPlaying(false)
            audio.onplay = () => setIsPlaying(true)
            audio.onpause = () => setIsPlaying(false)

            toast.success('Speech generated! Click play to listen.')
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setIsGenerating(false)
        }
    }

    const togglePlayPause = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
    }

    const downloadAudio = () => {
        if (!audioUrl) return

        const a = document.createElement('a')
        a.href = audioUrl
        a.download = 'speech.wav'
        a.click()
        toast.success('Downloading audio...')
    }

    return (
        <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4 ${className}`}>
            <div className="flex items-center gap-2 mb-3">
                <Volume2 className="h-5 w-5 text-primary-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    Text-to-Speech
                </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Voice
                    </label>
                    <select
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value as TTSVoice)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                        disabled={isGenerating}
                    >
                        {(Object.entries(VOICE_DESCRIPTIONS) as [TTSVoice, string][]).map(([voice, desc]) => (
                            <option key={voice} value={voice}>
                                {voice.charAt(0).toUpperCase() + voice.slice(1)} - {desc}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Speed: {speed}x
                    </label>
                    <input
                        type="range"
                        min="0.25"
                        max="4"
                        step="0.25"
                        value={speed}
                        onChange={(e) => setSpeed(parseFloat(e.target.value))}
                        className="w-full"
                        disabled={isGenerating}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0.25x</span>
                        <span>4.0x</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <Button
                    onClick={generateAudio}
                    isLoading={isGenerating}
                    disabled={isGenerating || !text}
                    className="flex-1"
                    size="sm"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Volume2 className="mr-2 h-4 w-4" />
                            Generate Speech
                        </>
                    )}
                </Button>

                {audioUrl && (
                    <>
                        <Button
                            onClick={togglePlayPause}
                            variant="outline"
                            size="sm"
                        >
                            {isPlaying ? (
                                <Pause className="h-4 w-4" />
                            ) : (
                                <Play className="h-4 w-4" />
                            )}
                        </Button>

                        <Button
                            onClick={downloadAudio}
                            variant="outline"
                            size="sm"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    </>
                )}
            </div>

            {text && text.length > 4096 && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                    Note: Text is limited to 4096 characters. Only the first 4096 characters will be converted.
                </p>
            )}
        </div>
    )
}
