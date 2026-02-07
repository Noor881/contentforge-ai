import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
    try {
        await requireAdmin()

        await prisma.user.updateMany({
            data: { monthlyUsageCount: 0 },
        })

        return NextResponse.json({
            message: 'All monthly usage counters have been reset',
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to reset usage' },
            { status: 500 }
        )
    }
}
