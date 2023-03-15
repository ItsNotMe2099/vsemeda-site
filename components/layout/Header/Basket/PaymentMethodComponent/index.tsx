import styles from './index.module.scss'
import { PaymentMethod } from 'data/enum/PaymentMethod'
import CheckSvg from 'components/svg/CheckSvg'

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
  return (
    <div className={styles.method} onClick={onClick}>
      <div className={styles.image}>
        {item?.img ? item?.img : null}
      </div>
      <div className={styles.texts}>
        {chosen ? <div className={styles.payment}>Оплата:</div> : null}
        <div className={styles.title}>
          {(chosen || cardValid) ? <div className={styles.check}><CheckSvg color='#000' /></div> : null}
          <div className={styles.text}>{item?.title}</div>
        </div>
      </div>
    </div>
  )
}
