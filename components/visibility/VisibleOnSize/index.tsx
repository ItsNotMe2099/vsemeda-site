import { useEffect, useState } from 'react'


interface Props {
  children: JSX.Element
  width: number,  
  minSize?: boolean
}

/**
 * Shows child elements only on mobile (XS)
 */
export default function VisibleOnSize(props: Props) {

  const [matches, setMatch] = useState<boolean>(false)

  const checkWidth = () => {    
    let maxWidthMatch: MediaQueryList | null   
    maxWidthMatch = props.width && window.matchMedia(`(max-width: ${props.width}px)`)
    setMatch(props.minSize?!maxWidthMatch.matches:maxWidthMatch.matches)
  }

  useEffect(()=> {
    checkWidth()
  }, [])


  if (matches) {
    return props.children
  }
  return null
}