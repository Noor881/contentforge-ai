import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin, getAdminStats } from '@/lib/admin'

export async function GET(req: NextRequest) {
    try {
        await requireAdmin()

        const stats = await getAdminStats()

        return NextResponse.json(stats)
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch stats' },
            { status: 500 }
        )
    }
}
