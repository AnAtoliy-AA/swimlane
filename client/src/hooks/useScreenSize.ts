import { useState, useEffect } from 'react'
import { device } from '../constants/styles/theme'

const MOBILE_WIDTH = parseInt(device.sm.slice(0, -2))

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<{
    width: number
    height: number
    isMobile: boolean
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= MOBILE_WIDTH,
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= MOBILE_WIDTH,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { screenSize, isMobile: screenSize.isMobile }
}

export default useScreenSize
