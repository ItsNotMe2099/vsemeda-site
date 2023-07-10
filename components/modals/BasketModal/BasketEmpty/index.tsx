import styles from './index.module.scss'
import * as React from 'react'

interface Props {
  onSubmit?: () => void
  className?: string
}

export default function BasketEmpty(props: Props) {
  return (

    <div className={styles.root}>
      Корзина пуста
    </div>
  )
}
