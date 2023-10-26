import styles from './index.module.scss'
import {IViewLayoutItem} from 'data/interfaces/IViewLayout'
import {ViewTemplateItemType} from 'data/enum/ViewTemplateItemType'
import PromoSlider from 'components/for_pages/Common/PromoSlider'
import UnitSlider from 'components/for_pages/Common/UnitSlider'

interface Props{
  item: IViewLayoutItem
}
export default function LayoutItem(props: Props) {


  const body = () => {
    switch (props.item.type){
      case ViewTemplateItemType.SliderPromo:
        return props.item.promos && props.item.promos.length > 0 ? <PromoSlider promos={props.item.promos}/>: null
      case ViewTemplateItemType.SliderBrands:
        return props.item.units.length && props.item.units.length > 0 ? <UnitSlider units={props.item.units}/> : null
      case ViewTemplateItemType.BannerPromo:
      case ViewTemplateItemType.BannerBrand:

    }
  }
  return (
    <div className={styles.root}>
      <div className={styles.name}>
        {props.item.name}
      </div>
      <div className={styles.body}>
        {body()}
      </div>
    </div>
  )
}
