import { IOrder } from 'data/interfaces/IOrder'
import Image from 'next/image'
import styles from './index.module.scss'


interface Props {
  order: IOrder
}

export default function OrderCard({ order }: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.right}>
        <div className={styles.brand}>
          {order.brand.name}
        </div>
        <div className={styles.discount}>
          <div><Image src={'/images/icons/discount.svg'} alt='' fill /></div>
          <div className={styles.percent}>Скидка {order.totalDiscount}%</div>
        </div>
        <div className={styles.created}>
          {order.createdAt}
        </div>
      </div>
      <div className={styles.left}>
        <div className={styles.payment}>
          <div className={styles.method}>
            {order.paymentMethod}
          </div>
          <div className={styles.total}>
            {order.total}
          </div>
        </div>
      </div>
    </div>
  )
}
