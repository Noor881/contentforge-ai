import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { generateSpeech, TTSVoice, TTSSpeed } from '@/lib/tts'

export async function POST(req: NextRequest) {
    try {
        const { text, voice, speed } = await req.json()

        if (!text) {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            )
        }

        // Generate speech
        const audioBuffer = await generateSpeech({
            text,
            voice: voice as TTSVoice,
            speed: speed as TTSSpeed,
        })

        // Return WAV audio file (Groq Orpheus format)
        // Convert Buffer to Uint8Array for Response compatibility
        return new Response(new Uint8Array(audioBuffer), {
            headers: {
                'Content-Type': 'audio/wav',
                'Content-Disposition': 'attachment; filename="speech.wav"',
            },
        })
    } catch (error: any) {
        console.error('TTS API error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to generate speech' },
            { status: 500 }
        )
    }
}
