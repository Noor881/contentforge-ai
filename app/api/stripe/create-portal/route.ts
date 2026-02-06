import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createCustomerPortal } from '@/lib/stripe'

export async function POST(req: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const portalUrl = await createCustomerPortal(session.user.id)

        return NextResponse.json({ url: portalUrl })
    } catch (error) {
        console.error('Create portal error:', error)
        return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 })
    }
}
