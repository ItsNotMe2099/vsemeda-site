import styles from './index.module.scss'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import { ICartLine } from 'data/interfaces/ICartLine'
import CartLine from '../CartLine'
import PaymentSelect from '../PaymentSelect'
import { StickyContainer } from 'react-sticky'
import PromoForm from '../PromoForm'

interface Props {
  isActive?: boolean
  style?: React.CSSProperties,
  attributes?: HTMLAttributes<HTMLDivElement>
  items: ICartLine[]
  className?: string
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void
}

export const BasketDropdown = forwardRef<HTMLDivElement, Props>((props, ref) => {

  return (
    <StickyContainer>
      <div onClick={props.onClick} className={classNames(styles.root, props.className, { [styles.opened]: props.isActive })} ref={ref}
        style={props.style}  {...props.attributes} >
        <div className={classNames(styles.list, {[styles.noMargin]: !props.items.length})}>
          {!props.items.length ? <div className={styles.empty}>Корзина пуста</div> : null}
          {props.items.map((i, index) =>
            <CartLine item={i} key={i.id} />
          )}
        </div>
        {props.items.length ? <PromoForm className={styles.promo}/> : null}
        {props.items.length ? <PaymentSelect isSticky className={styles.footer} /> : null}
      </div >
    </StickyContainer >
  )
})
BasketDropdown.displayName = 'BasketDropdown'
