import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Sparkles } from 'lucide-react'

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="py-20">
                <div className="container-custom max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-responsive-xl font-display font-bold text-gray-900 dark:text-white mb-6">
                            About <span className="gradient-text">ContentForge AI</span>
                        </h1>
                        <p className="text-responsive-md text-gray-600 dark:text-gray-400">
                            Empowering creators with intelligent content generation since 2025
                        </p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-2xl p-8 mb-12">
                            <div className="flex items-center gap-4 mb-4">
                                <Sparkles className="h-12 w-12 text-primary-600" />
                                <h2 className="text-3xl font-bold m-0">Our Mission</h2>
                            </div>
                            <p className="text-xl leading-relaxed m-0">
                                To democratize high-quality content creation by making AI-powered writing tools accessible, affordable,
                                and incredibly easy to use for creators, marketers, and businesses of all sizes.
                            </p>
                        </div>

                        <h2>The Story Behind ContentForge AI</h2>
                        <p>
                            Founded in 2025, ContentForge AI was born from a simple observation: content creators everywhere were
                            spending countless hours writing blog posts, social media updates, emails, and marketing copy. While
                            AI technology had advanced tremendously, existing tools were either too complex, too expensive, or
                            didn't deliver the quality that professional creators demanded.
                        </p>

                        <p>
                            Our team of AI researchers, content strategists, and software engineers came together with a vision:
                            create a platform that combines cutting-edge AI with intuitive design, delivering professional-grade
                            content in seconds instead of hours.
                        </p>

                        <h2>What Makes Us Different</h2>
                        <ul>
                            <li>
                                <strong>Quality First:</strong> We use the latest AI models trained on high-quality content to ensure
                                every generation meets professional standards.
                            </li>
                            <li>
                                <strong>Versatility:</strong> Six specialized tools for different content types, each optimized for
                                its specific use case.
                            </li>
                            <li>
                                <strong>User-Centric Design:</strong> Beautiful, intuitive interface that doesn't require a manual
                                to understand.
                            </li>
                            <li>
                                <strong>Fair Pricing:</strong> Transparent, affordable pricing with a generous free trial so you can
                                try before you buy.
                            </li>
                            <li>
                                <strong>Continuous Innovation:</strong> Regular updates with new features, improvements, and
                                integrations based on user feedback.
                            </li>
                        </ul>

                        <h2>Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-6 not-prose">
                            {[
                                {
                                    title: 'Innovation',
                                    desc: 'Constantly pushing the boundaries of what AI can do for content creation',
                                },
                                {
                                    title: 'Accessibility',
                                    desc: 'Making powerful tools available to everyone, not just enterprises',
                                },
                                {
                                    title: 'Quality',
                                    desc: 'Never compromising on the quality of generated content',
                                },
                                {
                                    title: 'Transparency',
                                    desc: 'Clear pricing, honest capabilities, and open communication',
                                },
                            ].map((value, i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 m-0">
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <h2>Join Thousands of Creators</h2>
                        <p>
                            Today, ContentForge AI serves over 10,000 creators, marketers, and businesses worldwide. We've helped
                            generate over 500,000 pieces of content, saving our users millions of hours and helping them scale
                            their content operations without scaling their budgets.
                        </p>

                        <p className="text-xl font-semibold">
                            Ready to transform your content creation process? Start your free trial today.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
