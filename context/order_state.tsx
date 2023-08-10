import { OrderInitType } from 'data/enum/OrderState'
import { IOrder } from 'data/interfaces/IOrder'
import OrderRepository from 'data/repositories/OrderRepository'
import {createContext, ReactElement, useContext,  useRef, useState} from 'react'

interface IState {  
  init: (type: OrderInitType) => void
  ordersExist: boolean,
  refreshOrders: () => void
  activeOrders: IOrder[]|null
  activeDetails: IOrder
  fetchOrderDetails: (id: string)=> void
}

const defaultValue: IState = {  
  init: () => null,
  ordersExist: false,
  refreshOrders: () => null,
  activeOrders: null,
  fetchOrderDetails: ()=>null,
  activeDetails: null
}

const ActiveOrderContext = createContext<IState>(defaultValue)

interface Props {
  children: ReactElement | ReactElement[]
}

export function ActiveOrderWrapper(props: Props) {
  const [ordersExist, setExist] = useState<boolean>(false)
  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]) 
  const intervalId = useRef<any>(null!)
  const [activeDetails, setActiveDetails] = useState<IOrder>()
  
  const fetchActive = () => {
    OrderRepository.fetchActive().then(res=> {
      setActiveOrders(res)
      setExist(true)
      
    })
  }

  const fetchOrderDetails = (id: string) => {
    OrderRepository.fetchById(id).then(details=> {
      setActiveDetails(details)
    })
  }

  const init = (type: OrderInitType) => {
    switch (type) {
      case OrderInitType.Start:
        fetchActive()
        intervalId.current = setInterval(fetchActive, 10000)
        break
      case OrderInitType.Stop : 
        intervalId.current && clearInterval(intervalId.current)  
        setExist(false)
        break
    }
  }

  const refreshOrders = () => {
    fetchActive()
  }

  const value: IState = {
    ...defaultValue,
    ordersExist,
    refreshOrders,
    init,
    activeOrders,
    fetchOrderDetails,
    activeDetails
  }

  return (
    <ActiveOrderContext.Provider value={value}>
      {props.children}
    </ActiveOrderContext.Provider>
  )
}


export function useOrderContext() {
  return useContext(ActiveOrderContext)
}