import styles from './index.module.scss'
import OrderCard from './OrderCard'
import { useState, useEffect, useCallback } from 'react'
import { IOrder } from 'data/interfaces/IOrder'
import OrderRepository from 'data/repositories/OrderRepository'
import Spinner from 'components/ui/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useResize } from 'components/hooks/useResize'
import OrderDetails from './OrderDetails'
import { useOrderContext } from 'context/order_state'


interface Props {

}

export default function Orders(props: Props) {

  const limit = 10
  const [orders, setOrders] = useState<IOrder[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const {isPhoneWidth} = useResize()
  const [showDetailsModal, setDetailsModal] = useState<boolean>(false)
  const orderContext = useOrderContext()


  const fetchOrders = async (page: number, limit: number) => {
    setLoading(true)
    await OrderRepository.fetchHistory({ page, limit }).then((data) => {
      if (data) {
        setOrders(data.data)
        setTotal(data.total)
      }
    })
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders(page, limit)
  }, [])

  const handleScrollNext = async () => {
    setPage(page + 1)
    setLoading(true)
    await OrderRepository.fetchHistory({ page: page + 1, limit: limit }).then((data) => {
      if (data) {
        setOrders(orders => [...orders, ...data.data])
      }
    })
    setLoading(false)
  }

  const activeDetails = useCallback((id: string)=>{
    if(id !== orderContext.activeDetails?.id) {
      orderContext.fetchOrderDetails(id).then(details=> {
        if(details) {
          setDetailsModal(true)
        }
      })
    }
  },[orderContext.activeDetails?.id])  

  const orderDetailsHandler = (id?: string) => {
    if(id) {
      activeDetails(id)
    } else {
      setDetailsModal(false)
      orderContext.setActiveDetails(null)
    }
  }

  if(isPhoneWidth && showDetailsModal && orderContext.activeDetails) {
    return <OrderDetails  onBackClick={()=>orderDetailsHandler()} isMobile={true}/>
  }

  return (
    <>
      <div className={styles.title}>
        История заказов
      </div>
      <div className={styles.container} id='scrollableDiv'>
        {(loading && total === 0) && <Spinner size={50} color="#fff" secondaryColor="rgba(255,255,255,0.4)" />}
        {total > 0 &&
          <InfiniteScroll
            dataLength={orders.length} //This is important field to render the next data
            next={handleScrollNext}
            hasMore={total > orders.length}
            loader={loading ? <Spinner size={50} color="#fff" secondaryColor="rgba(255,255,255,0.4)" /> : null}
            scrollableTarget='scrollableDiv'
          >
            {orders.map((i, index) =>
              <OrderCard order={i} key={index} onClickProps={orderDetailsHandler}/>
            )}
          </InfiniteScroll>
        }
      </div>
    </>
  )
}
