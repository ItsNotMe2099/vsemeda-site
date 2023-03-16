import styles from './index.module.scss'
import { PaymentMethod } from 'data/enum/PaymentMethod'
import CheckSvg from 'components/svg/CheckSvg'
import { useCartContext } from 'context/cart_state'

interface IItem {
  img?: React.ReactNode
  title: string
  value: PaymentMethod
}

interface Props {
  item: IItem
  chosen?: boolean
  cardValid?: boolean
  onClick?: () => void
}


export default function PaymentMethodComponent({ item, chosen, cardValid, onClick }: Props) {

  const cartContext = useCartContext()

  return (
    <div className={styles.method} onClick={onClick}>
      <div className={styles.image}>
        {item?.img ? item?.img : null}
      </div>
      <div className={styles.texts}>
        {chosen ? <div className={styles.payment}>Оплата:</div> : null}
        <div className={styles.title}>
          {(chosen || cardValid) ? <div className={styles.check}><CheckSvg color='#000' /></div> : null}
          <div className={styles.text}>
            {item?.title}{chosen ? (cartContext.cart?.moneyChange ? <>(Сдача {cartContext.cart?.moneyChange - cartContext.cart?.total} руб.)</>

              : <>(без сдачи)</>) : null}</div>
        </div>
      </div>
    </div>
  )
}
