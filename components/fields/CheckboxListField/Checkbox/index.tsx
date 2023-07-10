import styles from './index.module.scss'
import classNames from 'classnames'
import CheckSvg from 'components/svg/CheckSvg'
interface Props<T> {
  value: T,
  isActive: boolean
  label?: string,
  className?: string
  children?: any
  onChange: (value: T) => void
  labelClassName?: string
}
export default function Checkbox<T>(props: Props<T>) {
  const handleClick = () => {
    props.onChange(props.value)
  }
  return (
    <div className={classNames(styles.root, {[styles.active]: props.isActive}, props.className)} onClick={handleClick}>
      <div className={styles.circle}>{props.isActive && <CheckSvg color={'black'}/>}</div>
      {props.children && props.children.length ? props.children : <div className={classNames(styles.label, props.labelClassName)}>{props.label}</div>}

    </div>
  )
}
