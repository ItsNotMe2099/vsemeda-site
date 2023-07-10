import styles from './index.module.scss'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import CartLine from '../../../../modals/BasketModal/CartLine'
import PaymentSelect from '../../../../modals/BasketModal/PaymentSelect'
import { StickyContainer } from 'react-sticky'
import PromoForm from '../../../../modals/BasketModal/PromoForm'
import {useCartContext} from 'context/cart_state'

interface Props {
  isActive?: boolean
  style?: React.CSSProperties,
  attributes?: HTMLAttributes<HTMLDivElement>
  className?: string
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void
}

export const BasketDropdown = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const cartContext = useCartContext()
  return (
    <StickyContainer>
      <div onClick={props.onClick} className={classNames(styles.root, props.className, { [styles.opened]: props.isActive })} ref={ref}
        style={props.style}  {...props.attributes} >
        <div className={classNames(styles.list, {[styles.noMargin]: !cartContext.cart?.lines.length})}>
          {!cartContext.cart?.lines.length ? <div className={styles.empty}>Корзина пуста</div> : null}
          {cartContext.cart?.lines.map((i, index) =>
            <CartLine item={i} key={i.id} quantity={cartContext.groupingIdQuantityMap[i.groupingId]} />
          )}
        </div>
        {cartContext.cart?.lines.length ? <PromoForm className={styles.promo}/> : null}
        {cartContext.cart?.lines.length ? <PaymentSelect isSticky className={styles.footer} /> : null}
      </div >
    </StickyContainer >
  )
})
BasketDropdown.displayName = 'BasketDropdown'
