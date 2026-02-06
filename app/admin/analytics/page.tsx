'use client'

import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { TrendingUp, Users, FileText, DollarSign } from 'lucide-react'

export default function AdminAnalyticsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Analytics
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Platform analytics and usage insights
                </p>
            </div>

            <Card variant="default">
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                        Advanced analytics and reporting features are under development.
                        Check back soon for detailed insights into user behavior, revenue metrics, and platform performance.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
