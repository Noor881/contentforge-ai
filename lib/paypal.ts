// PayPal SDK Integration for ContentForge AI
// Merchant Email: aitips2304@gmail.com

interface PayPalOrderResponse {
    id: string
    status: string
    links: Array<{
        href: string
        rel: string
        method: string
    }>
}

interface PayPalCaptureResponse {
    id: string
    status: string
    purchase_units: Array<{
        payments: {
            captures: Array<{
                id: string
                status: string
                amount: {
                    currency_code: string
                    value: string
                }
            }>
        }
    }>
}

const PAYPAL_API_BASE =
    process.env.NODE_ENV === 'production'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com'

/**
 * Get PayPal access token
 */
async function getAccessToken(): Promise<string> {
    const clientId = process.env.PAYPAL_CLIENT_ID
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET

    if (!clientId || !clientSecret) {
        throw new Error('PayPal credentials not configured')
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    })

    const data = await response.json()
    return data.access_token
}

/**
 * Create PayPal order for one-time payment
 */
export async function createPayPalOrder(
    amount: number,
    currency: string = 'USD',
    description: string = 'ContentForge AI Subscription'
): Promise<PayPalOrderResponse> {
    const accessToken = await getAccessToken()

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: currency,
                        value: amount.toFixed(2),
                    },
                    description,
                },
            ],
            application_context: {
                brand_name: 'ContentForge AI',
                landing_page: 'NO_PREFERENCE',
                user_action: 'PAY_NOW',
                return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
            },
        }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(`PayPal order creation failed: ${JSON.stringify(error)}`)
    }

    return response.json()
}

/**
 * Capture PayPal order after user approval
 */
export async function capturePayPalOrder(
    orderId: string
): Promise<PayPalCaptureResponse> {
    const accessToken = await getAccessToken()

    const response = await fetch(
        `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )

    if (!response.ok) {
        const error = await response.json()
        throw new Error(`PayPal capture failed: ${JSON.stringify(error)}`)
    }

    return response.json()
}

/**
 * Create PayPal subscription (for recurring payments)
 */
export async function createPayPalSubscription(
    planId: string,
    userId: string
): Promise<any> {
    const accessToken = await getAccessToken()

    const response = await fetch(`${PAYPAL_API_BASE}/v1/billing/subscriptions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            plan_id: planId,
            custom_id: userId, // Link to our user
            application_context: {
                brand_name: 'ContentForge AI',
                user_action: 'SUBSCRIBE_NOW',
                return_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/success`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/cancel`,
            },
        }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(
            `PayPal subscription creation failed: ${JSON.stringify(error)}`
        )
    }

    return response.json()
}

/**
 * Cancel PayPal subscription
 */
export async function cancelPayPalSubscription(
    subscriptionId: string,
    reason: string = 'User requested cancellation'
): Promise<void> {
    const accessToken = await getAccessToken()

    const response = await fetch(
        `${PAYPAL_API_BASE}/v1/billing/subscriptions/${subscriptionId}/cancel`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                reason,
            }),
        }
    )

    if (!response.ok) {
        const error = await response.json()
        throw new Error(
            `PayPal subscription cancellation failed: ${JSON.stringify(error)}`
        )
    }
}
