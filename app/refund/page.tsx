import Card, { CardContent } from '@/components/ui/Card'
import Link from 'next/link'

export default function RefundPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Refund Policy
                </h1>

                <Card variant="default">
                    <CardContent>
                        <div className="prose dark:prose-invert max-w-none">
                            <h2 className="text-2xl font-semibold mb-4">Our Commitment to You</h2>
                            <p className="mb-6">
                                At ContentForge AI, we strive to provide the best AI-powered content generation
                                experience. We stand behind our service and offer a transparent refund policy.
                            </p>

                            <h3 className="text-xl font-semibold mb-3">30-Day Money-Back Guarantee</h3>
                            <p className="mb-4">
                                If you're not satisfied with our service within the first 30 days of your
                                subscription, you can request a full refund. No questions asked.
                            </p>

                            <h3 className="text-xl font-semibold mb-3">How to Request a Refund</h3>
                            <ol className="list-decimal list-inside mb-6 space-y-2">
                                <li>Contact our support team at support@contentforge.ai</li>
                                <li>Include your account email and reason for refund (optional)</li>
                                <li>We'll process your refund within 5-7 business days</li>
                            </ol>

                            <h3 className="text-xl font-semibold mb-3">Refund Eligibility</h3>
                            <ul className="list-disc list-inside mb-6 space-y-2">
                                <li>Refunds are available within 30 days of purchase</li>
                                <li>One-time refund per customer</li>
                                <li>Refunds are processed to the original payment method</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-3">Excluded from Refunds</h3>
                            <ul className="list-disc list-inside mb-6 space-y-2">
                                <li>Subscriptions older than 30 days</li>
                                <li>Accounts suspended for policy violations</li>
                                <li>Free tier accounts (no payment made)</li>
                            </ul>

                            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-sm">
                                    <strong>Questions?</strong> Contact us at{' '}
                                    <a href="mailto:support@contentforge.ai" className="text-primary-600 hover:underline">
                                        support@contentforge.ai
                                    </a>
                                    {' '}or visit our{' '}
                                    <Link href="/contact" className="text-primary-600 hover:underline">
                                        contact page
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
