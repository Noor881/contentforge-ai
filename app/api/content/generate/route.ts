import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { generateContent, getSystemPrompt } from '@/lib/openai'
import { checkUsageLimit, trackUsage } from '@/lib/usage'
import { prisma } from '@/lib/db'
import { generateImagePrompts } from '@/lib/image-prompts'

export async function POST(req: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { type, params, prompt, includeImagePrompts } = await req.json()

        // Check usage limit
        const usageCheck = await checkUsageLimit(session.user.id)

        if (!usageCheck.canUse) {
            return NextResponse.json(
                {
                    error: 'Usage limit reached',
                    limit: usageCheck.limit,
                    current: usageCheck.currentUsage,
                    tier: usageCheck.tier,
                },
                { status: 429 }
            )
        }

        // Generate content
        const content = await generateContent(prompt, type)

        // Generate image prompts if requested
        let imagePrompts = null
        if (includeImagePrompts && content) {
            try {
                imagePrompts = await generateImagePrompts(content, type, 5)
            } catch (error) {
                console.error('Image prompt generation error:', error)
                // Continue even if image prompts fail
            }
        }

        // Track usage
        await trackUsage(session.user.id, 'content_generation', {
            type,
            params,
            includeImagePrompts,
        })

        return NextResponse.json({
            content,
            imagePrompts,
            usage: {
                current: usageCheck.currentUsage + 1,
                limit: usageCheck.limit,
                tier: usageCheck.tier,
            },
        })
    } catch (error) {
        console.error('Content generation error:', error)
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        )
    }
}
