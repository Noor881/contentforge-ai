import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
    try {
        await requireAdmin()

        const deleted = await prisma.suspiciousActivity.deleteMany({})

        return NextResponse.json({
            message: `Cleared ${deleted.count} security alerts`,
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to clear alerts' },
            { status: 500 }
        )
    }
}
