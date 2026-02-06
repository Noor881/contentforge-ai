import OpenAI from 'openai'

// Use Groq for TTS (same client as content generation)
const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || '',
    baseURL: 'https://api.groq.com/openai/v1',
})

// Groq Orpheus English voices
export type TTSVoice =
    | 'austin'    // Male, conversational
    | 'hannah'    // Female, warm and friendly
    | 'jennifer'  // Female, professional
    | 'john'      // Male, authoritative
    | 'troy'      // Male, energetic

export type TTSSpeed = 0.25 | 0.5 | 0.75 | 1.0 | 1.25 | 1.5 | 2.0 | 3.0 | 4.0

export interface TTSOptions {
    text: string
    voice?: TTSVoice
    speed?: TTSSpeed
    model?: 'canopylabs/orpheus-v1-english'
}

export async function generateSpeech(options: TTSOptions): Promise<Buffer> {
    const {
        text,
        voice = 'hannah',
        speed = 1.0,
        model = 'canopylabs/orpheus-v1-english'
    } = options

    if (!process.env.GROQ_API_KEY) {
        throw new Error('Groq API key not configured')
    }

    if (!text || text.trim().length === 0) {
        throw new Error('Text is required for TTS generation')
    }

    // Limit text length to prevent abuse (4096 characters max)
    const truncatedText = text.slice(0, 4096)

    try {
        // Groq Orpheus supports vocal directions like [cheerful], [sad], [excited]
        const response = await groq.audio.speech.create({
            model,
            voice,
            input: truncatedText,
            response_format: 'wav', // Groq uses WAV format
        })

        const buffer = Buffer.from(await response.arrayBuffer())
        return buffer
    } catch (error: any) {
        console.error('Groq TTS generation error:', error)
        throw new Error(`Failed to generate speech: ${error.message}`)
    }
}

export const VOICE_DESCRIPTIONS: Record<TTSVoice, string> = {
    austin: 'Male, conversational and friendly',
    hannah: 'Female, warm and approachable',
    jennifer: 'Female, professional and clear',
    john: 'Male, authoritative and confident',
    troy: 'Male, energetic and enthusiastic',
}

// Groq Orpheus supports vocal directions for expressive speech
export const VOCAL_DIRECTIONS = [
    '[cheerful]',
    '[sad]',
    '[excited]',
    '[calm]',
    '[serious]',
    '[friendly]',
    '[professional]',
] as const

export function addVocalDirection(text: string, direction: string): string {
    return `${direction} ${text}`
}

