import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Header from '@/components/layout/Header'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { SessionProvider } from 'next-auth/react'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect('/login')
    }

    return (
        <SessionProvider session={session}>
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex">
                    <DashboardSidebar />
                    <main className="flex-1 p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
                        {children}
                    </main>
                </div>
            </div>
        </SessionProvider>
    )
}
