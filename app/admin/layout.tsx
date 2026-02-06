import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/admin'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { SessionProvider } from 'next-auth/react'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect('/login')
    }

    // Verify admin status
    const admin = await requireAdmin()

    return (
        <SessionProvider session={session}>
            <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
                <AdminSidebar adminName={admin.name || admin.email || 'Admin'} />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </SessionProvider>
    )
}
