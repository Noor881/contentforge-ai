// TTS Types and Constants - Safe for client-side usage

// Groq Orpheus English voices - CORRECT voices as per Groq API
export type TTSVoice =
    | 'austin'    // Male, conversational
    | 'autumn'    // Female, warm
    | 'daniel'    // Male, professional
    | 'diana'     // Female, clear
    | 'hannah'    // Female, friendly
    | 'troy'      // Male, energetic

export type TTSSpeed = 0.25 | 0.5 | 0.75 | 1.0 | 1.25 | 1.5 | 2.0 | 3.0 | 4.0

export interface TTSOptions {
    text: string
    voice?: TTSVoice
    speed?: TTSSpeed
    model?: 'playai/playai-tts'
}

export const VOICE_DESCRIPTIONS: Record<TTSVoice, string> = {
    austin: 'Male, conversational and friendly',
    autumn: 'Female, warm and natural',
    daniel: 'Male, professional and clear',
    diana: 'Female, articulate and confident',
    hannah: 'Female, warm and approachable',
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
