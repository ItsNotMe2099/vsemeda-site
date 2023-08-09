import styles from './index.module.scss'
import { useEffect} from 'react'
import ActiveOrderItem from './ActiveOrderItem'
import { useAppContext } from 'context/state'
import { useOrderContext } from 'context/order_state'
import { OrderInitType } from 'data/enum/OrderState'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
   
}

export default function ActiveOrder(props: Props) {
  const appContext = useAppContext()
  const {ordersExist, init, activeOrders} = useOrderContext()
  
  useEffect(()=> {
    if(appContext.isLogged) {
      init(OrderInitType.Start)
    }
    return ()=> {init(OrderInitType.Stop)}
  }, [appContext.isLogged])

  if(ordersExist) {
    return (
      <div className={styles.root}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={10}
          className={styles.swiper}
        >
          {activeOrders.map(item=> <SwiperSlide className={styles.slide}><ActiveOrderItem key={item.id} item={item}/></SwiperSlide>)}
        </Swiper>  
      </div>
    )
  }
  else {return null}
}