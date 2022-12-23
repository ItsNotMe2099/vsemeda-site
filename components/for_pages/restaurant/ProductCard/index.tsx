import styles from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'

interface IItem {
  name: string
  desc: string
  weight: string
  price: number
  cover: string
}

interface Props {
  className?: string
  item: IItem
}

export default function ProductCard({ className, item }: Props) {


  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.img}><Image src={item.cover ? item.cover : '/images/restaurant/bg.svg'} alt=''
        fill /></div>
      <div className={styles.desc}>
        <h3 className={styles.header}>
          {item.name}
        </h3>
        <p className={styles.text}>
          {item.desc}
        </p>
        <div className={styles.others}>
          <div className={styles.price}>
            {item.price} ₽
          </div>
          <div className={styles.weight}>
            {item.weight}
          </div>
        </div>
      </div>
    </div>
  )
}
