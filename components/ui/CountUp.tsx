'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface CountUpProps {
    to: number
    from?: number
    duration?: number
    delay?: number
    className?: string
    decimals?: number
    suffix?: string
    prefix?: string
}

export default function CountUp({
    to,
    from = 0,
    duration = 2,
    delay = 0,
    className = '',
    decimals = 0,
    suffix = '',
    prefix = '',
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(from)
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    })
    const isInView = useInView(ref, { once: true, margin: '-20%' })

    useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => {
                motionValue.set(to)
            }, delay * 1000)
            return () => clearTimeout(timeout)
        }
    }, [isInView, to, motionValue, delay])

    useEffect(() => {
        return springValue.on('change', (latest) => {
            if (ref.current) {
                const value = decimals === 0 ? Math.round(latest) : Number(latest.toFixed(decimals))
                ref.current.textContent = `${prefix}${value.toLocaleString('en-US', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                })}${suffix}`
            }
        })
    }, [springValue, decimals, suffix, prefix])

    return <span ref={ref} className={className} />
}
