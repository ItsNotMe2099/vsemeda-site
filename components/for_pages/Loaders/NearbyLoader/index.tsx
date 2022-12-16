import RestaurantCardLoader from '../RestaurantCardLoader'
import SectionHeaderLoader from '../SectionHeaderLoader'
import styles from './index.module.scss'

export default function NearbyLoader() {

  const array = Array(12)

  const items = array.fill(<RestaurantCardLoader/>)

  return (
    <div className={styles.root}>
      <SectionHeaderLoader />
      <div className={styles.list}>
        {items.map((i, index) =>
          <RestaurantCardLoader className={styles.card} key={index} />
        )}
      </div>
    </div>
  )
}
