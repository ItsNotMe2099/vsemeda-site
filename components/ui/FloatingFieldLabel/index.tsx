import styles from './index.module.scss'
import {ReactElement} from 'react'
import classNames from 'classnames'


interface Props {
 active?: boolean
 children: string | ReactElement | ReactElement[]
}

export default function FloatingFieldLabel(props: Props) {
  return (
    <div className={classNames(styles.root, {[styles.active]: props.active})}>
      {props.children}
    </div>
  )
}

