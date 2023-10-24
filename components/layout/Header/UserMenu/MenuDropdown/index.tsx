import styles from './index.module.scss'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import * as React from 'react'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import Option from '../Option'
import { useCartContext } from 'context/cart_state'

interface MenuItem {
  icon: string
  text: string
  value: string
}

interface Props {
  items: MenuItem[]
  isActive?: boolean
  style?: React.CSSProperties,
  attributes?: HTMLAttributes<HTMLDivElement>
}

export const MenuDropdown = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const appContext = useAppContext()
  const cartContext = useCartContext()

  const handleClick = (value: string) => {
    appContext.hideOverlay()
    if(value !== 'exit'){
      appContext.showModal(ModalType.Profile, value)
    }
    else{
      cartContext.clear()
      appContext.logout()
    }
  }

  return (
    <div className={classNames(styles.root, { [styles.opened]: props.isActive })} ref={ref}
      style={props.style}  {...props.attributes} >
      <div className={styles.options}>
        {props.items.map((i, index) =>
          <Option item={i} key={i.value} onClick={() => handleClick(i.value)} />
        )}
      </div>
    </div>
  )
})
MenuDropdown.displayName = 'MenuDropdown'
