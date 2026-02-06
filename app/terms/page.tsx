import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="py-20">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                        Terms of Service
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Last updated: February 6, 2026
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>1. Agreement to Terms</h2>
                        <p>
                            By accessing and using ContentForge AI, you agree to be bound by these Terms of Service and all applicable
                            laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.
                        </p>

                        <h2>2. Use License</h2>
                        <p>
                            We grant you a limited, non-exclusive, non-transferable license to use ContentForge AI for your content
                            creation needs, subject to these Terms of Service.
                        </p>

                        <h2>3. Content Ownership</h2>
                        <p>
                            <strong>You own all content you generate using our platform.</strong> We do not claim any ownership rights
                            to your generated content. You are free to use, modify, and distribute your content as you see fit.
                        </p>

                        <h2>4. Acceptable Use</h2>
                        <p>
                            You agree not to use ContentForge AI to:
                        </p>
                        <ul>
                            <li>Generate illegal, harmful, or offensive content</li>
                            <li>Violate any intellectual property rights</li>
                            <li>Spam or harass others</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Resell or redistribute our service without permission</li>
                        </ul>

                        <h2>5. Subscription and Billing</h2>
                        <h3>5.1 Free Trial</h3>
                        <p>
                            New users receive a 3-day free trial with 5 content generations. No credit card is required to start your trial.
                        </p>

                        <h3>5.2 Paid Subscriptions</h3>
                        <p>
                            After your trial, you can upgrade to a paid plan. Subscriptions are billed monthly and automatically renew
                            unless cancelled.
                        </p>

                        <h3>5.3 Cancellation</h3>
                        <p>
                            You may cancel your subscription at any time. You will retain access until the end of your current billing period.
                            No refunds are provided for partial months.
                        </p>

                        <h2>6. Usage Limits</h2>
                        <p>
                            Each plan has monthly content generation limits:
                        </p>
                        <ul>
                            <li>Trial: 5 generations</li>
                            <li>Pro: 100 generations per month</li>
                            <li>Enterprise: Unlimited generations</li>
                        </ul>

                        <h2>7. Service Availability</h2>
                        <p>
                            We strive to provide 99.9% uptime, but we do not guarantee uninterrupted access. We may perform maintenance
                            or updates that temporarily affect service availability.
                        </p>

                        <h2>8. Disclaimer of Warranties</h2>
                        <p>
                            ContentForge AI is provided "as is" without warranties of any kind. We do not guarantee that:
                        </p>
                        <ul>
                            <li>The service will meet your specific requirements</li>
                            <li>Generated content will be error-free or factually accurate</li>
                            <li>The service will be uninterrupted or secure</li>
                        </ul>

                        <h2>9. Limitation of Liability</h2>
                        <p>
                            In no event shall ContentForge AI be liable for any indirect, incidental, special, or consequential damages
                            arising out of or in connection with your use of the service.
                        </p>

                        <h2>10. Indemnification</h2>
                        <p>
                            You agree to indemnify and hold harmless ContentForge AI from any claims, damages, or expenses arising from
                            your use of the service or violation of these terms.
                        </p>

                        <h2>11. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. We will notify users of significant changes via email
                            or platform notification.
                        </p>

                        <h2>12. Governing Law</h2>
                        <p>
                            These terms are governed by the laws of the State of California, United States, without regard to conflict
                            of law principles.
                        </p>

                        <h2>13. Contact Information</h2>
                        <p>
                            For questions about these Terms of Service, contact us at:
                        </p>
                        <p>
                            Email: legal@contentforge.ai<br />
                            Address: 123 AI Street, San Francisco, CA 94102
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
