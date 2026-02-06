# Groq TTS Integration

## Overview

ContentForge AI now uses **Groq's Orpheus English TTS model** for text-to-speech functionality.

## Model Details

- **Model ID:** `canopylabs/orpheus-v1-english`
- **Format:** WAV audio
- **Character Limit:** 4096 characters per request
- **Speed:** Supports 0.25x to 4.0x playback speed

## Available Voices

| Voice | Gender | Description |
|---|---|---|
| **hannah** | Female | Warm and approachable (default) |
| **jennifer** | Female | Professional and clear |
| **austin** | Male | Conversational and friendly |
| **john** | Male | Authoritative and confident |
| **troy** | Male | Energetic and enthusiastic |

## Vocal Directions (Expressive Speech)

Groq Orpheus supports vocal direction tags for expressive speech:

```typescript
[cheerful] - Happy, upbeat tone
[sad] - Melancholic tone
[excited] - Energetic, enthusiastic tone
[calm] - Peaceful, relaxing tone
[serious] - Formal, authoritative tone
[friendly] - Warm, conversational tone
[professional] - Business-appropriate tone
```

### Example Usage

```javascript
const text = "[cheerful] Welcome to our platform! [professional] Here's what you need to know.";
```

## Benefits Over OpenAI TTS

1. **Single API Provider** - Use Groq for both content generation AND TTS
2. **Expressive Speech** - Vocal directions for emotion/tone control
3. **Cost Optimization** - Consolidated billing
4. **No OpenAI API Key Needed** - One less API key to manage

## API Usage

```typescript
// lib/tts.ts
import { generateSpeech } from '@/lib/tts'

const audio = await generateSpeech({
    text: "Hello world!",
    voice: "hannah",
    speed: 1.0
})
```

## Implementation Files

- [lib/tts.ts](file:///c:/Users/snowp/.gemini/antigravity/scratch/contentforge-ai/lib/tts.ts) - TTS library using Groq
- [app/api/tts/route.ts](file:///c:/Users/snowp/.gemini/antigravity/scratch/contentforge-ai/app/api/tts/route.ts) - TTS API endpoint
- [components/TTSPlayer.tsx](file:///c:/Users/snowp/.gemini/antigravity/scratch/contentforge-ai/components/TTSPlayer.tsx) - TTS player UI component
