import styles from './index.module.scss'
import {ReactElement} from 'react'


interface Props {
 static?: boolean
 children: string | ReactElement | ReactElement[]
}

export default function FieldLabel(props: Props) {

  return (
    <div className={styles.label}>
      {props.children}
    </div>
  )
}
