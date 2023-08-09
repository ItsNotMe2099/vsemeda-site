import { OrderInitType } from 'data/enum/OrderState'
import { IOrder } from 'data/interfaces/IOrder'
import OrderRepository from 'data/repositories/OrderRepository'
import {createContext, ReactElement, useContext, useEffect, useRef, useState} from 'react'

interface IState {  
  init: (type: OrderInitType) => void
  ordersExist: boolean,
  setIsOrderActive: (type: boolean) => void
  activeOrders: IOrder[]|null
}

const defaultValue: IState = {  
  init: () => null,
  ordersExist: false,
  setIsOrderActive: () => null,
  activeOrders: null
}

const ActiveOrderContext = createContext<IState>(defaultValue)

interface Props {
  children: ReactElement | ReactElement[]
}

export function ActiveOrderWrapper(props: Props) {
  const [ordersExist, setExist] = useState<boolean>(false)
  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]) 
  const intervalId = useRef<ReturnType<typeof setInterval>>(null!)
  
  const fetch = () => {
    OrderRepository.fetchActive().then(res=> {
      setActiveOrders(res)
      setExist(true)
    })
  }

  const init = (type: OrderInitType) => {
    switch (type) {
      case OrderInitType.Start:
        fetch()
        intervalId.current = setInterval(fetch, 10000)
        break
      case OrderInitType.Stop : 
        intervalId.current && clearInterval(intervalId.current)  
        setExist(false)
        break
    }
  }

  const setIsOrderActive = (type:boolean) => {
    setExist(type)
  }


  const value: IState = {
    ...defaultValue,
    ordersExist,
    setIsOrderActive,
    init,
    activeOrders
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