'use client'

import { useState, useEffect } from 'react'

export type Breakpoint = 'mobile' | 'tablet' | 'pc'

const BREAKPOINTS = {
  tablet: 768,
  pc: 1024,
} as const

function getBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'pc'
  const w = window.innerWidth
  if (w < BREAKPOINTS.tablet) return 'mobile'
  if (w < BREAKPOINTS.pc) return 'tablet'
  return 'pc'
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>('pc')

  useEffect(() => {
    setBp(getBreakpoint())

    const onResize = () => setBp(getBreakpoint())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return bp
}
