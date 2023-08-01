import { useState, useEffect } from 'react'
import { breakpoints } from 'styles/variables'


export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = (event: Event) => {
        const target = event.target as Window
        setWidth(target.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    width,
    isDesktopWidth: width >= breakpoints.MdDesktopWidth,
    isMdDesktopWidth: width <= breakpoints.MdDesktopWidth,
    isSmDesktopWidth: width <= breakpoints.SmDesktopWidth,
    isPhoneWidth: width <= breakpoints.PhoneWidth,
    isLPhoneWidth: width <= breakpoints.LPhoneWidth,
    isMPhoneWidth: width <= breakpoints.MPhoneWidth,
    // isSmPhoneWidth: width <= breakpoints.SmPhoneWidth,
    isTabletWidth: width <= breakpoints.TabletWidth,
  }
}