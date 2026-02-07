'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { Sun, Moon, Monitor, Shield, Mail, Clock, Zap } from 'lucide-react'

export default function SettingsPage() {
    const { data: session, update } = useSession()
    const [formData, setFormData] = useState({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
    })
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [isUpdating, setIsUpdating] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

    useEffect(() => {
        if (session?.user?.name) {
            setFormData(prev => ({ ...prev, name: session.user.name || '' }))
        }
    }, [session])

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
        if (savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
        } else if (newTheme === 'light') {
            document.documentElement.classList.remove('dark')
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
        toast.success(`Theme set to ${newTheme}`)
    }

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUpdating(true)

        try {
            const res = await fetch('/api/user/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                await update()
                toast.success('Profile updated successfully!')
            } else {
                toast.error('Failed to update profile')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setIsUpdating(false)
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (passwordData.newPassword.length < 8) {
            toast.error('Password must be at least 8 characters')
            return
        }

        setIsChangingPassword(true)

        try {
            const res = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(passwordData),
            })

            if (res.ok) {
                toast.success('Password changed successfully!')
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            } else {
                const data = await res.json()
                toast.error(data.error || 'Failed to change password')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setIsChangingPassword(false)
        }
    }

    const handleDeleteAccount = async () => {
        const email = prompt('To confirm deletion, type your email address:')
        if (email !== session?.user?.email) {
            toast.error('Email does not match. Account not deleted.')
            return
        }

        const confirmed = confirm('This action is PERMANENT. All your content, settings, and data will be deleted. Are you absolutely sure?')
        if (!confirmed) return

        try {
            const res = await fetch('/api/user/delete-account', { method: 'DELETE' })
            if (res.ok) {
                toast.success('Account deleted. Goodbye!')
                window.location.href = '/'
            } else {
                toast.error('Failed to delete account')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Account Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your account information, appearance, and preferences
                </p>
            </div>

            <div className="space-y-6">
                {/* Account Overview */}
                <Card variant="default">
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                                {(session?.user?.name || 'U')[0].toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {session?.user?.name || 'User'}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">
                                        <Zap className="h-3 w-3" />
                                        {session?.user?.subscriptionTier?.toUpperCase() || 'FREE'}
                                    </span>
                                    {session?.user?.isTrialActive && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                                            <Clock className="h-3 w-3" />
                                            Trial Active
                                        </span>
                                    )}
                                    {session?.user?.isAdmin && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                            <Shield className="h-3 w-3" />
                                            Admin
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card variant="default">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sun className="h-5 w-5 text-amber-500" />
                            Appearance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Choose how ContentForge looks for you
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => handleThemeChange('light')}
                                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'light'
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                    <Sun className="h-6 w-6 text-amber-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
                            </button>
                            <button
                                onClick={() => handleThemeChange('dark')}
                                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'dark'
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                                    <Moon className="h-6 w-6 text-blue-400" />
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
                            </button>
                            <button
                                onClick={() => handleThemeChange('system')}
                                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'system'
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                                    <Monitor className="h-6 w-6 text-gray-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">System</span>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Information */}
                <Card variant="default">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <Input
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                helpText="Contact support to change your email address"
                                disabled
                            />

                            <Button type="submit" isLoading={isUpdating}>
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Change Password */}
                <Card variant="default">
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleChangePassword} className="space-y-6">
                            <Input
                                label="Current Password"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                required
                            />

                            <Input
                                label="New Password"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                required
                                helpText="At least 8 characters"
                            />

                            <Input
                                label="Confirm New Password"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                required
                            />

                            <Button type="submit" isLoading={isChangingPassword}>
                                Change Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card variant="default">
                    <CardHeader>
                        <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 border-2 border-red-200 dark:border-red-900 rounded-xl">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    Delete Account
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Permanently delete your account and all associated data. This includes all generated content, settings, and subscription information. This action cannot be undone.
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    onClick={handleDeleteAccount}
                                >
                                    Delete My Account
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
