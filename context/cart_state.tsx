import {createContext, ReactElement, useContext, useEffect, useRef, useState} from 'react'
import {debounce} from 'lodash'
import {useAppContext} from 'context/state'
import {ICart} from 'data/interfaces/ICart'
import {
  ICartLineCreateRequestData,
  ICartLineModificationRequestData,
  ICartLineUpdateRequestData
} from 'data/interfaces/ICartLineRequestData'
import {ICartUpdateRequestData} from 'data/interfaces/ICartUpdateRequestData'
import CartRepository from 'data/repositories/CartRepository'
import CartLineRepository from 'data/repositories/CartLineRepository'
import {ICartLine} from 'data/interfaces/ICartLine'
import CartUtils from 'utils/CartUtils'
import useWindowFocus from 'use-window-focus'
import {IProduct} from 'data/interfaces/IProduct'
import {IUnit} from 'data/interfaces/IUnit'
import {ModalType} from 'types/enums'
import {AddressModalArguments, ConfirmModalArguments, ProductModalArguments} from 'types/modal_arguments'
import {IPromo} from 'data/interfaces/IPromo'

interface IState {
  cart: ICart | null;
  unit: IUnit | null;
  initialLoaded: boolean;
  updating: boolean;
  fetchCart: () => Promise<ICart | null>;
  update: (data: ICartUpdateRequestData) => Promise<ICart | null>;
  clear: () => void;
  createLine: (data: ICartLineCreateRequestData) => Promise<ICart | null>;
  addProduct: (product: IProduct, unitId: number, quantity?: number, modifications?: ICartLineModificationRequestData[]) => Promise<boolean>,
  addProductFromModal: (product: IProduct, unitId: number, quantity?: number, modifications?: ICartLineModificationRequestData[]) => Promise<boolean>,
  updateLineQuantity: (line: ICartLine, isAdd?: boolean) => void,
  updateProductQuantity: (product: IProduct, isAdd?: boolean, unitId?: number) => void,
  updateProductQuantityFromCart: (product: ICartLine, isAdd?: boolean, unitId?: number) => void,
  updatePromoCode: (data: { code: string }) => void
  deleteLine: (lineId: number) => ICart | null;
  groupingIdQuantityMap: QuantityMap
  productQuantityMap: QuantityMap
  isEmpty: boolean
  total: number
  totalWithDelivery: number
  totalBaseWithDelivery: number
  promos: IPromo[]
}


const defaultValue: IState = {
  cart: null,
  unit: null,
  initialLoaded: false,
  updating: false,
  fetchCart: () => null,
  update: () => null,
  clear: () => null,
  createLine: () => null,
  addProduct: () => null,
  addProductFromModal: () => null,
  updateLineQuantity: () => null,
  updateProductQuantity: () => null,
  updateProductQuantityFromCart: () => null,
  updatePromoCode: () => null,
  deleteLine: () => null,
  groupingIdQuantityMap: {},
  productQuantityMap: {},
  isEmpty: false,
  total: 0,
  totalWithDelivery: 0,
  totalBaseWithDelivery: 0,
  promos: [],
}

const CartContext = createContext<IState>(defaultValue)

