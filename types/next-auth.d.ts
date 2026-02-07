import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            email: string
            name?: string | null
            image?: string | null
            subscriptionStatus: string
            subscriptionTier: string
            isTrialActive: boolean
            trialEndDate: Date | null
            isAdmin: boolean
        }
    }

    interface User {
        subscriptionStatus?: string
        subscriptionTier?: string
        isTrialActive?: boolean
        trialEndDate?: Date | null
        isAdmin?: boolean
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        sub: string
    }
}
