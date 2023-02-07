import styles from './index.module.scss'
import classNames from 'classnames'
import {useUnitContext} from 'context/unit_state'
import MenuProductCard from 'components/for_pages/Common/MenuProductCard'

interface Props {

}

export default function RestaurantMenu(props: Props) {
  const unitContext = useUnitContext()
  const unit = unitContext.unit
  const handleAddClick = () => {

  }
  const handleMinusClick = () => {

  }
  return (
   <div className={classNames(styles.root, {[styles.closed]: unit.isAvailable})}>
     {unitContext.menu.map(i => {
       return (<div className={styles.stack}>
         <div className={styles.category}>{i.name}</div>
         <div className={styles.products}>
           {i.products.map(product => <MenuProductCard
             product={product}
             onMinusClick={handleMinusClick}
             onAddClick={handleAddClick}
             quantity={0}/>
           )}
         </div>
       </div>)
     })}
   </div>
  )
}
