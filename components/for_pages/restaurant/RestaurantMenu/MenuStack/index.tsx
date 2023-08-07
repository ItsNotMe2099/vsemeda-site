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

  const {isPhoneWidth} = useResize()

  const unitContext = useUnitContext()
  const unit = unitContext.unit
    
  const cartContext = useCartContext()
  const refStack = useRef<HTMLDivElement>(null!)

  const appContext = useAppContext()

  const options: IntersectionObserverInit = {
    root: null,
    threshold: 0,
    rootMargin: '0px 0px -70% 0px'
  }

  const isOnScreen = useOnScreen(refStack, options)

  useEffect(()=> {    
    if(!unitContext.scrollToCategoryFired) {
      isOnScreen && unitContext.setActiveCategory(props.item.parentId||props.item.id)
    }
  }, [isOnScreen, unitContext.scrollToCategoryFired])

  const handleAddClick = (product: IProduct) => {
      if (cartContext.productQuantityMap[product.id] > 1) {
        cartContext.updateProductQuantity(product, true)
      } else {
        cartContext.addProduct(product, unit.id)
      }
    }
  const handleMinusClick = (product: IProduct) => {
    cartContext.updateProductQuantity(product, false)
  }
  const handleClick = (product: IProduct) => {
    isPhoneWidth? 
    appContext.showBottomSheet(ModalType.ProductModal, {product: product, unitId: unit.id}):
      appContext.showModal(ModalType.ProductModal, {product: product, unitId: unit.id})
  }


  return (<>
  <div key={props.item.id} className={styles.stack}  ref={refStack}>
        <div className={styles.category} id={`category-${props.item.id}`}>{props.item.name}</div>
        <div className={styles.products}>
          {props.item.products.map((product, index) => <div key={index} className={styles.productCard}><MenuProductCard
            product={product}
            onMinusClick={() => handleMinusClick(product)}
            onAddClick={() => handleAddClick(product)}
            onClick={() => handleClick(product)}
            quantity={cartContext.productQuantityMap[product.id]} /></div>
          )}
        </div>
      </div>
  </>)
}