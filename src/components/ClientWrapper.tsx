'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'

interface ClientWrapperProps {
  children: (isMobile: boolean) => ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [isMobile, setIsMobile] = useState(true)
  const [isClient, setIsClient] = useState(false)

  const checkIfMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    setIsClient(true)
    checkIfMobile()

    let timeoutId: number
    const debouncedResize = () => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(checkIfMobile, 250)
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
      window.clearTimeout(timeoutId)
    }
  }, [checkIfMobile])

  if (!isClient) {
    return null
  }

  return <>{children(isMobile)}</>
}
