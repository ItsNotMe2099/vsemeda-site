import { DependencyList, MouseEventHandler, RefObject, useEffect } from 'react'

let isMoved = false

/**
 * Used for slider, solve problems with swipe
 */
export default function useClickOrSwipe(ref: RefObject<any>, onClick: MouseEventHandler, deps: DependencyList = []) {
  const handleMouseDown: MouseEventHandler = (e) => {
    e.preventDefault()
    isMoved = false
  }
  const handleMouseUp: MouseEventHandler = (e) => {
    e.preventDefault()
    if (!isMoved && e.button != 1) {
      onClick(e)
    }
  }
  const handleMouseMove: MouseEventHandler = (e) => {
    if (!isMoved) {
      isMoved = true
    }
  }
  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mousedown', handleMouseDown)
      node.addEventListener('mouseup', handleMouseUp)
      node.addEventListener('mousemove', handleMouseMove)
      node.addEventListener('click', handleClick)
      return () => {
        node.removeEventListener('mousedown', handleMouseDown)
        node.removeEventListener('mouseup', handleMouseUp)
        node.removeEventListener('mousemove', handleMouseMove)
        node.removeEventListener('click', handleClick)
      }
    }
  }, [ref.current, ...deps])
}
