'use client'

import { useState, useEffect, useCallback, type ReactNode } from 'react'

interface ClientProviderProps {
  mobileContent: ReactNode
  desktopContent: ReactNode
}

export function ClientProvider({ mobileContent, desktopContent }: ClientProviderProps) {
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

  return <>{isMobile ? mobileContent : desktopContent}</>
}
