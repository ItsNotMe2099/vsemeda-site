import { MutableRefObject} from 'react'

export function listenForOutsideClicks(listening: boolean, setListening: (val: boolean) => void, menuRef: MutableRefObject<any>, setIsOpen: (val: boolean) => void) {
  return () => {
    if (listening) return
    if (!menuRef.current) return
    setListening(true);
    ['click', 'touchstart'].forEach((type) => {
      document.addEventListener('click', (evt) => {
        if (menuRef.current && menuRef.current.contains(evt.target)) return
        setIsOpen(false)
      })
    })
  }
}
