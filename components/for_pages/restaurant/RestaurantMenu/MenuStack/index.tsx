import MenuProductCard from 'components/for_pages/Common/MenuProductCard'
import { useResize } from 'components/hooks/useResize'
import { useCartContext } from 'context/cart_state'
import { useAppContext } from 'context/state'
import { useUnitContext } from 'context/unit_state'
import { IMenuCategory } from 'data/interfaces/IMenu'
import { IProduct } from 'data/interfaces/IProduct'
import useOnScreen from 'hooks/useOnScreen'
import { useEffect, useRef } from 'react'
import { ModalType } from 'types/enums'
import styles from './index.module.scss'

interface Props {
    item: IMenuCategory
}


export default function MenuStack (props: Props) {
  
  const unitContext = useUnitContext()
  const appContext = useAppContext()
  const cartContext = useCartContext()

  const {isPhoneWidth} = useResize()
  
  const unit = unitContext.unit
  
  const refStack = useRef<HTMLDivElement>(null!)
  const options: IntersectionObserverInit = {
    root: null,
    threshold: 0,
    rootMargin: '0px 0px -70% 0px'
  }
  const isOnScreen = useOnScreen(refStack, options)
  

  const handleAddClick = (product: IProduct) => {
    
    
    if (cartContext.productQuantityMap[product.id] > 1) {
      cartContext.updateProductQuantity(product, true, unit.id)
    } else {
      cartContext.addProduct(product, unit.id)
    }
  }

  const handleMinusClick = (product: IProduct) => {
    cartContext.updateProductQuantity(product, false)
  }

  const handleClick = (product: IProduct) => {
    
    if(appContext.currentAddress) {
      isPhoneWidth 
      ? appContext.showBottomSheet(ModalType.ProductModal, {product: product, unitId: unit.id})
      : appContext.showModal(ModalType.ProductModal, {product: product, unitId: unit.id})
    }
    else {
      appContext.showModal(ModalType.AddressForm)
    }
  }

  useEffect(()=> {    
    if(!unitContext.scrollToCategoryFired) {
      isOnScreen && unitContext.setActiveCategory(props.item.parentId||props.item.id)
    }
  }, [isOnScreen, unitContext.scrollToCategoryFired])


  return (<>
  <div key={props.item.id} className={styles.stack}  ref={refStack}>
        <div className={styles.category} id={`category-${props.item.id}`}>{props.item.name}</div>
        <div className={styles.products}>
          {props.item.products.map((product, index) => 
            <div key={index} className={styles.productCard}>
              <MenuProductCard
              product={product}
              onMinusClick={() => handleMinusClick(product)}
              onAddClick={() => handleAddClick(product)}
              onClick={() => handleClick(product)}
              quantity={cartContext.productQuantityMap[product.id]} />
            </div>
          )}
        </div>
      </div>
  </>)
}