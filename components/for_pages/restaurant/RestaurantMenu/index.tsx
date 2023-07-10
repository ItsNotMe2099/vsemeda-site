import styles from './index.module.scss'
import classNames from 'classnames'
import { useUnitContext } from 'context/unit_state'
import MenuProductCard from 'components/for_pages/Common/MenuProductCard'
import { useCartContext } from 'context/cart_state'
import { IProduct } from 'data/interfaces/IProduct'
import MobileMenu from '../MobileMenu'
import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'

interface Props {

}

export default function RestaurantMenu(props: Props) {
  const unitContext = useUnitContext()
  const cartContext = useCartContext()
  const appContext = useAppContext()
  const unit = unitContext.unit

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
      appContext.showModal(ModalType.ProductModal, {product: product, unitId: unit.id})
  }

  return (
    <div className={classNames(styles.root, { [styles.closed]: unit.isAvailable })}>
      <MobileMenu className={styles.filter}/>
      {unitContext.menu.map(i => {
        return (<div className={styles.stack}>
          <div className={styles.category} id={`category-${i.id}`}>{i.name}</div>
          <div className={styles.products}>
            {i.products.map(product => <div className={styles.productCard}><MenuProductCard
              product={product}
              onMinusClick={() => handleMinusClick(product)}
              onAddClick={() => handleAddClick(product)}
              onClick={() => handleClick(product)}
              quantity={cartContext.productQuantityMap[product.id]} /></div>
            )}
          </div>
        </div>)
      })}
    </div>
  )
}
