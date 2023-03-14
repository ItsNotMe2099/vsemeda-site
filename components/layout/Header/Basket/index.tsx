import styles from './index.module.scss'
import classNames from 'classnames'
import ShoppingCartSvg from 'components/svg/ShoppingCartSvg'
import { colors } from 'styles/variables'
import { MouseEventHandler, useRef, useState } from 'react'
import { useAppContext } from 'context/state'
import usePressAndHover from 'hooks/usePressAndHover'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import { usePopper } from 'react-popper'
import { BasketDropdown } from './BasketDropdown'
import { useCartContext } from 'context/cart_state'

interface Props {
  className?: string
  onClick?: () => void
}

export default function Basket(props: Props) {

  const appContext = useAppContext()
  const cartContext = useCartContext()
  const dropdownRef = useRef(null)
  const [refAction, press, hover] = usePressAndHover()

  const [showDropDown, setShowDropDown] = useDetectOutsideClick(dropdownRef, false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)

  const { styles: popperStyles, attributes, forceUpdate, update } = usePopper(referenceElement, popperElement, {
    strategy: 'absolute',

    placement: 'bottom',
    modifiers: [
      {
        name: 'flip',
        enabled: true,
      },
    ]
  })

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDropDown(!showDropDown)
    cartContext.fetch()
    if (showDropDown) {
      appContext.hideOverlay()
    } else {
      appContext.showOverlay()
    }
  }

  const handleDropdownClick: MouseEventHandler = (e) => {
    e.stopPropagation()
  }

  return (
    <div ref={
      (ref) => {
        (refAction as any).current = ref
        dropdownRef.current = ref
        setReferenceElement(ref)
      }} onClick={handleClick} className={classNames(styles.root, props.className)} >
      <ShoppingCartSvg color={colors.white} />
      <BasketDropdown isActive={showDropDown}
        items={cartContext.cart?.lines ?? []}
        ref={setReferenceElement}
        attributes={attributes.popper}
        style={popperStyles.popper} 
        onClick={handleDropdownClick}
        />
    </div >
  )
}
