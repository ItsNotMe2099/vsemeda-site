import styles from 'components/modals/BasketModal/PaymentMethodItem/index.module.scss'
import CheckSvg from 'components/svg/CheckSvg'
import { useCartContext } from 'context/cart_state'
import { IPaymentOption} from 'types/types'



interface Props {
  item: IPaymentOption
  heading?: string
  isSelected?: boolean
  onClick?: () => void
}


export default function PaymentMethodItem(props: Props) {

  const cartContext = useCartContext()

  return (
    <div className={styles.root} onClick={props.onClick}>
      <div className={styles.image}>
        {props.item.icon}
      </div>
      <div className={styles.right}>
        {props.heading ? <div className={styles.heading}>{props.heading}</div> : null}
        <div className={styles.title}>
          {props.isSelected ? <div className={styles.check}><CheckSvg color='#000' /></div> : null}
          <div className={styles.text}>
            {props.item.label}
          </div>
        </div>
      </div>
    </div>
  )
}
