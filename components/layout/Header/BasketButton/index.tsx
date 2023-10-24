import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {useCartContext} from 'context/cart_state'
import classNames from 'classnames'
import ShoppingCartSvg from 'components/svg/ShoppingCartSvg'
import {colors} from 'styles/variables'
import Formatter from 'utils/formatter'
import ArrowRightSvg from 'components/svg/ArrowRightSvg'
import {ModalType} from 'types/enums'
import {forwardRef} from 'react'
import { useResize } from 'components/hooks/useResize'
import TicketPercentSvg from 'components/svg/TicketPercentSvg'

interface Props {
  className?: string
  onClick?: () => void
}

const BasketButton = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const appContext = useAppContext()
  const cartContext = useCartContext()

  const {isTabletWidth} = useResize()

  const handleClick = () => {
    appContext.showModal(ModalType.Basket)
  }
  
  return (
    <div ref={ref} className={classNames(styles.root, {[styles.active]: !cartContext.isEmpty})} onClick={handleClick}>
      {cartContext.isEmpty && <ShoppingCartSvg color={colors.white}/>}
      {!cartContext.isEmpty  && <>

        {!isTabletWidth && <ShoppingCartSvg color={colors.black}/>}
        <div className={styles.details}>
          <div className={styles.quantity}>
            {cartContext.cart.lines.length} {Formatter.pluralize(cartContext.cart.lines.length, 'продукт', 'продукта', 'продуктов')}
          </div>
          <div className={styles.delivery}>
            {Formatter.formatDeliveryTime({minDeliveryTime: cartContext.unit?.deliveryTime})}
          </div>
        </div>
        {!isTabletWidth && <ArrowRightSvg color={colors.black}/>}

        <div className={styles.total}>{Formatter.formatPrice(cartContext.totalWithDelivery)}</div>
        {isTabletWidth && <TicketPercentSvg color={colors.black}/>}
      </>}

    </div>
  )
})

BasketButton.displayName = 'BasketButton'

export default BasketButton
