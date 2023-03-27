import styles from './index.module.scss'
import RestaurantBanner from 'components/for_pages/restaurant/RestaurantBanner'
import DesktopMenu from 'components/for_pages/restaurant/DesktopMenu'
import Sticky from 'react-stickynode'
import RestaurantMenu from 'components/for_pages/restaurant/RestaurantMenu'
import Header from '../Header'
import { StickyContainer } from 'react-sticky'

export default function RestaurantPage() {

  return (
    <div className={styles.root}>
      <div className={styles.aside}>
        <Sticky enabled={true} top={120} bottomBoundary={0}>
          <DesktopMenu />
        </Sticky>
      </div>
      <StickyContainer>
        <div className={styles.content}>
          <Header isSticky />
          <RestaurantBanner className={styles.banner} />
          <RestaurantMenu />
        </div>
      </StickyContainer>
    </div>
  )
}
