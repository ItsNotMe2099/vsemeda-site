import styles from './index.module.scss'
import classNames from 'classnames'
import { useUnitContext } from 'context/unit_state'
import MenuStack from './MenuStack'
import { IMenuCategory } from 'data/interfaces/IMenu'


interface Props {
  onIntersection?: (entries: IntersectionObserverEntry[], observer: IntersectionObserver, categoryId: IMenuCategory) => void
}

export default function RestaurantMenu(props: Props) {
  const unitContext = useUnitContext()
  const unit = unitContext.unit

  return (
    <div className={classNames(styles.root, { [styles.closed]: unit.isAvailable })} >
      {unitContext.menu.filter(item => !item.parentId).map((i) => {
        return (<MenuStack item={i} onIntersection={props.onIntersection} />)
      })}
    </div>
  )
}


/* <div key={i.id} className={styles.stack}>
          <div className={styles.category} id={`category-${i.id}`}>{i.name}</div>
          <div className={styles.products}>
            {i.products.map((product, index) => <div key={index} className={styles.productCard}><MenuProductCard
              product={product}
              onMinusClick={() => handleMinusClick(product)}
              onAddClick={() => handleAddClick(product)}
              onClick={() => handleClick(product)}
              quantity={cartContext.productQuantityMap[product.id]} /></div>
            )}
          </div>
        </div> */
