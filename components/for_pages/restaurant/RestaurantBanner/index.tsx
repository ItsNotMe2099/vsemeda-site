import styles from './index.module.scss'
import classNames from 'classnames'
import {useUnitContext} from 'context/unit_state'

interface Props {
  className?: string
}

export default function RestaurantBanner(props: Props) {
  const unitContext = useUnitContext()
  const unit = unitContext.unit
  return (
   <div className={classNames(styles.root, props.className, {[styles.closed]: unit.isAvailable})}>
     <div className={styles.name}>{unit.brand?.name}</div>
     {unit?.brand?.image && <div className={styles.image}  style={{backgroundImage: `url(${unit?.brand.image.link})`}} />}
     <div className={styles.overlay}/>
     <div className={styles.bgOverlay}/>
   </div>
  )
}
