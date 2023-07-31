import styles from './index.module.scss'
import RestaurantBanner from 'components/for_pages/restaurant/RestaurantBanner'
import DesktopMenu from 'components/for_pages/restaurant/DesktopMenu'
import Sticky from 'react-stickynode'
import RestaurantMenu from 'components/for_pages/restaurant/RestaurantMenu'
import Header from '../Header'
import { StickyContainer } from 'react-sticky'
import RestaurantPromoList from 'components/for_pages/restaurant/RestaurantPromoList'
import {useUnitContext} from 'context/unit_state'
import {useEffect} from 'react'
import VisibleOnSize from 'components/visibility/VisibleOnSize'
import { breakpoints } from 'styles/variables'

export default function RestaurantPage() {
  const unitContext = useUnitContext()

  useEffect(() => {

  }, [])
  return (
    <div className={styles.root}>
      <VisibleOnSize width={breakpoints.PhoneWidth} minSize >
        <div className={styles.aside}>
          <Sticky enabled={true} top={120} bottomBoundary={0}>
            <DesktopMenu />
          </Sticky>
        </div>
      </VisibleOnSize>
      <StickyContainer className={styles.content}>
          <Header />
          <RestaurantBanner className={styles.banner} />
          <RestaurantPromoList promoUnits={unitContext.unit.promoUnits}/>
          <RestaurantMenu />
      </StickyContainer>
    </div>
  )
}
