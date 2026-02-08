import { NextRequest, NextResponse } from 'next/server'
import { generateVideo, HuggingFaceError } from '@/lib/huggingface'
import {
    VideoGenerationResponse,
    VIDEO_MODEL_LIST,
    getVideoModelById,
    DEFAULT_VIDEO_MODEL,
} from '@/lib/text-to-video-types'

export const maxDuration = 120

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            prompt,
            negativePrompt = '',
            model = DEFAULT_VIDEO_MODEL,
            numFrames = 16,
            guidanceScale = 9,
        } = body

        if (!prompt || prompt.trim().length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Prompt is required',
                model: '',
            } as VideoGenerationResponse, { status: 400 })
        }

        // Validate model
        const modelInfo = getVideoModelById(model)
        if (!modelInfo) {
            return NextResponse.json({
                success: false,
                error: `Invalid model. Choose from: ${VIDEO_MODEL_LIST.map(m => m.name).join(', ')}`,
                model: '',
            } as VideoGenerationResponse, { status: 400 })
        }

        const result = await generateVideo(
            model,
            prompt.trim(),
            negativePrompt.trim() || undefined,
            numFrames,
            guidanceScale
        )

        return NextResponse.json({
            success: true,
            videoBase64: result.base64,
            model: modelInfo.name,
            modelId: model,
            message: `Video generated with ${modelInfo.name}`,
            duration: numFrames / 8,
        } as VideoGenerationResponse)

    } catch (error) {
        console.error('Video generation error:', error)

        if (error instanceof HuggingFaceError) {
            return NextResponse.json({
                success: false,
                error: error.message,
                model: '',
                retryable: error.retryable,
            } as VideoGenerationResponse, { status: error.status })
        }

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
            model: '',
        } as VideoGenerationResponse, { status: 500 })
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        availableModels: VIDEO_MODEL_LIST.map(m => ({
            id: m.id,
            name: m.name,
            description: m.description,
            speed: m.speed,
            quality: m.quality,
        })),
        message: 'Text-to-Video API. POST with { prompt, model?, negativePrompt?, numFrames?, guidanceScale? }',
    })
}