interface Props {
  children: ReactElement | ReactElement[]
}
type QuantityMap = { [key: string]: number }
type BoolMap = { [key: string]: boolean }
type DebounceMap = { [key: string]: () => void }
export function CartWrapper(props: Props) {
  const appContext = useAppContext()
  const [cart, setCartState] = useState<ICart | null>(null)
  const [updating, setUpdating] = useState(true)
  const [initialLoaded, setInitialLoaded] = useState(true)
  const [groupingIdQuantityMap, setGroupingIdQuantityMapState] = useState<QuantityMap>({})
  const [productQuantityMap, setProductQuantityMap] = useState<QuantityMap>({})
  const productIsSyncingMapRef = useRef<BoolMap>({})
  

  const unit = cart?.unit

  const quantityChangeDebounceRef = useRef<DebounceMap>({})
  const groupingIdQuantityMapRef = useRef<QuantityMap>({})

  const cartRef = useRef<ICart | null>(null)
  const windowFocused = useWindowFocus()
  const windowFocusInit = useRef<boolean>(false)

  const clearQuantity = () => {
    setGroupingIdQuantityMapState({})
    groupingIdQuantityMapRef.current = {}
    setProductQuantityMap({})
    quantityChangeDebounceRef.current = {}
  }
  
  const updateLoading = () => {
    setUpdating(Object.keys(productIsSyncingMapRef.current).length === 0)
  }
  const setCart = (cart: ICart) => {
    cartRef.current = cart
    setCartState(cart)
  }
  const setGroupingIdQuantityMap = (key: string, value: number) => {
    setGroupingIdQuantityMapState({ ...groupingIdQuantityMapRef.current, [key]: value })
    groupingIdQuantityMapRef.current[key] = value
  }
  const fetchCart = async (): Promise<ICart> => {
    const cart = await CartRepository.fetchCurrentCart(appContext.currentLocation)
    setCart(cart)
    if (cart != null) {
      _updateQuantity()
    } else {
      clearQuantity()
    }
    return cart
  }

  const init = async () => {
    await fetchCart()
    setInitialLoaded(true)
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
    const cart = await CartLineRepository.update(lineId, data, appContext.currentLocation)
    setCart(cart)
    return cart
  }
  const deleteCartLineReq = async (lineId: string): Promise<ICart> => {
    const cart = await CartLineRepository.delete(lineId, appContext.currentLocation)
    setCart(cart)
    return cart
  }

  const getProductQuantityMapValue = (groupingIdQuantityMap: QuantityMap, productId: string) => {
    return Object.keys(groupingIdQuantityMap)
      .filter((e) => e.startsWith(`${productId}:`))
      .reduce((t, e) => t + groupingIdQuantityMap[e]!, 0)
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
    setGroupingIdQuantityMapState(groupingIdQuantityMap)
    groupingIdQuantityMapRef.current = groupingIdQuantityMap
    productIsSyncingMapRef.current = {}

  }
  const updateProductQuantityMap = (productId: string) => {
    const quantity = Object.keys(groupingIdQuantityMapRef.current)
      .filter((e) => e.startsWith(`${productId}:`))
      .reduce((t, e) => t + groupingIdQuantityMapRef.current[e]!, 0)
    setProductQuantityMap({ ...productQuantityMap, [productId]: quantity })

  }
  const syncOrderProductQuantity = async (groupingId: string) => {
    const line = cartRef.current!.lines.find((i) => i.groupingId == groupingId)
    const userQuantity = groupingIdQuantityMapRef.current[groupingId] ?? 0
    if (line != null && line.quantity != userQuantity) {
      productIsSyncingMapRef.current[groupingId] = true
      updateLoading()
      if (userQuantity > line.quantity || (userQuantity < line.quantity && userQuantity > 0)) {
        await updateCartLineReq(line.id!,
          { quantity: groupingIdQuantityMapRef.current[line.groupingId]! })
      } else if (userQuantity == 0) {
        await deleteCartLineReq(line.id)
      }
      const updatedLine = cartRef.current!.lines.find((i) => i.id == line.id)

      if (updatedLine?.quantity != groupingIdQuantityMapRef.current[line.groupingId]) {
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
      setGroupingIdQuantityMap(line.groupingId, groupingIdQuantityMapRef.current[line.groupingId]! + 1)
    } else if (groupingIdQuantityMapRef.current[line.groupingId]! > 1) {
      setGroupingIdQuantityMap(line.groupingId, groupingIdQuantityMapRef.current[line.groupingId]! - 1)
    } else {
      setGroupingIdQuantityMap(line.groupingId, 0)
    }

    updateProductQuantityMap(line.productId!)
    if (productIsSyncingMapRef.current[line.groupingId] == true) {
      return
    }

    if (quantityChangeDebounceRef.current[key]) {
      quantityChangeDebounceRef.current[key]()
    } else {
      quantityChangeDebounceRef.current[key] = debounce(() => {
        syncOrderProductQuantity(line.groupingId)
      }, 300)
      quantityChangeDebounceRef.current[key]()
    }
  }

  const addToCart = async (data: ICartLineCreateRequestData) => {
    const groupingId = CartUtils.getLineGroupingId({ productId: data.productId, modificationLines: data.modificationLines })
    const findLine = cart?.lines.find((i) => i.groupingId == groupingId)
    if (findLine != null) {
      changeCartLineQuantity(findLine, true)
      return
    }
    setGroupingIdQuantityMap(groupingId, data.quantity ?? 1)

    productIsSyncingMapRef.current[groupingId] = true
    updateLoading()
    updateProductQuantityMap(data.productId)
    await createCartLineReq(data)

    const updatedLine = cartRef.current!.lines.find((i) => i.groupingId == groupingId)
    if (updatedLine?.quantity != groupingIdQuantityMapRef.current[groupingId]) {
      return syncOrderProductQuantity(groupingId)
    }
    delete productIsSyncingMapRef.current[groupingId]
    if (Object.keys(productIsSyncingMapRef.current).length === 0) {
      _updateQuantity()
    }
    updateLoading()
  }

  const clear = async () => {
    await CartRepository.clear()
    setCart(null)
    clearQuantity()
  }

  const addProduct = async(product: IProduct, unitId: number, quantity: number = null, modifications: ICartLineModificationRequestData[] = null): Promise<boolean> => {
    
    if(!appContext.currentAddress){
      appContext.showModal(ModalType.AddressForm, {firstAddress: true} as AddressModalArguments)
      return false
    }
    if (cart && unitId !== cart?.unitId) {
      //TODO show alert clear
      appContext.showModal(ModalType.Confirm, {
        text: 'Очистить корзину для нового заказа? В вашей корзине товары из другого заведения',
        onConfirm: async () => {
          
          await clear()
          if(product.modificationGroups?.length > 0) {
            appContext.showModal(ModalType.ProductModal, { product: product, unitId } as ProductModalArguments)
            return
          }

          //VSMA-531
          addToCart({ productId: product.id, unitId, quantity: quantity ?? 1, modificationLines: modifications ?? null })
          appContext.hideModal()
        },

      } as ConfirmModalArguments)
      return false
    } 
    else if (product.modificationGroups?.length > 0 ) {
        appContext.showModal(ModalType.ProductModal, { product: product, unitId } as ProductModalArguments)
    } 
    else {
      await addToCart({ productId: product.id, unitId, quantity: quantity ?? 1, modificationLines: modifications ?? null })
      return true
    }
  }

  const addProductFromModal = async (product: IProduct, unitId: number, quantity: number = null, modifications: ICartLineModificationRequestData[] = null) : Promise<boolean> => {
    if (cart && unitId !== cart?.unitId) {
      //TODO show alert clear
      appContext.showModal(ModalType.Confirm, {
        text: 'Очистить корзину для нового заказа? В вашей корзине товары из другого заведения',
        onConfirm: async () => {
          await clear()

          //VSMA-531
          addToCart({ productId: product.id, unitId, quantity: quantity ?? 1, modificationLines: modifications ?? null })
          appContext.hideModal()
        },

      } as ConfirmModalArguments)
      return false
    } 
    await addToCart({ productId: product.id, unitId, quantity: quantity ?? 1, modificationLines: modifications ?? null })
    return true
  }

  useEffect(() => {
    cartRef.current = cart
  }, [cart])


  useEffect(() => {    
    if(appContext.currentLocation) {
      init()
    }
  }, [appContext.currentLocation])

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
    groupingIdQuantityMap,
    productQuantityMap,
    isEmpty: cart === null || cart?.lines.length === 0,
    fetchCart,
    update: (data: ICartUpdateRequestData) => {
      return updateCartReq(data)
    },
    clear,
    addProduct,
    addProductFromModal,

    updateLineQuantity: (line: ICartLine, isAdd?: boolean) => {
      changeCartLineQuantity(line, isAdd)
    },
    updateProductQuantity: async (product: IProduct, isAdd?: boolean, unitId?: number) => {
      

      if (product.modificationGroups?.length > 0 && isAdd) {
        appContext.showModal(ModalType.ProductModal, { product: product, unitId } as ProductModalArguments)
      } else {
        
        const line = cartRef.current.lines.find(i => (i.productId === product.id)||(i.id === product.id))
        if (line != null) {
          await changeCartLineQuantity(line, isAdd)
        }
      }
    },

    updateProductQuantityFromCart: async(product: ICartLine, isAdd: boolean, unitId: number) => {
        
        const line = cartRef.current.lines.find(i => i.id === product.id)
        if (line != null) {
          await changeCartLineQuantity(line, isAdd)
      }
    },


    

  
    updatePromoCode: async (data: { code: string }) => {
      const cart = await CartRepository.applyPromoСode(data, appContext.currentAddress?.location)
      setCart(cart)
      return cart
    },
    deleteLine: (lineId: number) => null,
    unit,
    total: (cart?.total ?? 0) ,
    totalWithDelivery: (cart?.total ?? 0) + (unit?.deliveryPrice ?? 0),
    totalBaseWithDelivery: (cart?.totalBase ?? 0) + (unit?.deliveryPrice ?? 0),
    promos: cart ?  [...(cart?.promo && !cart?.unit?.promoUnits?.find(i => i.promo?.id ===  cart?.promo?.id) ? [cart!.promo] : []), ...(cart?.unit.promoUnits?.map(i => i.promo) ?? [])] : [],
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
