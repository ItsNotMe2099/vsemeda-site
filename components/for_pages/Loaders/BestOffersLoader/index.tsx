import RestaurantCardLoader from '../RestaurantCardLoader'
import SectionHeaderLoader from '../SectionHeaderLoader'
import styles from './index.module.scss'

export default function BestOffersLoader() {

  const array = Array(4)

  const items = array.fill(<RestaurantCardLoader/>)

  return (
    <div className={styles.root}>
      <SectionHeaderLoader desc/>
      <div className={styles.list}>
        {items.map((i, index) =>
          <RestaurantCardLoader key={index} />
        )}
      </div>
    </div>
  )
}
