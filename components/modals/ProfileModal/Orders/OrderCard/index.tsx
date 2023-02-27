import ChevronSvg from 'components/svg/ChevronSvg'
import { IOrder } from 'data/interfaces/IOrder'
import Image from 'next/image'
import { colors } from 'styles/variables'
import styles from './index.module.scss'


interface Props {
  order: IOrder
}

export default function OrderCard({ order }: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.hover}>
        <div className={styles.show}>
          <div className={styles.text}>Показать детали</div>
          <ChevronSvg className={styles.chevron} color={colors.black} />
        </div>
      </div>
      <div className={styles.top}>
        <div className={styles.brand}>
          {order.brand.name}
        </div>
        <div className={styles.discount}>
          <div><Image src={'/images/icons/discount.svg'} alt='' fill /></div>
          <div className={styles.percent}>Скидка {order.totalDiscount}%</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.created}>
          {order.createdAt}
        </div>
        <div className={styles.payment}>
          <div className={styles.method}>
            {order.paymentMethod}:
          </div>
          <div className={styles.total}>
            {order.total}₽
          </div>
        </div>
      </div>
    </div>
  )
}
