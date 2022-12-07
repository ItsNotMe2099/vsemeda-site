import StarRatingSvg from 'components/svg/StarRatingSvg'
import Link from 'next/link'
import styles from './index.module.scss'
import classNames from 'classnames'

interface IItem {
  link: string
  background?: string
  name: string
  rating: number
  prices: string
  deliveryTime: string
}

interface Props {
  item: IItem
}

export default function RestaurantCard({ item }: Props) {

  return (
    <Link href={item.link} className={styles.root}  style={{ background: `url(${item.background ? item.background : '/images/home/wrap-item/bg.png'}) center -50% no-repeat;` }}>
      <div className={styles.body}>
        <div className={styles.desc}>
          <h3 className={styles.header}>{item.name}</h3>
          <div className={styles.bottom}>
            <div className=
              {classNames(styles.rating, {
                [styles.high]: item.rating === 5, [styles.middle]: item.rating >= 3 && item.rating !== 5,
                [styles.low]: item.rating < 3
              })}>
              <StarRatingSvg />
              <div className={styles.text}>{item.rating}</div>
            </div>
            <div className={styles.rating}>
              <span className={styles.active}>
                {item.prices === 'high' ? '₽₽₽' : item.prices === 'medium' ? <>₽₽<span>₽</span></> : <>₽<span>₽₽</span></>}
              </span>
            </div>
            <div className={styles.delivery}>
              <span className={styles.text}>{item.deliveryTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
