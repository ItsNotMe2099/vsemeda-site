import styles from './index.module.scss'
import TicketPercentSvg from 'components/svg/TicketPercentSvg'
import {colors} from 'styles/variables'
import Formatter from 'utils/formatter'
import {useCartContext} from 'context/cart_state'
import Spinner from 'components/ui/Spinner'

interface Props {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  isAuth?: boolean
}

const PaymentButton = (props: Props) => {
  const cartContext = useCartContext()

  return (
    <div className={styles.root} onClick={props.disabled || props.loading ? null: props.onClick} >
       <div className={styles.details}>
          <div className={styles.title}>
            {props.isAuth ? 'Перейти к оплате': 'Далее'}
          </div>
          <div className={styles.delivery}>
            {Formatter.formatDeliveryTime({minDeliveryTime: cartContext.unit?.deliveryTime})}
          </div>
        </div>
        <div className={styles.total}>{Formatter.formatPrice(cartContext.totalWithDelivery)}</div>
      {!props.loading && <TicketPercentSvg color={colors.black}/>}
      {props.loading && <Spinner size={30} color={colors.black} secondaryColor={colors.grey2} />}
    </div>
  )
}
export default PaymentButton

