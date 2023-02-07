import {IUnitCardLayoutItem, UnitCardLayoutItemType} from 'data/interfaces/IUnitCardLayout'
import styles from './index.module.scss'
import LayoutIconImage from 'components/for_pages/Common/LayoutIconImage'
import classNames from 'classnames'
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
}

export default function UnitCardLayoutItem({ item, size, color }: Props) {

  const classes = classNames({
    [styles.small]: size === 'small',
    [styles.normal]: size === 'normal',
    [styles.large]: size === 'large'
  })
  switch (item.type){
    case UnitCardLayoutItemType.badge:
    case UnitCardLayoutItemType.priceRating:
    case UnitCardLayoutItemType.custom:
      return <div className={classNames(styles.root, classes)}>
        {item.icon && <LayoutIconImage icon={item.icon.val} color={item.icon.color}/>}
        {item.text?.val && <div className={styles.txt} style={{...(item.text.color ? {color: item.text.color} : {color: color})}}>{item.text?.val}</div>}
      </div>
    default:
  }
}
