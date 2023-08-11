import styles from './index.module.scss'
import ChevronSvg from 'components/svg/ChevronSvg'
import { IOrder } from 'data/interfaces/IOrder'
import Image from 'next/image'
import { colors } from 'styles/variables'
import { format } from 'date-fns'
import DotSeparatorSvg from 'components/svg/DotSeparatorSvg'
import ProductLine from '../OrderDetails/Line'
import { useOrderContext } from 'context/order_state'
import { useResize } from 'components/hooks/useResize'
import { useCallback, useEffect, useState } from 'react'
import OrderHelper from 'utils/orderHelper'


interface Props {
  order: IOrder
  onClickProps? : (id: string)=> void
}

export default function OrderCard({ order, onClickProps}: Props) {

  const orderContext = useOrderContext()
  const {isPhoneWidth} = useResize()
  const [isDetailsActive, setActive] = useState<boolean>(false)

  const activeDetails = useCallback(()=>{
    if(order.id !== orderContext.activeDetails?.id) {
      orderContext.fetchOrderDetails(order.id)
    }
  },[orderContext.activeDetails?.id])

  const clickHandler = () => {
    if(isPhoneWidth) {
      onClickProps(order.id)
    } else {
      activeDetails()
      if(orderContext.activeDetails?.id === order.id && !isDetailsActive) {
        setActive(true)
      }
    }
  }

  useEffect(()=> {
    if(orderContext.activeDetails?.id === order.id) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [orderContext.activeDetails?.id])

  const orderHelper = new OrderHelper({color: order.stateDetails?.color})
  const [background, color] = orderHelper.background

  return (
    <div className={styles.root} onClick={clickHandler}>
      {!isDetailsActive && !isPhoneWidth &&
        <div className={styles.hover}>
          <div className={styles.show}>
            <div className={styles.text}>Показать детали</div>
            <ChevronSvg className={styles.chevron} color={colors.black} />
          </div>
        </div>
      }
      <div className={styles.top}>
        {!isPhoneWidth && 
          <p className={styles.orderNumber}>Заказ №{order.id}</p>
        }
        <div className={styles.status}>
          <p className={styles.brand}>{order.brand.name}</p>
          <div className={styles.orderStatus}>   
            <div className={styles.statusBackground} style={background}></div> 
            <span style={{color: color}}>{order.stateDetails.name}</span>
          </div>
        </div>
        {!isPhoneWidth&&
          <div className={styles.discount}>
            <Image src={'/images/icons/discount.svg'} alt=''  width={24} height={24}/>
            <div className={styles.percent}>Скидка {order.totalDiscount}%</div>
          </div>
        }
      </div>
      
      {!isPhoneWidth && isDetailsActive &&
        <div className={styles.linesWrapper}>
          {orderContext.activeDetails.lines.map(product=> <ProductLine line={product} isActive={isDetailsActive}/>)}
          <div className={styles.hide} onClick={()=> {setActive(false)}}>
            Свернуть
            <ChevronSvg className={styles.chevronHide} color={colors.black} />
          </div>
        </div>

      }
      <div className={styles.bottom}>
        <div className={styles.created}>
          {format(new Date(order.createdAt), 'dd.MM.yy')}<DotSeparatorSvg color='#828282'/>{format(new Date(order.createdAt), 'HH:mm')}
        </div>
        <div className={styles.payment}>
          <div className={styles.method}>
            {orderHelper.translatePaymentMethod(order.paymentMethod)}:
          </div>
          <div className={styles.total}>
            {order.total}₽
          </div>
        </div>
      </div>
    </div>
  )
}


