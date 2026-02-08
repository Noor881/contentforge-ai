import { NextRequest, NextResponse } from 'next/server'
import { generateImage, HuggingFaceError } from '@/lib/huggingface'
import { IMAGE_MODELS, getImageModelById, DEFAULT_IMAGE_MODEL } from '@/lib/hf-models'

export const maxDuration = 60

interface ImageGenRequest {
    prompt: string
    negativePrompt?: string
    model?: string
    width?: number
    height?: number
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as ImageGenRequest

        const {
            prompt,
            negativePrompt,
            model = DEFAULT_IMAGE_MODEL,
            width,
            height,
        } = body

        if (!prompt || prompt.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: 'Prompt is required' },
                { status: 400 }
            )
        }

        // Validate model is in our allowed list
        const modelInfo = getImageModelById(model)
        if (!modelInfo) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid model. Choose from: ${IMAGE_MODELS.map(m => m.name).join(', ')}`,
                },
                { status: 400 }
            )
        }

        // Clamp dimensions to model limits
        const finalWidth = Math.min(width || modelInfo.defaultWidth || 512, modelInfo.maxWidth || 1024)
        const finalHeight = Math.min(height || modelInfo.defaultHeight || 512, modelInfo.maxHeight || 1024)

        const result = await generateImage(
            model,
            prompt.trim(),
            negativePrompt?.trim(),
            finalWidth,
            finalHeight
        )

        return NextResponse.json({
            success: true,
            imageBase64: result.base64,
            contentType: result.contentType,
            model: modelInfo.name,
            modelId: model,
            dimensions: { width: finalWidth, height: finalHeight },
            message: `Image generated with ${modelInfo.name}`,
        })
    } catch (error) {
        console.error('Image generation error:', error)

        if (error instanceof HuggingFaceError) {
            return NextResponse.json(
                { success: false, error: error.message, retryable: error.retryable },
                { status: error.status }
            )
        }

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        availableModels: IMAGE_MODELS.map(m => ({
            id: m.id,
            name: m.name,
            description: m.description,
            speed: m.speed,
            quality: m.quality,
            style: m.style,
            defaultWidth: m.defaultWidth,
            defaultHeight: m.defaultHeight,
        })),
        message: 'Image Generation API. POST with { prompt, model?, negativePrompt?, width?, height? }',
    })
}
