import styles from './index.module.scss'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import * as React from 'react'
import { ICartLine } from 'data/interfaces/ICartLine'
import CartLine from '../CartLine'
import PaymentSelect from '../PaymentSelect'
import { useCartContext } from 'context/cart_state'

interface Props {
  isActive?: boolean
  style?: React.CSSProperties,
  attributes?: HTMLAttributes<HTMLDivElement>
  items: ICartLine[]
  className?: string
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void
}

export const BasketDropdown = forwardRef<HTMLDivElement, Props>((props, ref) => {

  const cartContext = useCartContext()

  return (
    <div onClick={props.onClick} className={classNames(styles.root, props.className, { [styles.opened]: props.isActive })} ref={ref}
      style={props.style}  {...props.attributes} >
      <div className={styles.list}>
        {!props.items.length ? <div className={styles.empty}>Корзина пуста</div> : null}
        {props.items.map((i, index) =>
          <CartLine item={i} key={i.id} />
        )}
        <PaymentSelect/>
      </div>
    </div>
  )
})
BasketDropdown.displayName = 'MenuDropdown'
