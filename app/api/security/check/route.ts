import { NextRequest, NextResponse } from 'next/server'
import { checkFingerprintSecurity } from '@/lib/fingerprint'
import { calculateRiskScore, shouldAutoBlock } from '@/lib/behavior-analysis'
import { getClientIp } from '@/lib/ip-check'

/**
 * Security check API endpoint
 * Validates fingerprint + IP combination for abuse
 */
export async function POST(req: NextRequest) {
    try {
        const { fingerprint, userId } = await req.json()

        if (!fingerprint) {
            return NextResponse.json(
                { error: 'Fingerprint is required' },
                { status: 400 }
            )
        }

        // Get client IP
        const ip = await getClientIp()

        // Check fingerprint security
        const fpCheck = await checkFingerprintSecurity(fingerprint, ip)

        let result: any = {
            allowed: fpCheck.allowed,
            riskScore: fpCheck.riskScore,
        }

        // If user ID provided, calculate behavioral risk score
        if (userId) {
            const behaviorCheck = await calculateRiskScore(userId)
            const autoBlockCheck = await shouldAutoBlock(userId)

            result = {
                ...result,
                riskScore: Math.max(fpCheck.riskScore, behaviorCheck.score),
                flags: behaviorCheck.flags,
                details: behaviorCheck.details,
                shouldAutoBlock: autoBlockCheck.shouldBlock,
                autoBlockReason: autoBlockCheck.reason,
            }

            // Override allowed if should auto-block
            if (autoBlockCheck.shouldBlock) {
                result.allowed = false
                result.reason = autoBlockCheck.reason
            }
        }

        if (!fpCheck.allowed) {
            result.reason = fpCheck.reason
        }

        return NextResponse.json(result)
    } catch (error: any) {
        console.error('Security check error:', error)
        return NextResponse.json(
            { error: 'Security check failed' },
            { status: 500 }
        )
    }
}
