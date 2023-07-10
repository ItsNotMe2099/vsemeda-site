import styles from './index.module.scss'
import classNames from 'classnames'
import ArrowRightSvg from 'components/svg/ArrowRightSvg'
import {colors} from 'styles/variables'

interface Props {
  name: string
  link: string
  onClick?: () => void
  isActive?: boolean
}

export default function DesktopMenuItem(props: Props) {

  return (
   <div className={classNames(styles.root, {[styles.active]: props.isActive})} onClick={props.onClick}>
     <div className={styles.name}>{props.name}</div>
     <ArrowRightSvg className={classNames({[styles.arrow]: true})} color={colors.white}/>
   </div>
  )
}
