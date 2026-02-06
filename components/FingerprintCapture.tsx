'use client'

import { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

interface FingerprintCaptureProps {
    onFingerprintCapture: (fingerprint: string) => void
}

/**
 * Client-side component to capture browser fingerprint
 * Uses FingerprintJS to generate unique device identifier
 */
export default function FingerprintCapture({ onFingerprintCapture }: FingerprintCaptureProps) {
    const [isCapturing, setIsCapturing] = useState(false)

    useEffect(() => {
        const captureFingerprint = async () => {
            if (isCapturing) return
            setIsCapturing(true)

            try {
                // Load FingerprintJS
                const fp = await FingerprintJS.load()

                // Get the visitor identifier
                const result = await fp.get()

                // The visitorId is a hash of all browser characteristics
                const fingerprint = result.visitorId

                // Pass fingerprint to parent component
                onFingerprintCapture(fingerprint)

                console.log('Fingerprint captured:', fingerprint)
            } catch (error) {
                console.error('Failed to capture fingerprint:', error)
                // On error, generate fallback fingerprint
                const fallback = generateFallbackFingerprint()
                onFingerprintCapture(fallback)
            } finally {
                setIsCapturing(false)
            }
        }

        captureFingerprint()
    }, [onFingerprintCapture, isCapturing])

    // This component doesn't render anything visible
    return null
}

/**
 * Fallback fingerprint generation if FingerprintJS fails
 * Uses basic browser characteristics
 */
function generateFallbackFingerprint(): string {
    const nav = navigator as any
    const screen = window.screen

    const components = [
        nav.userAgent,
        nav.language,
        screen.width,
        screen.height,
        screen.colorDepth,
        new Date().getTimezoneOffset(),
        nav.hardwareConcurrency || 'unknown',
        nav.deviceMemory || 'unknown',
    ]

    // Create a simple hash
    const str = components.join('|')
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash // Convert to 32bit integer
    }

    return 'fallback_' + Math.abs(hash).toString(36)
}
