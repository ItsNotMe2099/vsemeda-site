import styles from './index.module.scss'
import { useEffect } from 'react'
import {IViewLayoutItem} from 'data/interfaces/IViewLayout'
import {ViewTemplateItemType} from 'data/enum/ViewTemplateItemType'
import PromoSlider from 'components/for_pages/Common/PromoSlider'
import UnitSlider from 'components/for_pages/Common/UnitSlider'

interface Props{
  item: IViewLayoutItem
}
export default function LayoutItem(props: Props) {


  useEffect(() => {

  }, [])
  const body = () => {
    switch (props.item.type){
      case ViewTemplateItemType.SliderPromo:
        return <PromoSlider promos={props.item.promos}/>
      case ViewTemplateItemType.SliderBrands:
        return <UnitSlider units={props.item.units}/>
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
