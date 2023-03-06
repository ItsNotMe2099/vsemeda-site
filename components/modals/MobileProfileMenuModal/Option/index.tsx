import styles from './index.module.scss'
import Image from 'next/image'

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

  return (
    <div className={styles.root} onClick={onClick}>
      <div className={styles.icon}>
        <Image src={item.icon} alt='' fill />
      </div>
      <div className={styles.text}>{item.text}</div>
    </div>
  )
}

