// Hugging Face Model Registry — Image Generation & Text-to-Video
// All models available on HF Inference API (free tier, rate-limited)

export interface HFModel {
    id: string
    name: string
    description: string
    category: 'image' | 'video'
    speed: 'fast' | 'medium' | 'slow'
    quality: 'basic' | 'good' | 'high' | 'best'
    style?: string
    maxWidth?: number
    maxHeight?: number
    defaultWidth?: number
    defaultHeight?: number
}

// ─────────────────────────────────────────────
// IMAGE GENERATION MODELS
// ─────────────────────────────────────────────

export const IMAGE_MODELS: HFModel[] = [
    {
        id: 'black-forest-labs/FLUX.1-schnell',
        name: 'FLUX.1 Schnell',
        description: 'Fastest high-quality model. Great for quick iterations and drafts.',
        category: 'image',
        speed: 'fast',
        quality: 'high',
        style: 'Versatile',
        defaultWidth: 1024,
        defaultHeight: 1024,
        maxWidth: 1024,
        maxHeight: 1024,
    },
    {
        id: 'stabilityai/stable-diffusion-xl-base-1.0',
        name: 'Stable Diffusion XL',
        description: 'Industry standard. Excellent detail, wide style range, great prompt following.',
        category: 'image',
        speed: 'medium',
        quality: 'high',
        style: 'Versatile',
        defaultWidth: 1024,
        defaultHeight: 1024,
        maxWidth: 1024,
        maxHeight: 1024,
    },
    {
        id: 'stabilityai/stable-diffusion-3.5-large',
        name: 'Stable Diffusion 3.5',
        description: 'Latest Stability AI model. Superior text rendering and composition.',
        category: 'image',
        speed: 'slow',
        quality: 'best',
        style: 'Premium',
        defaultWidth: 1024,
        defaultHeight: 1024,
        maxWidth: 1024,
        maxHeight: 1024,
    },
    {
        id: 'Lykon/dreamshaper-xl-v2-turbo',
        name: 'DreamShaper XL',
        description: 'Optimized for creative and artistic outputs. Fast turbo mode.',
        category: 'image',
        speed: 'fast',
        quality: 'high',
        style: 'Artistic / Creative',
        defaultWidth: 1024,
        defaultHeight: 1024,
        maxWidth: 1024,
        maxHeight: 1024,
    },
    {
        id: 'SG161222/Realistic_Vision_V5.1_noVAE',
        name: 'Realistic Vision V5.1',
        description: 'Photorealistic outputs. Best for portraits, products, and real-world scenes.',
        category: 'image',
        speed: 'medium',
        quality: 'high',
        style: 'Photorealistic',
        defaultWidth: 512,
        defaultHeight: 512,
        maxWidth: 768,
        maxHeight: 768,
    },
    {
        id: 'prompthero/openjourney-v4',
        name: 'OpenJourney V4',
        description: 'Midjourney-style artistic renders. Perfect for illustrations and concept art.',
        category: 'image',
        speed: 'fast',
        quality: 'high',
        style: 'Midjourney-style',
        defaultWidth: 512,
        defaultHeight: 512,
        maxWidth: 768,
        maxHeight: 768,
    },
]

// ─────────────────────────────────────────────
// TEXT-TO-VIDEO MODELS
// ─────────────────────────────────────────────

export const VIDEO_MODELS: HFModel[] = [
    {
        id: 'THUDM/CogVideoX-2b',
        name: 'CogVideoX-2b',
        description: 'Best quality video generation. Produces smooth, coherent clips.',
        category: 'video',
        speed: 'slow',
        quality: 'best',
    },
    {
        id: 'ByteDance/AnimateDiff-Lightning',
        name: 'AnimateDiff Lightning',
        description: 'Ultra-fast animated video generation. Great for motion effects.',
        category: 'video',
        speed: 'fast',
        quality: 'good',
    },
    {
        id: 'ali-vilab/text-to-video-ms-1.7b',
        name: 'ModelScope T2V',
        description: 'Balanced speed and quality. Good for general video generation.',
        category: 'video',
        speed: 'medium',
        quality: 'good',
    },
    {
        id: 'PAIR/Text2Video-Zero',
        name: 'Text2Video-Zero',
        description: 'Zero-shot video from text. Lightweight and fast.',
        category: 'video',
        speed: 'fast',
        quality: 'basic',
    },
    {
        id: 'cerspense/zeroscope_v2_576w',
        name: 'Zeroscope V2',
        description: 'Watermark-free video generation. Good motion coherence.',
        category: 'video',
        speed: 'medium',
        quality: 'good',
    },
]

// Helpers
export const getImageModelById = (id: string) => IMAGE_MODELS.find(m => m.id === id)
export const getVideoModelById = (id: string) => VIDEO_MODELS.find(m => m.id === id)
export const DEFAULT_IMAGE_MODEL = IMAGE_MODELS[0].id
export const DEFAULT_VIDEO_MODEL = VIDEO_MODELS[0].id

export const SPEED_LABELS: Record<string, string> = {
    fast: '⚡ Fast',
    medium: '⏱️ Medium',
    slow: '🐢 Slow',
}

export const QUALITY_LABELS: Record<string, string> = {
    basic: '★',
    good: '★★',
    high: '★★★',
    best: '★★★★',
}

export const SPEED_COLORS: Record<string, string> = {
    fast: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    slow: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
}

export const QUALITY_COLORS: Record<string, string> = {
    basic: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400',
    good: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    high: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    best: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}
