import styles from './index.module.scss'
import classNames from 'classnames'
interface Option {
  label: string
}

interface Props {
  className?: string
  bottom?: boolean
}

export default function DropDownTriangle(props: Props){
  return (
    <div className={classNames(styles.root, props.className, {[styles.bottom]: props.bottom})}>
      <div className={styles.triangle}/>
    </div>
  )
}
