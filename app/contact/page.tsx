'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import toast from 'react-hot-toast'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                toast.success('Message sent successfully! We\'ll get back to you soon.')
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                toast.error('Failed to send message. Please try again.')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Header />
            <main className="py-20">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h1 className="text-responsive-xl font-display font-bold text-gray-900 dark:text-white mb-6">
                            Get in <span className="gradient-text">Touch</span>
                        </h1>
                        <p className="text-responsive-md text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <Card variant="default" className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Send us a message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    label="Name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@example.com"
                                />

                                <Input
                                    label="Subject"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="How can we help?"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message <span className="text-danger-500">*</span>
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                                    Send Message
                                </Button>
                            </form>
                        </Card>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <Card variant="gradient" className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Contact Information
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                                            <Mail className="h-6 w-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                Email
                                            </h3>
                                            <a
                                                href="mailto:support@contentforge.ai"
                                                className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
                                            >
                                                support@contentforge.ai
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                                            <Phone className="h-6 w-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                Phone
                                            </h3>
                                            <a
                                                href="tel:+1234567890"
                                                className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
                                            >
                                                +1 (234) 567-8900
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                                            <MapPin className="h-6 w-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                Office
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                123 AI Street<br />
                                                San Francisco, CA 94102<br />
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card variant="default" className="p-8">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Business Hours
                                </h3>
                                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday:</span>
                                        <span>9:00 AM - 6:00 PM PST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday:</span>
                                        <span>10:00 AM - 4:00 PM PST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday:</span>
                                        <span>Closed</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
