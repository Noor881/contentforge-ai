'use client'

import { useRef, useState } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

interface MagneticProps {
    children: React.ReactNode
    className?: string
    strength?: number // How strong the magnetic pull is (higher = more pull)
}

export default function Magnetic({ children, className = '', strength = 0.5 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)
    const position = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    }

    const springOptions = { damping: 15, stiffness: 150, mass: 0.1 } // Snappy but smooth return
    const x = useSpring(position.x, springOptions)
    const y = useSpring(position.y, springOptions)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 }

        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        position.x.set(middleX * strength)
        position.y.set(middleY * strength)
    }

    const handleMouseLeave = () => {
        position.x.set(0)
        position.y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
        >
            {children}
        </motion.div>
    )
}
