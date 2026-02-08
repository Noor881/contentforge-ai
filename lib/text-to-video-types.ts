// Types for text-to-video generation feature using Hugging Face models

export interface VideoGenerationRequest {
    prompt: string
    negativePrompt?: string
    model?: string
    numFrames?: number // Default: 16 frames (about 1-2 seconds)
    fps?: number // Default: 8
    guidanceScale?: number // Default: 9
}

export interface VideoGenerationResponse {
    success: boolean
    videoUrl?: string
    videoBase64?: string
    message?: string
    error?: string
    model: string
    modelId?: string
    duration?: number // seconds
    retryable?: boolean
}

// Model info for frontend display
export interface VideoModelInfo {
    id: string
    name: string
    description: string
    speed: 'fast' | 'medium' | 'slow'
    quality: 'basic' | 'good' | 'best'
}

// Available text-to-video models on Hugging Face
export const VIDEO_MODEL_LIST: VideoModelInfo[] = [
    {
        id: 'THUDM/CogVideoX-2b',
        name: 'CogVideoX-2b',
        description: 'Best quality video generation. Smooth, coherent clips.',
        speed: 'slow',
        quality: 'best',
    },
    {
        id: 'ByteDance/AnimateDiff-Lightning',
        name: 'AnimateDiff Lightning',
        description: 'Ultra-fast animated video. Great for motion effects.',
        speed: 'fast',
        quality: 'good',
    },
    {
        id: 'ali-vilab/text-to-video-ms-1.7b',
        name: 'ModelScope T2V',
        description: 'Balanced speed and quality for general video.',
        speed: 'medium',
        quality: 'good',
    },
    {
        id: 'PAIR/Text2Video-Zero',
        name: 'Text2Video-Zero',
        description: 'Zero-shot video from text. Lightweight and fast.',
        speed: 'fast',
        quality: 'basic',
    },
    {
        id: 'cerspense/zeroscope_v2_576w',
        name: 'Zeroscope V2',
        description: 'Watermark-free video. Good motion coherence.',
        speed: 'medium',
        quality: 'good',
    },
]

export const DEFAULT_VIDEO_MODEL = VIDEO_MODEL_LIST[0].id

export const getVideoModelById = (id: string) => VIDEO_MODEL_LIST.find(m => m.id === id)

// Speed/quality display helpers
export const VIDEO_SPEED_CONFIG: Record<string, { label: string; color: string }> = {
    fast: { label: '⚡ Fast', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    medium: { label: '⏱️ Medium', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
    slow: { label: '🐢 Slow', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
}

export const VIDEO_QUALITY_CONFIG: Record<string, { label: string; color: string }> = {
    basic: { label: '★', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400' },
    good: { label: '★★', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    best: { label: '★★★', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
}
