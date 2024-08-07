import styles from './index.module.scss'
import RestaurantBanner from 'components/for_pages/restaurant/RestaurantBanner'
import DesktopMenu from 'components/for_pages/restaurant/DesktopMenu'
import Sticky, {Status} from 'react-stickynode'
import RestaurantMenu from 'components/for_pages/restaurant/RestaurantMenu'
import Header from '../Header'
import RestaurantPromoList from 'components/for_pages/restaurant/RestaurantPromoList'
import {useUnitContext} from 'context/unit_state'
import {useState} from 'react'
import VisibleOnSize from 'components/visibility/VisibleOnSize'
import { breakpoints } from 'styles/variables'
import MobileMenu from '../MobileMenu'


export default function RestaurantPage() {
  const unitContext = useUnitContext()

  const [isMobileMenuStiky, changeMobMenuState] = useState<boolean>(false)

  const stickyHandler = (state: Status) => {
    changeMobMenuState(state.status === 2 ? true: false)
  }

  return (
    <div className={styles.root}>
      <VisibleOnSize width={breakpoints.PhoneWidth} minSize >
        <div className={styles.aside}>
          <Sticky enabled={true} top={120} bottomBoundary={0}>
            <DesktopMenu />
          </Sticky>
        </div>
      </VisibleOnSize>
      <div className={styles.content}>
          <Header/>
          <RestaurantBanner className={styles.banner} />
          {isMobileMenuStiky && <p className={styles.stickyName}>{unitContext.unit.brand.name}</p>}
          <VisibleOnSize width={breakpoints.PhoneWidth} >
            <Sticky onStateChange={stickyHandler}  top={70} innerZ={200} innerActiveClass={styles.mobileMenuActive}>
              <MobileMenu/>
            </Sticky>
          </VisibleOnSize>
          <RestaurantPromoList promoUnits={unitContext.unit.promoUnits}/>
          <RestaurantMenu/>
      </div>
    </div>
  )
}
