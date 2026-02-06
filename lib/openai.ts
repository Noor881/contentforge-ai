import OpenAI from 'openai'

// Initialize Groq client (OpenAI-compatible API)
const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || '',
    baseURL: 'https://api.groq.com/openai/v1',
})

// Smart model selection based on content type
const MODEL_SELECTION = {
    // Fast, lightweight tasks (560 t/sec) - Best for quick content
    fast: 'llama-3.1-8b-instant',

    // Versatile, high-quality (280 t/sec) - Best for complex long-form
    versatile: 'llama-3.3-70b-versatile',

    // Ultra-fast (1000 t/sec) - Best for simple parallel tasks
    ultraFast: 'openai/gpt-oss-20b',

    // Advanced reasoning (500 t/sec) - Best for complex analysis
    advanced: 'openai/gpt-oss-120b',
}

// Map content types to optimal models
function selectModel(type: string): string {
    const modelMap: Record<string, string> = {
        // Long-form content - use versatile model
        'blog_post': MODEL_SELECTION.versatile,
        'article': MODEL_SELECTION.versatile,
        'podcast': MODEL_SELECTION.versatile,

        // Professional documents - use advanced reasoning
        'resume': MODEL_SELECTION.advanced,
        'cover_letter': MODEL_SELECTION.advanced,
        'business_plan': MODEL_SELECTION.advanced,
        'proposal': MODEL_SELECTION.advanced,
        'linkedin': MODEL_SELECTION.advanced,

        // Creative content - use versatile
        'song_lyrics': MODEL_SELECTION.versatile,
        'poem': MODEL_SELECTION.versatile,
        'story': MODEL_SELECTION.versatile,

        // Short content - use fast model
        'social_media': MODEL_SELECTION.fast,
        'ad_copy': MODEL_SELECTION.fast,
        'email': MODEL_SELECTION.fast,
        'seo': MODEL_SELECTION.fast,
        'product': MODEL_SELECTION.fast,

        // Video scripts - use ultraFast for quick turnaround
        'video_script': MODEL_SELECTION.ultraFast,

        // Default to versatile
        'default': MODEL_SELECTION.versatile,
    }

    return modelMap[type] || modelMap['default']
}

if (!process.env.GROQ_API_KEY) {
    console.warn('GROQ_API_KEY is not set - using mock responses')
}

export const llmClient = process.env.GROQ_API_KEY ? groq : null

export async function generateContent(prompt: string, type: string): Promise<string> {
    // If no API key, return mock content
    if (!llmClient) {
        return getMockContent(type)
    }

    try {
        const systemPrompt = getSystemPrompt(type)
        const model = selectModel(type)

        console.log(`Using model: ${model} for content type: ${type}`)

        const completion = await llmClient.chat.completions.create({
            model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt },
            ],
            temperature: 0.7,
            max_tokens: getMaxTokens(type),
        })

        return completion.choices[0]?.message?.content || 'Failed to generate content'
    } catch (error) {
        console.error('Groq API error:', error)
        // Return mock content if Groq fails
        return getMockContent(type)
    }
}

// Determine max tokens based on content type
function getMaxTokens(type: string): number {
    const tokenMap: Record<string, number> = {
        'article': 8000,
        'blog_post': 4000,
        'podcast': 6000,
        'resume': 2000,
        'story': 8000,
        'business_plan': 8000,
        'default': 4000,
    }

    return tokenMap[type] || tokenMap['default']
}

export function getSystemPrompt(type: string): string {
    switch (type) {
        case 'blog':
            return 'You are a professional blog writer. Create engaging, well-structured blog content with clear headings and proper formatting.'
        case 'social':
            return 'You are a social media expert. Create engaging, concise social media content. Keep it attention-grabbing and shareable.'
        case 'email':
            return 'You are an email marketing specialist. Create persuasive, clear email content that drives action.'
        case 'video-script':
            return 'You are a video script writer. Create engaging video scripts with clear sections and timing cues.'
        case 'ad-copy':
            return 'You are an advertising copywriter. Create persuasive, concise ad copy that converts.'
        case 'seo':
            return 'You are an SEO specialist. Create compelling meta descriptions under 160 characters optimized for search engines.'
        default:
            return 'You are a helpful AI assistant. Create high-quality content based on the user\'s request.'
    }
}

function getMockContent(type: string): string {
    const mockContent: Record<string, string> = {
        blog: `# The Future of AI Content Creation

Artificial Intelligence is revolutionizing how we create content. From blog posts to social media updates, AI-powered tools are transforming the way we work.

## Key Benefits

- Save time and resources
- Maintain consistent quality
- Scale content production
- Overcome writer's block

## Conclusion

AI-powered tools are becoming essential for modern content creators. Start your journey today!`,

        social: `🚀 Discover how AI is transforming content creation in 2026!

✨ Create professional content in seconds
⚡ Save 10+ hours every week
💡 Never run out of ideas

Try it free for 3 days! #AIContent #ContentCreation #Productivity`,

        email: `Subject: Transform Your Content Strategy with AI

Dear Subscriber,

Imagine creating a week's worth of content in just one hour. With AI-powered tools, this is now your reality.

Discover how thousands of creators are:
- Saving 10+ hours per week
- Improving content quality
- Scaling their reach

Start your free 3-day trial today!

Best regards,
ContentForge AI Team`,

        'video-script': `[0:00-0:05] HOOK
"What if I told you that you could create a month's worth of content in a single day?"

[0:05-0:15] INTRODUCTION
"Hi, I'm here to show you how AI is changing the content creation game..."

[0:15-0:45] MAIN CONTENT
"Here are the top 3 ways AI can transform your workflow..."

[0:45-1:00] CALL TO ACTION
"Ready to try it yourself? Start your free trial today!"`,

        'ad-copy': `🎯 Create Professional Content in Seconds

✅ AI-Powered Generation
✅ 6 Content Types
✅ 3-Day Free Trial

Join 10,000+ creators saving 10 hours/week.

👉 Start Free Trial Now`,

        seo: `AI-powered content creation platform that helps marketers and creators generate high-quality blog posts, social media content, and marketing copy in seconds.`,
    }

    return mockContent[type] || 'Sample AI-generated content. Configure your Groq API key for real generation.'
}
