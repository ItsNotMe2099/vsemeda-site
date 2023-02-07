import styles from './index.module.scss'
import classNames from 'classnames'
import {useUnitContext} from 'context/unit_state'
import DesktopMenuItem from 'components/for_pages/restaurant/DesktopMenuItem'

interface Props {

}

export default function DesktopMenu(props: Props) {
  const unitContext = useUnitContext()
  const unit = unitContext.unit
  return (
   <div className={classNames(styles.root, {[styles.closed]: unit.isAvailable})}>
     <div className={styles.title}>Меню:</div>
   <div className={styles.list}>
     {unitContext.menu.filter(i => !i.parentId).map(item => <DesktopMenuItem name={item.name} link={item.id} isActive={unitContext.activeCategoryId === item.id}/>)}
   </div>
   </div>
  )
}
