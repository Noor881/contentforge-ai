import { generateContent as generateGroqContent } from './openai'

export interface ImagePrompt {
    title: string
    prompt: string
    context: string
    style?: string
}

export async function generateImagePrompts(
    content: string,
    contentType: string,
    count: number = 5
): Promise<ImagePrompt[]> {
    try {
        const promptText = `Based on the following ${contentType} content, generate ${count} detailed image prompts for professional visuals that would complement this content. 

Content:
${content.slice(0, 2000)}

For each image, provide:
1. A short title (3-5 words)
2. A detailed prompt suitable for AI image generation (MidJourney/DALL-E/Stable Diffusion)
3. Context about where this image would be placed
4. Suggested visual style

Format your response as a JSON array with objects containing: title, prompt, context, style

Example format:
[
  {
    "title": "Hero Header Image",
    "prompt": "Modern minimalist office workspace, laptop with analytics dashboard, natural lighting from large windows, professional photography, 4k, ultra detailed",
    "context": "Main header image for the article",
    "style": "Professional photography, bright and clean"
  }
]

Return ONLY the JSON array, no other text.`

        const result = await generateGroqContent(promptText, 'image-prompts')

        // Try to parse JSON response
        try {
            // Extract JSON from response (in case there's surrounding text)
            const jsonMatch = result.match(/\[[\s\S]*\]/)
            if (jsonMatch) {
                const prompts = JSON.parse(jsonMatch[0])
                return prompts.slice(0, count)
            }
        } catch (parseError) {
            console.error('Failed to parse image prompts:', parseError)
        }

        // Fallback: generate simple prompts
        return generateFallbackPrompts(content, contentType, count)
    } catch (error) {
        console.error('Image prompt generation error:', error)
        return generateFallbackPrompts(content, contentType, count)
    }
}

function generateFallbackPrompts(
    content: string,
    contentType: string,
    count: number
): ImagePrompt[] {
    const prompts: ImagePrompt[] = []

    const templates = [
        {
            title: 'Hero Image',
            prompt: `Professional ${contentType} header image, modern design, high quality, 4k`,
            context: 'Main header or featured image',
            style: 'Professional photography',
        },
        {
            title: 'Supporting Visual',
            prompt: `Conceptual illustration for ${contentType}, vibrant colors, clean composition`,
            context: 'Mid-article visual break',
            style: 'Modern illustration',
        },
        {
            title: 'Data Visualization',
            prompt: 'Clean infographic style chart, professional colors, minimalist design',
            context: 'Statistics or data section',
            style: 'Infographic',
        },
        {
            title: 'Background Texture',
            prompt: 'Subtle gradient background, professional color scheme, abstract pattern',
            context: 'Section background',
            style: 'Abstract texture',
        },
        {
            title: 'Call-to-Action',
            prompt: 'Inspiring motivational image, professional setting, high energy',
            context: 'CTA section or conclusion',
            style: 'Lifestyle photography',
        },
    ]

    return templates.slice(0, count)
}

export async function generateImagePromptsForBlog(blogContent: string): Promise<ImagePrompt[]> {
    return generateImagePrompts(blogContent, 'blog post', 5)
}

export async function generateImagePromptsForVideo(scriptContent: string): Promise<ImagePrompt[]> {
    return generateImagePrompts(scriptContent, 'video script', 7)
}

export async function generateImagePromptsForArticle(articleContent: string): Promise<ImagePrompt[]> {
    return generateImagePrompts(articleContent, 'article', 10)
}
