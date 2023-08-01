import {useAppContext} from 'context/state'
import {useCartContext} from 'context/cart_state'
import classNames from 'classnames'
import styles from './index.module.scss'
import ShoppingCartSvg from 'components/svg/ShoppingCartSvg'
import {colors} from 'styles/variables'
import Formatter from 'utils/formatter'
import ArrowRightSvg from 'components/svg/ArrowRightSvg'
import {ModalType} from 'types/enums'
import {forwardRef} from 'react'

interface Props {
  className?: string
  onClick?: () => void
}

const  BasketButton = forwardRef<HTMLDivElement, Props>((props, ref) => {

  const appContext = useAppContext()
  const cartContext = useCartContext()
  if (cartContext.isEmpty) {

  } else {

  }

  const handleClick = () => {
    appContext.showModal(ModalType.Basket)
  }
  
  return (
    <div ref={ref} className={classNames(styles.root, {[styles.active]: !cartContext.isEmpty})} onClick={handleClick}>
      {cartContext.isEmpty && <ShoppingCartSvg color={colors.white}/>}
      {!cartContext.isEmpty && <><ShoppingCartSvg color={colors.black}/>
        <div className={styles.details}>
          <div className={styles.quantity}>
            {cartContext.cart.lines.length} {Formatter.pluralize(cartContext.cart.lines.length, 'продукт', 'продукта', 'продуктов')}
          </div>
          <div className={styles.delivery}>
            {Formatter.formatDeliveryTime({minDeliveryTime: cartContext.unit?.deliveryTime})}
          </div>
        </div>
        <ArrowRightSvg color={colors.black}/>
        <div className={styles.total}>{Formatter.formatPrice(cartContext.totalWithDelivery)}</div>
      </>}

    </div>
  )
})

BasketButton.displayName = 'BasketButton'

export default BasketButton
