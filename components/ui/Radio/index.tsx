import styles from './index.module.scss'
import classNames from 'classnames'
interface Props {
  isActive: boolean
}
export default function Radio(props: Props) {
  return (
    <div className={classNames(styles.root, {[styles.active]: props.isActive})}/>
  )
}
