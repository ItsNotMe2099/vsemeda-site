import styles from './index.module.scss'
import {IRestaurant} from 'data/interfaces/IRestaurant'

interface Props {
  restaurant: IRestaurant
}

export default function QrRestaurantCard({restaurant}: Props) {
  return (
    <div className={styles.root}>
      {(restaurant.logo || restaurant.image) && <div className={styles.image}></div>}
      <div className={styles.info}>
        <div className={styles.title}>{restaurant.name}</div>
        <div className={styles.address}>{restaurant.address}</div>
      </div>
    </div>
  )
}
