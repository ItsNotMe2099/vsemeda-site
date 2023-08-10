import ChevronSvg from 'components/svg/ChevronSvg'
import { IOrder } from 'data/interfaces/IOrder'
import Image from 'next/image'
import { colors } from 'styles/variables'
import styles from './index.module.scss'
import { format } from 'date-fns'
import DotSeparatorSvg from 'components/svg/DotSeparatorSvg'
import ProductLine from '../OrderDetails/Line'
import { useOrderContext } from 'context/order_state'
import { useResize } from 'components/hooks/useResize'
import { useCallback, useState } from 'react'


interface Props {
  order: IOrder
  onClick?: (id: string) => void  
}

export default function OrderCard({ order, onClick}: Props) {

  const orderContext = useOrderContext()
  const {isPhoneWidth} = useResize()
  const [isDetailsActive, setActive] = useState<boolean>(false)
  const activeDetails = useCallback(()=>{
    if(!isDetailsActive) {
      orderContext.fetchOrderDetails(order.id)
    }
  },[isDetailsActive])


  const onClickHandler = () => {
    setActive(!isDetailsActive)
    activeDetails()
  }

  return (
    <div className={styles.root} onClick={onClickHandler}>
      {!isDetailsActive && 
        <div className={styles.hover}>
          <div className={styles.show}>
            <div className={styles.text}>Показать детали</div>
            <ChevronSvg className={styles.chevron} color={colors.black} />
          </div>
        </div>
      }
      <div className={styles.top}>
        <div className={styles.brand}>
          {order.brand.name}
        </div>
        <div className={styles.discount}>
          <Image src={'/images/icons/discount.svg'} alt=''  width={24} height={24}/>
          <div className={styles.percent}>Скидка {order.totalDiscount}%</div>
        </div>
      </div>
      {orderContext.activeDetails && !isPhoneWidth && order.id === orderContext.activeDetails.id && 
        orderContext.activeDetails.lines.map(product=> <ProductLine line={product} isActive={isDetailsActive}/>)
      }
      <div className={styles.bottom}>
        <div className={styles.created}>
          {format(new Date(order.createdAt), 'dd.MM.yy')}<DotSeparatorSvg color='#828282'/>{format(new Date(order.createdAt), 'HH:mm')}
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
