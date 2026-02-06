'use client'

import { Toaster } from 'react-hot-toast'

export default function Toast() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#fff',
                    color: '#1f2937',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    maxWidth: '500px',
                },
                success: {
                    iconTheme: {
                        primary: '#22c55e',
                        secondary: '#fff',
                    },
                    style: {
                        border: '1px solid #22c55e',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                    },
                    style: {
                        border: '1px solid #ef4444',
                    },
                },
                loading: {
                    iconTheme: {
                        primary: '#0ea5e9',
                        secondary: '#fff',
                    },
                },
            }}
        />
    )
}
