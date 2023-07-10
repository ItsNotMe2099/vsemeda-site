import styles from './index.module.scss'
import classNames from 'classnames'
import {useUnitContext} from 'context/unit_state'
import RestaurantBannerBlock from 'components/for_pages/restaurant/RestaurantBannerBlock'
import StartFilledSvg from 'components/svg/StartFilledSvg'
import {colors} from 'styles/variables'
import ClockSvg from 'components/svg/ClockSvg'
import PriceRatingUi from 'components/ui/PriceRating'

interface Props {
  className?: string
}

export default function RestaurantBanner(props: Props) {
  const unitContext = useUnitContext()
  const unit = unitContext.unit
  return (
   <div className={classNames(styles.root, props.className, {[styles.closed]: unit.isAvailable})}>
     <div className={styles.name}>{unit.brand?.name}</div>
     <div className={styles.blocks}>
       <RestaurantBannerBlock label={'Смотреть'} icon={<StartFilledSvg color={colors.orange2}/>} value={unit.rating}/>
       <RestaurantBannerBlock label={'Доставка'} icon={<ClockSvg color={colors.dark1}/>} value={`${unit.deliveryTime}м`}/>
       <RestaurantBannerBlock  icon={<PriceRatingUi className={styles.priceRating} rating={unit.brand.priceRating} colorActive={colors.dark1} colorDisabled={'#C0C0C0'}/>} />

     </div>
     {unit?.brand?.image && <div className={styles.image}  style={{backgroundImage: `url(${unit?.brand.image.link})`}} />}
     <div className={styles.overlay}/>
     <div className={styles.bgOverlay}/>
   </div>
  )
}
