import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main className="py-20">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Last updated: February 6, 2026
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us, including:
                        </p>
                        <ul>
                            <li>Name and email address when you create an account</li>
                            <li>Content you generate using our platform</li>
                            <li>Payment information (processed securely through Stripe)</li>
                            <li>Communication preferences and customer support interactions</li>
                        </ul>

                        <h2>2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to:
                        </p>
                        <ul>
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send technical notices and support messages</li>
                            <li>Respond to your comments and questions</li>
                            <li>Monitor and analyze trends and usage</li>
                        </ul>

                        <h2>3. Data Security</h2>
                        <p>
                            We take reasonable measures to protect your personal information from unauthorized access, use, or
                            disclosure. However, no internet transmission is ever fully secure, so we cannot guarantee absolute
                            security.
                        </p>

                        <h2>4. Your Content</h2>
                        <p>
                            <strong>We do not use your generated content to train our AI models.</strong> Your content belongs to
                            you. We only use it to provide our services to you. You can delete your content at any time.
                        </p>

                        <h2>5. Third-Party Services</h2>
                        <p>
                            We use third-party services to help us provide our services:
                        </p>
                        <ul>
                            <li><strong>Stripe</strong> for payment processing</li>
                            <li><strong>OpenAI</strong> for AI content generation</li>
                            <li><strong>Resend</strong> for transactional emails</li>
                        </ul>

                        <h2>6. Cookies</h2>
                        <p>
                            We use cookies and similar tracking technologies to track activity on our service. You can instruct
                            your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </p>

                        <h2>7. Your Rights</h2>
                        <p>
                            You have the right to:
                        </p>
                        <ul>
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to processing of your data</li>
                            <li>Export your data</li>
                        </ul>

                        <h2>8. GDPR Compliance</h2>
                        <p>
                            If you are in the European Economic Area (EEA), you have certain data protection rights. We aim to
                            take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data.
                        </p>

                        <h2>9. Children's Privacy</h2>
                        <p>
                            Our service is not intended for children under 13. We do not knowingly collect personal information
                            from children under 13.
                        </p>

                        <h2>10. Changes to This Policy</h2>
                        <p>
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the
                            new policy on this page and updating the "Last updated" date.
                        </p>

                        <h2>11. Contact Us</h2>
                        <p>
                            If you have questions about this privacy policy, please contact us at:
                        </p>
                        <p>
                            Email: privacy@contentforge.ai<br />
                            Address: 123 AI Street, San Francisco, CA 94102
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
