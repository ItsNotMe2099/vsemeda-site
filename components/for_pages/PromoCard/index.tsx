import Link from 'next/link'
import styles from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'

interface IItem {
  link: string
  background: string
  name: string
  desc: string
}

interface Props {
  item: IItem
  className?: string
}

export default function PromoCard({ item, className }: Props) {

  return (
    <Link href={item.link} className={classNames(styles.root, className)}>
      <div className={styles.img}><Image src={item.background} alt=''
        fill /></div>
      <div className={styles.front}>
        <div className={styles.header}>
          {item.name}
        </div>
        <div className={styles.desc}>
          {item.desc}
        </div>
      </div>
    </Link>
  )
}
