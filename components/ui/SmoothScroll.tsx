'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    )
}
