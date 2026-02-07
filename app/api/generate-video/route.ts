import { NextRequest, NextResponse } from 'next/server'
import {
    VideoGenerationRequest,
    VideoGenerationResponse,
    HUGGING_FACE_VIDEO_MODELS,
    DEFAULT_VIDEO_MODEL
} from '@/lib/text-to-video-types'

// Hugging Face Inference API endpoint
const HF_INFERENCE_URL = 'https://api-inference.huggingface.co/models'

// Model pricing tiers based on website pricing
const MODEL_TIERS = {
    free: HUGGING_FACE_VIDEO_MODELS.TEXT2VIDEO_ZERO,
    basic: HUGGING_FACE_VIDEO_MODELS.MODELSCOPE,
    pro: HUGGING_FACE_VIDEO_MODELS.COGVIDEOX_2B,
} as const

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as VideoGenerationRequest & { tier?: 'free' | 'basic' | 'pro' }

        const {
            prompt,
            negativePrompt = '',
            numFrames = 16,
            guidanceScale = 9,
            tier = 'pro' // Default to pro tier
        } = body

        if (!prompt || prompt.trim().length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Prompt is required',
                model: '',
            } as VideoGenerationResponse, { status: 400 })
        }

        // Select model based on tier
        const model = MODEL_TIERS[tier] || DEFAULT_VIDEO_MODEL

        // Check for API key
        const hfApiKey = process.env.HUGGING_FACE_API_KEY

        if (!hfApiKey) {
            return NextResponse.json({
                success: false,
                error: 'Hugging Face API key not configured. Please add HUGGING_FACE_API_KEY to environment variables.',
                model,
            } as VideoGenerationResponse, { status: 500 })
        }

        // Call Hugging Face Inference API
        const response = await fetch(`${HF_INFERENCE_URL}/${model}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${hfApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    negative_prompt: negativePrompt,
                    num_frames: numFrames,
                    guidance_scale: guidanceScale,
                },
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()

            // Check for model loading (common with free tier)
            if (response.status === 503) {
                return NextResponse.json({
                    success: false,
                    error: 'Model is loading. Please try again in a few seconds.',
                    model,
                } as VideoGenerationResponse, { status: 503 })
            }

            // Check for rate limiting
            if (response.status === 429) {
                return NextResponse.json({
                    success: false,
                    error: 'Rate limit exceeded. Please upgrade your plan or try again later.',
                    model,
                } as VideoGenerationResponse, { status: 429 })
            }

            return NextResponse.json({
                success: false,
                error: `API Error: ${errorText}`,
                model,
            } as VideoGenerationResponse, { status: response.status })
        }

        // Hugging Face returns the video as a blob
        const videoBlob = await response.blob()
        const videoBuffer = await videoBlob.arrayBuffer()
        const videoBase64 = Buffer.from(videoBuffer).toString('base64')

        return NextResponse.json({
            success: true,
            videoBase64,
            model,
            message: `Video generated successfully using ${tier} tier (${model})`,
            duration: numFrames / 8, // Approximate duration in seconds
        } as VideoGenerationResponse)

    } catch (error) {
        console.error('Video generation error:', error)
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
            model: '',
        } as VideoGenerationResponse, { status: 500 })
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        availableModels: Object.entries(MODEL_TIERS).map(([tier, model]) => ({
            tier,
            model,
        })),
        message: 'Text-to-Video API is ready. Send POST request with { prompt, tier? }',
    })
}
