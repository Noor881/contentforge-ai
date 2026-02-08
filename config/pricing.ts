// Pricing Plans Configuration for ContentForge AI

export interface PricingTier {
    id: string
    name: string
    price: number // USD per month
    yearlyPrice?: number // USD per year (if applicable)
    description: string
    features: string[]
    limits: {
        monthlyGenerations: number
        toolAccess: string[] // 'all' or specific tools
        priority: 'standard' | 'high' | 'highest'
        support: string
    }
    popular?: boolean
    paypalPlanId?: string // PayPal subscription plan ID
}

export const PRICING_TIERS: PricingTier[] = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        description: 'Try ContentForge AI risk-free',
        features: [
            '3 AI generations (lifetime)',
            'Access to 5 basic tools',
            'Community support',
        ],
        limits: {
            monthlyGenerations: 3,
            toolAccess: ['blog-post', 'social-media', 'product-description', 'email', 'headline'],
            priority: 'standard',
            support: 'Community forum',
        },
    },
    {
        id: 'starter',
        name: 'Starter',
        price: 19,
        yearlyPrice: 190, // ~$16/month
        description: 'For individuals and side projects',
        features: [
            '50 AI generations per month',
            'Access to 10 tools',
            'Basic text-to-speech',
            'Email support',
            'Content library storage',
        ],
        limits: {
            monthlyGenerations: 50,
            toolAccess: ['blog-post', 'social-media', 'product-description', 'email', 'headline', 'seo-meta', 'ad-copy', 'video-script', 'newsletter', 'landing-page'],
            priority: 'standard',
            support: 'Email support (48-72h)',
        },
        paypalPlanId: process.env.PAYPAL_STARTER_PLAN_ID,
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 49,
        yearlyPrice: 490, // ~$41/month
        description: 'For content creators and small teams',
        features: [
            '500 AI generations per month',
            'Access to all 13 tools',
            'Unlimited text-to-speech',
            'Priority support (12h response)',
            'Team collaboration (up to 3 members)',
            'Advanced analytics',
            'Custom templates',
            'API access',
        ],
        limits: {
            monthlyGenerations: 500,
            toolAccess: ['all'],
            priority: 'highest',
            support: 'Priority email + chat (12h)',
        },
        popular: true,
        paypalPlanId: process.env.PAYPAL_PRO_PLAN_ID,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 199,
        yearlyPrice: 1990, // ~$166/month
        description: 'For agencies and large teams',
        features: [
            'Unlimited AI generations',
            'Access to all 13 tools',
            'Unlimited text-to-speech',
            'Dedicated account manager',
            'Unlimited team members',
            'Advanced analytics & reporting',
            'Custom integrations',
            'White-label options',
            'SLA guarantee',
            'API access with higher limits',
        ],
        limits: {
            monthlyGenerations: -1, // unlimited
            toolAccess: ['all'],
            priority: 'highest',
            support: 'Dedicated manager + phone',
        },
        paypalPlanId: process.env.PAYPAL_ENTERPRISE_PLAN_ID,
    },
]

export function getPricingTier(tierId: string): PricingTier | undefined {
    return PRICING_TIERS.find((tier) => tier.id === tierId)
}

export function canUserGenerate(
    tier: string,
    monthlyUsage: number
): boolean {
    const pricingTier = getPricingTier(tier)
    if (!pricingTier) return false

    // Unlimited for enterprise
    if (pricingTier.limits.monthlyGenerations === -1) return true

    return monthlyUsage < pricingTier.limits.monthlyGenerations
}
