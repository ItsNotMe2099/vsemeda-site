import styles from './index.module.scss'
import OrderCard from './OrderCard'
import { useState, useEffect } from 'react'
import { IOrder } from 'data/interfaces/IOrder'
import OrderRepository from 'data/repositories/OrderRepository'


interface Props {

}

export default function Orders(props: Props) {

  const fetchOrders = async (page: number, limit: number) => {
    await OrderRepository.fetchHistory({ page, limit }).then((data) => {
      if (data) {
        setOrders(data.data)
        setTotal(data.total)
      }
    })
  }

  const [orders, setOrders] = useState<IOrder[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const limit = 10

  useEffect(() => {
    fetchOrders(page, limit)
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        История заказов
      </div>
      <div className={styles.container}>
        {orders.map((i, index) =>
          <OrderCard order={i} key={index} />
        )}
      </div>
    </div>
  )
}
