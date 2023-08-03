import { RefObject, useEffect, useState } from 'react'

let observer: IntersectionObserver

/**
 * Fired when component appears on the screen
 * @param ref
 * @param options
 */
export default function useOnScreen(ref: RefObject<any>, options?: IntersectionObserverInit): boolean {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (node) {
      observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting), options
      )
      observer.observe(ref.current)
      return () => { observer.disconnect() }
    }
  }, [ref.current])

  return isIntersecting
}
