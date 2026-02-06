"use client";

import { useState, useRef } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Volume2, Download, Play, Pause, Loader2, Copy, Trash2 } from "lucide-react";
import { TTSVoice, VOICE_DESCRIPTIONS } from "@/lib/tts-types";

export default function TextToSpeechPage() {
    const [text, setText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState<TTSVoice>("hannah");
    const [speed, setSpeed] = useState<number>(1.0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleGenerate = async () => {
        if (!text || text.trim().length === 0) {
            toast.error("Please enter some text to convert to speech");
            return;
        }

        setIsGenerating(true);

        try {
            const res = await fetch("/api/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: text.slice(0, 4096),
                    voice: selectedVoice,
                    speed,
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                toast.error(error.error || "Failed to generate speech");
                return;
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            // Clean up old audio URL
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }

            setAudioUrl(url);

            // Create new audio element
            if (audioRef.current) {
                audioRef.current.pause();
            }

            const audio = new Audio(url);
            audioRef.current = audio;

            audio.onended = () => setIsPlaying(false);
            audio.onplay = () => setIsPlaying(true);
            audio.onpause = () => setIsPlaying(false);

            toast.success("Speech generated! Click play to listen.");
        } catch (error) {
            toast.error("An error occurred while generating speech");
        } finally {
            setIsGenerating(false);
        }
    };

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    const downloadAudio = () => {
        if (!audioUrl) return;

        const a = document.createElement("a");
        a.href = audioUrl;
        a.download = "contentforge-speech.wav";
        a.click();
        toast.success("Downloading audio...");
    };

    const clearAll = () => {
        setText("");
        if (audioRef.current) {
            audioRef.current.pause();
        }
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        setAudioUrl(null);
        setIsPlaying(false);
    };

    const pasteFromClipboard = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setText(clipboardText);
            toast.success("Text pasted from clipboard");
        } catch (error) {
            toast.error("Could not paste from clipboard");
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <Volume2 className="h-8 w-8 text-primary-600" />
                    Text to Speech
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert your text to natural-sounding speech using AI
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <Card variant="default">
                    <CardHeader>
                        <CardTitle>Enter Your Text</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Text to Convert
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={pasteFromClipboard}
                                        className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
                                    >
                                        <Copy className="h-3 w-3" />
                                        Paste
                                    </button>
                                    <button
                                        onClick={clearAll}
                                        className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                        Clear
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none resize-none"
                                rows={10}
                                placeholder="Enter the text you want to convert to speech. You can paste blog posts, articles, or any text content here..."
                                maxLength={4096}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>{text.length} / 4096 characters</span>
                                {text.length > 4096 && (
                                    <span className="text-amber-600">
                                        Only first 4096 characters will be converted
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Voice Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Select Voice
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {(Object.entries(VOICE_DESCRIPTIONS) as [TTSVoice, string][]).map(
                                    ([voice, description]) => (
                                        <button
                                            key={voice}
                                            onClick={() => setSelectedVoice(voice)}
                                            className={`p-3 rounded-lg border-2 text-left transition-all ${selectedVoice === voice
                                                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                                                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                                                }`}
                                        >
                                            <p className="font-medium text-gray-900 dark:text-white capitalize">
                                                {voice}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {description}
                                            </p>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Speed Control */}
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
                                className="w-full accent-primary-600"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0.25x (Slow)</span>
                                <span>1x (Normal)</span>
                                <span>4x (Fast)</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleGenerate}
                            className="w-full"
                            size="lg"
                            isLoading={isGenerating}
                            disabled={!text || isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Generating Speech...
                                </>
                            ) : (
                                <>
                                    <Volume2 className="mr-2 h-5 w-5" />
                                    Generate Speech
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Output Section */}
                <div className="space-y-6">
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle>Audio Player</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {audioUrl ? (
                                <div className="space-y-6">
                                    {/* Playback Controls */}
                                    <div className="flex items-center justify-center gap-4">
                                        <Button
                                            onClick={togglePlayPause}
                                            size="lg"
                                            className="w-20 h-20 rounded-full"
                                        >
                                            {isPlaying ? (
                                                <Pause className="h-8 w-8" />
                                            ) : (
                                                <Play className="h-8 w-8 ml-1" />
                                            )}
                                        </Button>
                                    </div>

                                    {/* Status */}
                                    <div className="text-center">
                                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                                            {isPlaying ? "Now Playing..." : "Ready to Play"}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Voice: {selectedVoice.charAt(0).toUpperCase() + selectedVoice.slice(1)} | Speed: {speed}x
                                        </p>
                                    </div>

                                    {/* Download Button */}
                                    <Button
                                        onClick={downloadAudio}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <Download className="mr-2 h-5 w-5" />
                                        Download Audio (WAV)
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    <Volume2 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                                    <p className="text-lg font-medium">No audio generated yet</p>
                                    <p className="text-sm mt-2">
                                        Enter your text and click "Generate Speech" to create audio
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Tips & Info */}
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle>Tips for Best Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 mt-1">•</span>
                                    <span>
                                        <strong>Punctuation matters:</strong> Use commas and periods for natural pauses
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 mt-1">•</span>
                                    <span>
                                        <strong>Try different voices:</strong> Each voice has a unique personality
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 mt-1">•</span>
                                    <span>
                                        <strong>Adjust speed:</strong> Use slower speeds for educational content
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary-600 mt-1">•</span>
                                    <span>
                                        <strong>Max 4096 characters:</strong> Break longer content into parts
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Use Cases */}
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle>Popular Use Cases</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="font-medium text-gray-900 dark:text-white">📱 Social Media</p>
                                    <p className="text-xs text-gray-500">Voiceovers for Reels & TikTok</p>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="font-medium text-gray-900 dark:text-white">🎙️ Podcasts</p>
                                    <p className="text-xs text-gray-500">Intros, outros, segments</p>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="font-medium text-gray-900 dark:text-white">📚 Audiobooks</p>
                                    <p className="text-xs text-gray-500">Convert written content</p>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="font-medium text-gray-900 dark:text-white">🎬 Videos</p>
                                    <p className="text-xs text-gray-500">Narration & voiceovers</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
