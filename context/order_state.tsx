import { OrderInitType } from 'data/enum/OrderState'
import { IOrder } from 'data/interfaces/IOrder'
import OrderRepository from 'data/repositories/OrderRepository'
import {createContext, Dispatch, ReactElement, SetStateAction, useContext,  useRef, useState} from 'react'

interface IState {  
  init: (type: OrderInitType) => void
  ordersExist: boolean,
  refreshOrders: () => void
  activeOrders: IOrder[]|null
  activeDetails: IOrder
  fetchOrderDetails: (id: string)=> Promise<IOrder>
  setActiveDetails: Dispatch<SetStateAction<IOrder>>
}

const defaultValue: IState = {  
  init: () => null,
  ordersExist: false,
  refreshOrders: () => null,
  activeOrders: null,
  fetchOrderDetails: ()=>null,
  activeDetails: null,
  setActiveDetails: ()=>null
}

const ActiveOrderContext = createContext<IState>(defaultValue)

interface Props {
  children: ReactElement | ReactElement[]
}

export function ActiveOrderWrapper(props: Props) {
  const [ordersExist, setExist] = useState<boolean>(false)
  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]) 
  const intervalId = useRef<any>(null!)
  const [activeDetails, setActiveDetails] = useState<IOrder|null>()
  
  const fetchActive = () => {
    OrderRepository.fetchActive().then(res=> {
      setActiveOrders(res)
      setExist(true)
      
    })
  }

  const fetchOrderDetails = async (id: string) => {
    const details = await OrderRepository.fetchById(id)
    setActiveDetails(details)
    return details
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
    activeDetails,
    setActiveDetails
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