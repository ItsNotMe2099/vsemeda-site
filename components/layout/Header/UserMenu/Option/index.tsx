import styles from './index.module.scss'
import * as React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { useAppContext } from 'context/state'

interface MenuItem {
  icon: string
  text: string
  value: string
}

interface Props {
  item: MenuItem
  onClick: () => void
}

export default function Option({ item, onClick }: Props) {

  const appContext = useAppContext()

  return (
    <div className={classNames(styles.option, {[styles.active]: appContext.modalArguments === item.value})} onClick={onClick}>
      <div className={styles.icon}>
        <Image src={item.icon} alt='' fill />
      </div>
      <div className={styles.text}>{item.text}</div>
    </div>
  )
}
