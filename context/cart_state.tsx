import {createContext, ReactElement, useContext, useEffect, useRef, useState} from 'react'
import {debounce} from 'lodash'
import {useAppContext} from 'context/state'
import {ICart} from 'data/interfaces/ICart'
import {ICartLineCreateRequestData, ICartLineUpdateRequestData} from 'data/interfaces/ICartLineRequestData'
import {ICartUpdateRequestData} from 'data/interfaces/ICartUpdateRequestData'
import CartRepository from 'data/repositories/CartRepository'
import CartLineRepository from 'data/repositories/CartLineRepository'
import {ICartLine} from 'data/interfaces/ICartLine'
import CartUtils from 'utils/CartUtils'
import useWindowFocus from 'use-window-focus'
import {IProduct} from 'data/interfaces/IProduct'

interface IState {
  cart: ICart | null;
  initialLoaded: boolean;
  updating: boolean;
  fetch: () => Promise<ICart | null>;
  update: (data: ICartUpdateRequestData) => Promise<ICart | null>;
  clear: () => void;
  createLine: (data: ICartLineCreateRequestData) => Promise<ICart | null>;
  addProduct: (product: IProduct, unitId: number) => void,
  updateLineQuantity: (line: ICartLine, isAdd?: boolean) => void,
  updateProductQuantity: (product: IProduct, isAdd?: boolean) => void,
  deleteLine: (lineId: number) => ICart | null;
}


const defaultValue: IState = {
  cart: null,
  initialLoaded: false,
  updating: false,
  fetch: () => null,
  update: () => null,
  clear: () => null,
  createLine: () => null,
  addProduct: () => null,
  updateLineQuantity: () => null,
  updateProductQuantity: () => null,
  deleteLine: () => null
}

const CartContext = createContext<IState>(defaultValue)

