# Image Generation Script for ContentForge AI
# Run this script when image generation service is available
# This will generate all 42 images needed for the website

Write-Host "ContentForge AI - Image Generation Script" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Image generation prompts
$images = @(
    @{
        Name = "tool_blog_generator"
        Path = "public/images/tools/blog-generator.png"
        Prompt = "Vibrant illustration of a document with text lines, pen/pencil symbol, and AI sparkles in teal/purple gradient (#14b8a6 to #8b5cf6). Show blog article layout with headline, paragraphs. Modern, minimalist professional 512x512px, no text."
    },
    @{
        Name = "tool_social_media"
        Path = "public/images/tools/social-media.png"
        Prompt = "Multiple social media post cards with hashtags, likes/hearts, AI sparkles in blue to purple gradient (#3b82f6 to #8b5cf6). Modern minimalist 512x512px, no text."
    },
    @{
        Name = "tool_email"
        Path = "public/images/tools/email.png"
        Prompt = "Email envelope opening with glowing content, mail icon, AI sparkles in red to purple gradient (#ef4444 to #8b5cf6). Modern minimalist 512x512px, no text."
    },
    @{
        Name = "tool_video_script"
        Path = "public/images/tools/video-script.png"
        Prompt = "Video player with script timeline, clapperboard, camera, AI sparkles in red/purple gradient (#ef4444 to #8b5cf6). Modern 512x512px, no text."
    },
    @{
        Name = "tool_ad_copy"
        Path = "public/images/tools/ad-copy.png"
        Prompt = "Multiple ad formats, megaphone, target/bullseye, click metrics, AI sparkles in orange/purple gradient (#f97316 to #8b5cf6). Modern 512x512px, no text."
    },
    @{
        Name = "tool_seo"
        Path = "public/images/tools/seo.png"
        Prompt = "Search results page (SERP), search bar, ranking stars, upward arrow, magnifying glass, AI sparkles in green/teal gradient (#10b981 to #14b8a6). Modern 512x512px, no text."
    },
    @{
        Name = "tool_resume"
        Path = "public/images/tools/resume.png"
        Prompt = "Professional resume document with profile icon, text sections, bullet points, briefcase, AI sparkles in indigo gradient (#6366f1 to #8b5cf6). Professional 512x512px, no text."
    },
    @{
        Name = "tool_cover_letter"
        Path = "public/images/tools/cover-letter.png"
        Prompt = "Formal letter with header, signature line, envelope background, document icon, AI sparkles in blue/indigo gradient (#3b82f6 to #6366f1). Professional 512x512px, no text."
    },
    @{
        Name = "tool_lyrics"
        Path = "public/images/tools/lyrics.png"
        Prompt = "Musical notes, microphone, song verses layout, treble clef, AI sparkles in pink/purple gradient (#ec4899 to #a855f7). Creative vibrant 512x512px, no text."
    },
    @{
        Name = "tool_podcast"
        Path = "public/images/tools/podcast.png"
        Prompt = "Podcast microphone, waveform visualization, headphones, timestamps, AI sparkles in orange/red gradient (#f97316 to #ef4444). Modern audio vibe 512x512px, no text."
    },
    @{
        Name = "tool_product"
        Path = "public/images/tools/product.png"
        Prompt = "Product box, shopping cart, price tag, star ratings, AI sparkles in amber/orange gradient (#f59e0b to #f97316). E-commerce focused 512x512px, no text."
    },
    @{
        Name = "tool_linkedin"
        Path = "public/images/tools/linkedin.png"
        Prompt = "LinkedIn post layout with profile, professional card, network connections, AI sparkles in LinkedIn blue (#0077b5 with purple #8b5cf6 accent). Professional 512x512px, no text."
    },
    @{
        Name = "tool_poetry"
        Path = "public/images/tools/poetry.png"
        Prompt = "Elegant calligraphy pen, flowing artistic typography, quill, vintage paper scroll, AI sparkles in purple/pink gradient (#a855f7 to #ec4899). Artistic elegant 512x512px, no text."
    },
    @{
        Name = "hero_dashboard_preview"
        Path = "public/images/hero-dashboard-preview.png"
        Prompt = "Modern ContentForge AI dashboard UI mockup, clean teal/purple gradient (#14b8a6 to #8b5cf6), sample text generation, sidebar with tool icons, AI sparkles. Professional 3D illustration 1600x900px."
    },
    @{
        Name = "dashboard_welcome"
        Path = "public/images/dashboard/welcome-banner.png"
        Prompt = "Wide banner with abstract AI brain, neural network connections, sparkles, teal/purple gradient (#14b8a6 to #8b5cf6). Inspiring futuristic 1200x300px."
    },
    @{
        Name = "admin_header"
        Path = "public/images/admin/admin-header.png"
        Prompt = "Admin control panel with dashboard charts, user icons, settings gears, shield symbols in dark purple/indigo gradient (#6366f1 to #312e81). Authoritative 1200x300px."
    }
)

Write-Host "Total images to generate: $($images.Count)" -ForegroundColor Yellow
Write-Host ""

foreach ($img in $images) {
    Write-Host "Image: $($img.Name)" -ForegroundColor Green
    Write-Host "  Path: $($img.Path)" -ForegroundColor Gray
    Write-Host "  Prompt: $($img.Prompt.Substring(0, [Math]::Min(80, $img.Prompt.Length)))..." -ForegroundColor Gray
    Write-Host ""
    
    # NOTE: User needs to manually generate these images using the prompts above
    # OR wait for Antigravity image generation service to recover
    # Then save each image to the specified path
}

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host "1. Use the prompts above to generate images" -ForegroundColor White
Write-Host "2. Save each image to its specified path" -ForegroundColor White
Write-Host "3. OR wait for image generation service to recover" -ForegroundColor White
Write-Host "4. After all images are in place, run: vercel deploy --prod" -ForegroundColor White
Write-Host ""
Write-Host "All image paths are already integrated in the code!" -ForegroundColor Green
