import styles from './index.module.scss'
import BestOffersLoader from 'components/for_pages/Loaders/BestOffersLoader'
import OffersWeekLoader from 'components/for_pages/Loaders/OffersWeekLoader'
import Promotionsloader from 'components/for_pages/Loaders/PromotionsLoader'
import NearbyLoader from 'components/for_pages/Loaders/NearbyLoader'

export default function MainLoader() {

  return (
    <div className={styles.root}>
      <BestOffersLoader />
      <OffersWeekLoader />
      <Promotionsloader />
      <NearbyLoader />
    </div>
  )
}
