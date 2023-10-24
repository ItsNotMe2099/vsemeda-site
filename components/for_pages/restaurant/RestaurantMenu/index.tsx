import styles from './index.module.scss'
import classNames from 'classnames'
import { useUnitContext } from 'context/unit_state'
import MenuStack from './MenuStack'


export default function RestaurantMenu() {
  const unitContext = useUnitContext()
  const unit = unitContext.unit

  return (
    <div className={classNames(styles.root, { [styles.closed]: unit.isAvailable })} >
      {unitContext.menu.filter(item => item.products.length > 0).map((i, index) => {
        return (<MenuStack item={i} key={index}/>)
      })}
    </div>
  )
}


