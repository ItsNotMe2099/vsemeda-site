import styles from './index.module.scss'
import {useUnitContext} from 'context/unit_state'
import {IPromoUnit} from 'data/interfaces/IPromoUnit'
import TitleForSection from 'components/ui/TitleForSection'
import PromoSlider from 'components/for_pages/Common/PromoSlider'
interface Props {
  className?: string
  promoUnits: IPromoUnit[]
}

export default function RestaurantPromoList(props: Props) {
  const unitContext = useUnitContext()
  return (
    <div className={styles.root}>
      {props.promoUnits.length > 0 && <TitleForSection title={'Акции ресторана 🔥'} className={styles.title}/>}

    <PromoSlider promos={unitContext.unit.promoUnits.map(i => i.promo)}/>
    </div>
  )
}
