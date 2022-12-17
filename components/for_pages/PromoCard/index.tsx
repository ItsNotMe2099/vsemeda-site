import Link from 'next/link'
import styles from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import { useAppContext } from 'context/state'

interface IItem {
  slug: string
  background: string
  name: string
  desc: string
}

interface Props {
  item: IItem
  className?: string
}

export default function PromoCard({ item, className }: Props) {

  const appContext = useAppContext()

  return (
    <Link href={`${appContext.region.slug}/${item.slug}`} className={classNames(styles.root, className)}>
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
