// Unified Hugging Face Inference API Client
// Handles auth, retries on model loading (503), rate limiting (429)

const HF_API_BASE = 'https://api-inference.huggingface.co/models'
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 5000

interface HFInferenceOptions {
    model: string
    inputs: string
    parameters?: Record<string, unknown>
    returnType?: 'json' | 'blob'
}

interface HFErrorResponse {
    error: string
    estimated_time?: number
}

export class HuggingFaceError extends Error {
    status: number
    retryable: boolean

    constructor(message: string, status: number, retryable = false) {
        super(message)
        this.name = 'HuggingFaceError'
        this.status = status
        this.retryable = retryable
    }
}

function getApiKey(): string {
    const key = process.env.HUGGING_FACE_API_KEY
    if (!key) {
        throw new HuggingFaceError(
            'Hugging Face API key not configured. Please add HUGGING_FACE_API_KEY to environment variables.',
            500,
            false
        )
    }
    return key
}

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Call the Hugging Face Inference API with automatic retry on model loading.
 * Returns the raw Response for flexible handling (JSON or blob).
 */
export async function callHuggingFace(options: HFInferenceOptions): Promise<Response> {
    const { model, inputs, parameters } = options
    const apiKey = getApiKey()
    const url = `${HF_API_BASE}/${model}`

    let lastError: Error | null = null

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs,
                    parameters,
                }),
            })

            // Model is loading — wait and retry
            if (response.status === 503) {
                const errorData = await response.json().catch(() => ({})) as HFErrorResponse
                const waitTime = errorData.estimated_time
                    ? Math.min(errorData.estimated_time * 1000, 30000)
                    : RETRY_DELAY_MS

                if (attempt < MAX_RETRIES - 1) {
                    await sleep(waitTime)
                    continue
                }

                throw new HuggingFaceError(
                    'Model is still loading. Please try again in a few moments.',
                    503,
                    true
                )
            }

            // Rate limited
            if (response.status === 429) {
                throw new HuggingFaceError(
                    'Rate limit exceeded. The free tier allows limited requests. Please wait a moment and try again.',
                    429,
                    true
                )
            }

            // Other errors
            if (!response.ok) {
                const errorText = await response.text()
                throw new HuggingFaceError(
                    `API Error (${response.status}): ${errorText}`,
                    response.status,
                    false
                )
            }

            return response
        } catch (error) {
            if (error instanceof HuggingFaceError) {
                throw error
            }
            lastError = error as Error
        }
    }

    throw new HuggingFaceError(
        lastError?.message || 'Failed to connect to Hugging Face API',
        500,
        true
    )
}

/**
 * Generate an image from a text prompt.
 * Returns the image as a base64 string.
 */
export async function generateImage(
    model: string,
    prompt: string,
    negativePrompt?: string,
    width?: number,
    height?: number
): Promise<{ base64: string; contentType: string }> {
    const parameters: Record<string, unknown> = {}
    if (negativePrompt) parameters.negative_prompt = negativePrompt
    if (width) parameters.width = width
    if (height) parameters.height = height

    const response = await callHuggingFace({
        model,
        inputs: prompt,
        parameters,
    })

    const blob = await response.blob()
    const buffer = await blob.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const contentType = blob.type || 'image/png'

    return { base64, contentType }
}

/**
 * Generate a video from a text prompt.
 * Returns the video as a base64 string.
 */
export async function generateVideo(
    model: string,
    prompt: string,
    negativePrompt?: string,
    numFrames?: number,
    guidanceScale?: number
): Promise<{ base64: string; contentType: string }> {
    const parameters: Record<string, unknown> = {}
    if (negativePrompt) parameters.negative_prompt = negativePrompt
    if (numFrames) parameters.num_frames = numFrames
    if (guidanceScale) parameters.guidance_scale = guidanceScale

    const response = await callHuggingFace({
        model,
        inputs: prompt,
        parameters,
    })

    const blob = await response.blob()
    const buffer = await blob.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const contentType = blob.type || 'video/mp4'

    return { base64, contentType }
}
