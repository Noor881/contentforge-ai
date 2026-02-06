import OpenAI from 'openai'
import { TTSVoice, TTSSpeed, TTSOptions } from './tts-types'

// Re-export types for backward compatibility
export * from './tts-types'

// Use Groq for TTS (same client as content generation)
const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || '',
    baseURL: 'https://api.groq.com/openai/v1',
})

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
