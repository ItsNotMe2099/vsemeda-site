import { IOrder } from 'data/interfaces/IOrder'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import OrderRepository from 'data/repositories/OrderRepository'
import ActiveOrderItem from './ActiveOrderItem'

interface Props {
   
}

export default function ActiveOrder(props: Props) {

  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]) 

  // получение активного заказа
  useEffect(()=> {
    OrderRepository.fetchActive()
    .then(res=> {
      setActiveOrders(res)
    })
  }, [])
  
  return (
    <div className={styles.root}>
      {activeOrders.map(item => <ActiveOrderItem key={item.id} item={item}/>)}
    </div>
  )
}