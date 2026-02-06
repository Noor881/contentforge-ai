// TTS Types and Constants - Safe for client-side usage

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
