import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getTrialStatus } from '@/lib/trial'

export async function GET(req: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const trialStatus = await getTrialStatus(session.user.id)

        return NextResponse.json(trialStatus)
    } catch (error) {
        console.error('Trial status error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch trial status' },
            { status: 500 }
        )
    }
}
