import { z } from 'zod'

// Auth validations
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

// Content generation validations
export const blogGenerationSchema = z.object({
    topic: z.string().min(5, 'Topic must be at least 5 characters'),
    keywords: z.string().optional(),
    tone: z.enum(['professional', 'casual', 'friendly', 'authoritative', 'humorous']),
    length: z.enum(['short', 'medium', 'long']),
})

export const socialMediaSchema = z.object({
    platform: z.enum(['twitter', 'linkedin', 'instagram', 'facebook']),
    topic: z.string().min(5, 'Topic must be at least 5 characters'),
    tone: z.enum(['professional', 'casual', 'friendly', 'inspirational', 'humorous']),
    includeHashtags: z.boolean().optional(),
    includeEmojis: z.boolean().optional(),
})

export const emailSchema = z.object({
    purpose: z.enum(['marketing', 'newsletter', 'welcome', 'announcement', 'promotion']),
    topic: z.string().min(5, 'Topic must be at least 5 characters'),
    tone: z.enum(['professional', 'casual', 'friendly', 'urgent']),
    includeSubject: z.boolean().optional(),
})

export const videoScriptSchema = z.object({
    topic: z.string().min(5, 'Topic must be at least 5 characters'),
    duration: z.enum(['30s', '1min', '3min', '5min', '10min']),
    style: z.enum(['educational', 'entertaining', 'promotional', 'tutorial']),
    includeHooks: z.boolean().optional(),
})

export const adCopySchema = z.object({
    product: z.string().min(3, 'Product name must be at least 3 characters'),
    platform: z.enum(['google', 'facebook', 'instagram', 'twitter', 'linkedin']),
    targetAudience: z.string().min(5, 'Target audience must be at least 5 characters'),
    callToAction: z.string().optional(),
})

export const seoMetaSchema = z.object({
    pageTitle: z.string().min(5, 'Page title must be at least 5 characters'),
    keywords: z.string().min(5, 'Keywords must be at least 5 characters'),
    targetLength: z.enum(['short', 'medium', 'long']),
})

// Contact form validation
export const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(20, 'Message must be at least 20 characters'),
})

// Newsletter validation
export const newsletterSchema = z.object({
    email: z.string().email('Invalid email address'),
})

// Profile update validation
export const profileUpdateSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email address').optional(),
})

// Types
export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type BlogGenerationInput = z.infer<typeof blogGenerationSchema>
export type SocialMediaInput = z.infer<typeof socialMediaSchema>
export type EmailInput = z.infer<typeof emailSchema>
export type VideoScriptInput = z.infer<typeof videoScriptSchema>
export type AdCopyInput = z.infer<typeof adCopySchema>
export type SEOMetaInput = z.infer<typeof seoMetaSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
