# ContentForge AI - Model Selection Strategy

## Groq Model Selection

This application uses intelligent model routing to select the optimal Groq model based on content type and complexity.

## Available Models

### 1. **llama-3.1-8b-instant** (Fast)
- **Speed:** 560 tokens/sec
- **Cost:** $0.05 input / $0.08 output per 1M tokens
- **Best for:** Quick, short-form content
- **Use cases:** Social media posts, product descriptions, emails, SEO meta tags

### 2. **llama-3.3-70b-versatile** (Versatile)
- **Speed:** 280 tokens/sec
- **Cost:** $0.59 input / $0.79 output per 1M tokens
- **Best for:** Complex long-form content
- **Use cases:** Blog posts, articles, podcasts, creative writing

### 3. **openai/gpt-oss-20b** (Ultra-Fast)
- **Speed:** 1000 tokens/sec
- **Cost:** $0.075 input / $0.30 output per 1M tokens
- **Best for:** Simple parallel tasks requiring speed
- **Use cases:** Video scripts, quick drafts

### 4. **openai/gpt-oss-120b** (Advanced)
- **Speed:** 500 tokens/sec
- **Cost:** $0.15 input / $0.60 output per 1M tokens
- **Best for:** Complex reasoning and professional documents
- **Use cases:** Resumes, cover letters, business plans, LinkedIn optimization

## Automatic Model Routing

The system automatically selects the optimal model in `lib/openai.ts`:

```typescript
const modelMap = {
    // Long-form → Versatile
    'blog_post': 'llama-3.3-70b-versatile',
    'article': 'llama-3.3-70b-versatile',
    
    // Professional → Advanced Reasoning
    'resume': 'openai/gpt-oss-120b',
    'cover_letter': 'openai/gpt-oss-120b',
    
    // Creative → Versatile
    'song_lyrics': 'llama-3.3-70b-versatile',
    'poem': 'llama-3.3-70b-versatile',
    
    // Short content → Fast
    'social_media': 'llama-3.1-8b-instant',
    'product': 'llama-3.1-8b-instant',
    
    // Video → Ultra-Fast
    'video_script': 'openai/gpt-oss-20b',
}
```

## Dynamic Token Limits

Max tokens are adjusted based on content type:
- Articles: 8000 tokens
- Podcasts: 6000 tokens
- Blog posts: 4000 tokens
- Resumes: 2000 tokens
- Default: 4000 tokens

## Benefits

1. **Cost Optimization:** Use cheaper models for simple tasks
2. **Speed Optimization:** Fast models for time-sensitive content
3. **Quality Optimization:** Advanced models for complex professional content
4. **Automatic Selection:** No manual configuration needed
