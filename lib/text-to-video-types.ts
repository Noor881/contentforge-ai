// Types for text-to-video generation feature using Hugging Face models

export interface VideoGenerationRequest {
    prompt: string
    negativePrompt?: string
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
    duration?: number // seconds
}

// Available text-to-video models on Hugging Face
export const HUGGING_FACE_VIDEO_MODELS = {
    // Best quality, requires more compute
    COGVIDEOX_2B: 'THUDM/CogVideoX-2b',
    // Faster, lower quality
    MODELSCOPE: 'ali-vilab/text-to-video-ms-1.7b', // Non-commercial only
    // Zero-shot, no video training needed
    TEXT2VIDEO_ZERO: 'PAIR/Text2Video-Zero',
} as const

export type HuggingFaceVideoModel = typeof HUGGING_FACE_VIDEO_MODELS[keyof typeof HUGGING_FACE_VIDEO_MODELS]

// Default model - CogVideoX-2b for best quality
export const DEFAULT_VIDEO_MODEL = HUGGING_FACE_VIDEO_MODELS.COGVIDEOX_2B
