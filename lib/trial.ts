import { prisma } from './db'
import { differenceInDays, addDays } from 'date-fns'

const TRIAL_DAYS = parseInt(process.env.TRIAL_DAYS || '3', 10)

export async function startTrial(userId: string) {
    const trialStartDate = new Date()
    const trialEndDate = addDays(trialStartDate, TRIAL_DAYS)

    await prisma.user.update({
        where: { id: userId },
        data: {
            trialStartDate,
            trialEndDate,
            isTrialActive: true,
            subscriptionStatus: 'trial',
            usageResetDate: addDays(new Date(), 30),
        },
    })

    return { trialStartDate, trialEndDate }
}

export async function getTrialStatus(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            trialStartDate: true,
            trialEndDate: true,
            isTrialActive: true,
            subscriptionStatus: true,
        },
    })

    if (!user || !user.trialEndDate) {
        return {
            isActive: false,
            daysRemaining: 0,
            hoursRemaining: 0,
            hasExpired: true,
        }
    }

    const now = new Date()
    const endDate = new Date(user.trialEndDate)

    if (now > endDate) {
        // Trial has expired
        if (user.isTrialActive) {
            await expireTrial(userId)
        }
        return {
            isActive: false,
            daysRemaining: 0,
            hoursRemaining: 0,
            hasExpired: true,
        }
    }

    const daysRemaining = differenceInDays(endDate, now)
    const hoursRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60))

    return {
        isActive: user.isTrialActive,
        daysRemaining: Math.max(0, daysRemaining),
        hoursRemaining: Math.max(0, hoursRemaining),
        hasExpired: false,
        endDate: user.trialEndDate,
    }
}

export async function expireTrial(userId: string) {
    await prisma.user.update({
        where: { id: userId },
        data: {
            isTrialActive: false,
            subscriptionStatus: 'expired',
        },
    })
}

export async function convertTrialToPaid(userId: string, tier: string) {
    await prisma.user.update({
        where: { id: userId },
        data: {
            isTrialActive: false,
            subscriptionStatus: 'active',
            subscriptionTier: tier,
        },
    })
}

export function shouldSendTrialReminder(daysRemaining: number, remindersSent: number[]): boolean {
    // Send reminders on day 2, 1, and when trial is about to expire (last day)
    const reminderDays = [2, 1, 0]

    for (const day of reminderDays) {
        if (daysRemaining === day && !remindersSent.includes(day)) {
            return true
        }
    }

    return false
}
