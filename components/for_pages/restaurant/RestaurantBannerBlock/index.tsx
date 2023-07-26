import styles from './index.module.scss'
import classNames from 'classnames'
import {useUnitContext} from 'context/unit_state'
import {ReactElement} from 'react'

interface Props {
  className?: string
  icon: ReactElement
  value?: string | number
  label?: string,
  handleClick?: () => void
}

export default function RestaurantBannerBlock(props: Props) {
  const unitContext = useUnitContext()
  const unit = unitContext.unit
  return (
   <div onClick={props.handleClick ? props.handleClick: null} className={classNames(styles.root, props.className, {[styles.centered]: !props.label})}>
     <div className={styles.top}>
       {props.icon} {props.value && <div className={styles.value}>{props.value}</div>}
     </div>
     {props.label && <div className={styles.bottom}><div className={styles.label}>{props.label}</div></div>}
   </div>
  )
}
