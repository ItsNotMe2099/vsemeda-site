import styles from './index.module.scss'
import classNames from 'classnames'
import {useUnitContext} from 'context/unit_state'
import DesktopMenuItem from 'components/for_pages/restaurant/DesktopMenuItem'

export default function DesktopMenu() {
  const unitContext = useUnitContext()
  const unit = unitContext.unit

  return (
    <div className={classNames(styles.root, {[styles.closed]: unit.isAvailable})}>
      <div className={styles.title}>Меню:</div>
      <div className={styles.list}>
        {unitContext.menu.filter(i => i.products.length > 0)?.map((item, index) => 
          <DesktopMenuItem key={index} 
          name={item.name} 
          link={item.id} 
          onClick={() => unitContext.scrollToCategory(item)}  
          isActive={unitContext.activeCategoryId === item.id}/>
        )}
      </div>
    </div>
  )
}