interface Props {
  children: ReactElement | ReactElement[]
}
type QuantityMap = {[key: string]: number}
type BoolMap = {[key: string]: boolean}
type DebounceMap = {[key: string]: () => void}
export function CartWrapper(props: Props) {
  const appContext = useAppContext()
  const [cart, setCartState] = useState<ICart | null>(null)
  const [updating, setUpdating] = useState(true)
  const [initialLoaded, setInitialLoaded] = useState(true)
  const [groupingIdQuantityMap, setGroupingIdQuantityMap] = useState<QuantityMap>({})
  const [productQuantityMap, setProductQuantityMap] = useState<QuantityMap>({})
  const productIsSyncingMapRef = useRef<BoolMap>({})

  const quantityChangeDebounceRef = useRef<DebounceMap>({})

  const cartRef = useRef<ICart | null>(null)
  const windowFocused = useWindowFocus()
  const windowFocusInit = useRef<boolean>(false)

  const clearQuantity = () => {
    setGroupingIdQuantityMap({})
    setProductQuantityMap({})
    quantityChangeDebounceRef.current = {}
  }
  const init = async () => {
    await fetch()
    setInitialLoaded(true)
  }
  const updateLoading = () => {
    setUpdating(Object.keys(productIsSyncingMapRef.current).length === 0)
  }
  const setCart = (cart: ICart) => {
    cartRef.current = cart
    setCartState(cart)
  }
  const fetch = async (): Promise<ICart> => {
    const cart = await CartRepository.fetch(appContext.currentLocation)
    setCart(cart)
    if(cart != null){
      _updateQuantity()
    }else{
      clearQuantity()
    }
    return cart
  }
  const createCartLineReq = async (data: ICartLineCreateRequestData): Promise<ICart> => {
    const cart = await CartLineRepository.create(data, appContext.currentLocation)
    setCart(cart)
    return cart
  }
  const updateCartReq = async (data: ICartUpdateRequestData): Promise<ICart> => {
    const cart = await CartRepository.update(data, appContext.currentLocation)
    setCart(cart)
    return cart
  }
  const updateCartLineReq = async (lineId: string, data: ICartLineUpdateRequestData): Promise<ICart> => {
    const cart = await CartLineRepository.update(lineId,data,appContext.currentLocation)
    setCart(cart)
    return cart
  }
  const deleteCartLineReq = async (lineId: string): Promise<ICart> => {
    const cart = await CartLineRepository.delete(lineId,appContext.currentLocation)
    setCart(cart)
    return cart
  }

  const getProductQuantityMapValue = (groupingIdQuantityMap: QuantityMap, productId: string) => {
   return Object.keys(groupingIdQuantityMap)
      .filter((e) => e.startsWith(`${productId}:`))
      .reduce( (t, e) => t + groupingIdQuantityMap[e]!, 0)
  }
  const _updateQuantity = () => {
    const groupingIdQuantityMap: QuantityMap = {}
    for (let line of cartRef.current.lines) {
      groupingIdQuantityMap[line.groupingId] = line.quantity
    }
    const productIds = cartRef.current.lines.map((e) => e.productId)
    const productQuantityMap: QuantityMap = {}
    for (let productId of productIds) {
      productQuantityMap[productId] = getProductQuantityMapValue(groupingIdQuantityMap, productId!)
    }
    setProductQuantityMap(productQuantityMap)
    setGroupingIdQuantityMap(groupingIdQuantityMap)
    productIsSyncingMapRef.current = {}

  }
  const updateProductQuantityMap = (productId: string) => {
    const quantity = Object.keys(groupingIdQuantityMap)
      .filter((e) => e.startsWith(`${productId}:`))
      .reduce((t, e) => t + groupingIdQuantityMap[e]!, 0)
    setProductQuantityMap({...productQuantityMap, [productId]: quantity})

  }
  const syncOrderProductQuantity = async (groupingId: string) => {
    const line = cart!.lines.find((i) => i.groupingId == groupingId)
    const userQuantity = groupingIdQuantityMap[groupingId] ?? 0
    if (line != null && line.quantity != userQuantity) {
      productIsSyncingMapRef.current[groupingId] = true
      updateLoading()
      if (userQuantity > line.quantity || (userQuantity < line.quantity && userQuantity > 0)) {
        await updateCartLineReq(line.id!,
          {quantity: groupingIdQuantityMap[line.groupingId]!})
      } else if (userQuantity == 0) {
        await deleteCartLineReq(line.id)
      }
      const updatedLine = cart!.lines.find((i) => i.id == line.id)
      if (updatedLine?.quantity != groupingIdQuantityMap[line.groupingId]) {
         await syncOrderProductQuantity(groupingId)
        return
      }
    }

   delete productIsSyncingMapRef.current[groupingId]
    if (Object.keys(productIsSyncingMapRef.current).length === 0) {
      _updateQuantity()
    }
    updateLoading()
  }


 const changeCartLineQuantity = (line: ICartLine, isAdd: boolean) => {
    if (line == null) {
      return
    }

    const key = `cart-product-change-${line.groupingId}`
    if (isAdd) {
      groupingIdQuantityMap[line.groupingId] = groupingIdQuantityMap[line.groupingId]! + 1
    } else if (groupingIdQuantityMap[line.groupingId]! > 1) {
      groupingIdQuantityMap[line.groupingId] = groupingIdQuantityMap[line.groupingId]! - 1
    } else {
      groupingIdQuantityMap[line.groupingId] = 0
    }

    updateProductQuantityMap(line.productId!)
    if (productIsSyncingMapRef.current[line.groupingId] == true) {
      return
    }
    if(quantityChangeDebounceRef.current[key]){
      quantityChangeDebounceRef.current[key]()
    }else{
      quantityChangeDebounceRef.current[key] = debounce(() => {
        syncOrderProductQuantity(line.groupingId)
      }, 300)
    }
  }

  const addToCart = async (data: ICartLineCreateRequestData) => {
    const groupingId = CartUtils.getLineGroupingId({productId: data.productId, modificationLines: data.modificationLines})

    const findLine = cart?.lines.find((i) => i.groupingId == groupingId)
    if (findLine != null) {
      changeCartLineQuantity(findLine, true)
      return
    }
    groupingIdQuantityMap[groupingId] = data.quantity ?? 1

    productIsSyncingMapRef.current[groupingId] = true
    updateLoading()
    updateProductQuantityMap(data.productId)
    await createCartLineReq(data)

    const  updatedLine = cart!.lines.find((i) => i.groupingId == groupingId)
    if (updatedLine?.quantity != groupingIdQuantityMap[groupingId]) {
      return syncOrderProductQuantity(groupingId)
    }
   delete productIsSyncingMapRef.current[groupingId]
    if (Object.keys(productIsSyncingMapRef.current).length === 0) {
      _updateQuantity()
    }
    updateLoading()
  }

  useEffect(() => {
    cartRef.current = cart
  }, [cart])


  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (!windowFocusInit.current) {
      windowFocusInit.current = true
      return
    }
    if (windowFocused && Object.keys(productIsSyncingMapRef.current).length === 0) {
     // debouncedReconnect()
    }
  }, [windowFocused])

  const value: IState = {
    ...defaultValue,
    cart,
    initialLoaded,
    updating,
    fetch,
    update: (data: ICartUpdateRequestData) => {
      return updateCartReq(data)
    },
    clear: async () => {
      await CartRepository.clear()
      setCart(null)
    },

    addProduct: async (product: IProduct, unitId: number) => {
      if(cart && unitId !== cart?.unitId){
        //TODO show alert clear
        return
      }else if(product.modificationGroups?.length > 0){
        // Todo Show Product Modal
      }else {
        await addToCart({productId: product.id, unitId, quantity: 1})
      }
    },
    updateLineQuantity: (line: ICartLine, isAdd?: boolean) => {
      changeCartLineQuantity(line, isAdd)
    },
    updateProductQuantity: async (product: IProduct, isAdd?: boolean) => {
      if(product.modificationGroups?.length > 0 && isAdd){
        // Todo Show Product Modal
      }else{
        const line = cartRef.current.lines.find(i => i.productId === product.id)
        if(line != null) {
          await changeCartLineQuantity(line, isAdd)
        }
      }
    },
    deleteLine: (lineId: number) => null

  }

  return (
    <CartContext.Provider value={value}>
      {props.children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
