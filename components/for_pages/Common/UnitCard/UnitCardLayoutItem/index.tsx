import {IUnitCardLayoutItem, UnitCardLayoutItemType} from 'data/interfaces/IUnitCardLayout'
import styles from './index.module.scss'
import LayoutIconImage from 'components/for_pages/Common/LayoutIconImage'
import classNames from 'classnames'
import PriceRatingUi from 'components/ui/PriceRating'
import {colors} from 'styles/variables'
import {IUnit} from 'data/interfaces/IUnit'
interface IItem {
  slug: string
  background?: string
  name: string
  rating: number
  prices: string
  deliveryTime: string
}

interface Props {
  item: IUnitCardLayoutItem
  size: 'small' | 'normal' | 'large'
  color: string
  unit: IUnit
}

export default function UnitCardLayoutItem({ item, size, color, unit }: Props) {

  const classes = classNames({
    [styles.small]: size === 'small',
    [styles.normal]: size === 'normal',
    [styles.large]: size === 'large'
  })

  switch (item.type){
    case UnitCardLayoutItemType.priceRating:
      if(unit.brand?.priceRating) {
        return <div className={classNames(styles.root, classes)}>
          <PriceRatingUi className={styles.priceRating} rating={unit.brand?.priceRating} colorActive={colors.dark1}
                         colorDisabled={'#C0C0C0'}/>
          {/* TODO: добавить тип кухни и зеленый значок подтверждения */}
        </div>
      }else{
        return null
      }
    case UnitCardLayoutItemType.badge:
    case UnitCardLayoutItemType.custom:
      return <div className={classNames(styles.root, classes)}>
        {item.icon && <LayoutIconImage icon={item.icon.val} color={item.icon.color ?? color}/>}
        {item.text?.val && <div className={styles.txt} style={{...(item.text.color ? {color: item.text.color} : {color: color})}}>{item.text?.val}</div>}
      </div>
    default:
  }
}
