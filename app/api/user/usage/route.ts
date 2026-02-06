import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getUsageStats } from '@/lib/usage'

export async function GET(req: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const usage = await getUsageStats(session.user.id)

        return NextResponse.json(usage)
    } catch (error) {
        console.error('Usage stats error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch usage stats' },
            { status: 500 }
        )
    }
}
