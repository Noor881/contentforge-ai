import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'
import { Pencil, MessageSquare, Mail, Video, Target, Search } from 'lucide-react'
import Card, { CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = genMeta({
    title: 'Features',
    description: 'Discover all the powerful AI content creation tools in ContentForge AI. Generate blogs, social media posts, emails, video scripts, ad copy, and SEO content effortlessly.',
})

const features = [
    {
        icon: Pencil,
        name: 'Blog Post Generator',
        description: 'Create SEO-optimized, engaging blog posts in any tone and length',
        benefits: [
            'Choose from professional, casual, friendly, authoritative, or humorous tones',
            'Select short (300 words), medium (600 words), or long (1000+ words)',
            'Automatically includes proper headings and structure',
            'Keyword optimization for better SEO performance',
        ],
        useCases: [
            'Content marketing teams scaling blog production',
            'Solo bloggers maintaining consistent posting schedules',
            'Businesses establishing thought leadership',
        ],
    },
    {
        icon: MessageSquare,
        name: 'Social Media Content Creator',
        description: 'Generate platform-optimized posts for all major social networks',
        benefits: [
            'Platform-specific formatting for Twitter, LinkedIn, Instagram, Facebook',
            'Automatic hashtag suggestions for better reach',
            'Emoji integration for higher engagement',
            'Character count optimization per platform',
        ],
        useCases: [
            'Social media managers scheduling weekly content',
            'Influencers maintaining daily posting consistency',
            'Brands building community engagement',
        ],
    },
    {
        icon: Mail,
        name: 'Email Template Generator',
        description: 'Craft compelling email campaigns that drive conversions',
        benefits: [
            'Subject line generation for maximum open rates',
            'Purpose-specific templates (marketing, newsletter, welcome, promotion)',
            'Tone customization for brand voice consistency',
            'Call-to-action optimization',
        ],
        useCases: [
            'Email marketers running multi-campaign strategies',
            'E-commerce businesses driving sales',
            'SaaS companies nurturing leads',
        ],
    },
    {
        icon: Video,
        name: 'Video Script Writer',
        description: 'Write professional video scripts with perfect structure and timing',
        benefits: [
            'Duration-based scripts (30s, 1min, 3min, 5min, 10min)',
            'Style options: educational, entertaining, promotional, tutorial',
            'Built-in hooks and attention-grabbing openings',
            'Timing cues for seamless production',
        ],
        useCases: [
            'YouTubers producing regular content',
            'Marketing teams creating video ads',
            'Educators developing course materials',
        ],
    },
    {
        icon: Target,
        name: 'Ad Copy Generator',
        description: 'Create high-converting ad copy for all major platforms',
        benefits: [
            'Platform-specific formats (Google, Facebook, Instagram, Twitter, LinkedIn)',
            'Target audience customization',
            'A/B testing variations',
            'Compelling CTA generation',
        ],
        useCases: [
            'PPC specialists managing multiple campaigns',
            'Small businesses advertising on a budget',
            'Agencies serving multiple clients',
        ],
    },
    {
        icon: Search,
        name: 'SEO Meta Description Tool',
        description: 'Generate keyword-rich meta descriptions that boost rankings',
        benefits: [
            'Optimized for 155-160 character limit',
            'Keyword integration for better rankings',
            'Click-worthy descriptions that drive traffic',
            'Multiple variations for testing',
        ],
        useCases: [
            'SEO specialists optimizing websites',
            'Content teams publishing regularly',
            'E-commerce stores with large product catalogs',
        ],
    },
]

export default function FeaturesPage() {
    return (
        <>
            <Header />
            <main className="py-20">
                <div className="container-custom">
                    {/* Hero */}
                    <div className="text-center mb-20">
                        <h1 className="text-responsive-xl font-display font-bold text-gray-900 dark:text-white mb-6">
                            Powerful Features for{' '}
                            <span className="gradient-text">Every Content Need</span>
                        </h1>
                        <p className="text-responsive-md text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Six specialized AI tools designed to transform your content creation workflow
                        </p>
                    </div>

                    {/* Feature Sections */}
                    <div className="space-y-16">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <div
                                    key={index}
                                    className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                                        }`}
                                >
                                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                                        <div className="inline-flex rounded-xl p-3 bg-primary-50 dark:bg-primary-900/20 mb-4">
                                            <Icon className="h-8 w-8 text-primary-600" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                            {feature.name}
                                        </h2>
                                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                                            {feature.description}
                                        </p>

                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                            Key Benefits:
                                        </h3>
                                        <ul className="space-y-2 mb-6">
                                            {feature.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-1">✓</span>
                                                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                            Perfect For:
                                        </h3>
                                        <ul className="space-y-2">
                                            {feature.useCases.map((useCase, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-primary-600 mt-1">→</span>
                                                    <span className="text-gray-700 dark:text-gray-300">{useCase}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                                        <Card variant="glass" className="p-8">
                                            <div className="aspect-square bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                                                <Icon className="h-24 w-24 text-white opacity-50" />
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* CTA */}
                    <div className="mt-20 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Ready to Transform Your Content?
                        </h2>
                        <Link href="/signup">
                            <Button size="lg">Start Your Free Trial</Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
