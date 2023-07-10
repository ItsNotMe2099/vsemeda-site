import {IUnitCardLayoutPos, UnitCardLayoutPosItemsType} from 'data/interfaces/IUnitCardLayout'
import styles from './index.module.scss'
import UnitCardLayoutItem from 'components/for_pages/Common/UnitCard/UnitCardLayoutItem'
import classNames from 'classnames'
import {IUnit} from 'data/interfaces/IUnit'


interface Props {
  layout: IUnitCardLayoutPos
  margin: 'small' | 'normal' | 'large'
  size: 'small' | 'normal' | 'large'
  className?: string
  color: string
  unit: IUnit
}

export default function CardBodyLayoutPos({ layout, margin, color, size, className, unit }: Props) {
  if(!layout){
    return null
  }

  const classes = classNames({
    [styles.small]: margin === 'small',
    [styles.normal]: margin === 'normal',
    [styles.large]: margin === 'large'
  }, className)
  switch (layout.type){
    case UnitCardLayoutPosItemsType.ListDot:
      return <div className={classNames(styles.list, classes)}>{layout.items.map((item, index) => <><UnitCardLayoutItem color={color} item={item} size={size} unit={unit}/>{(index % 2 === 0 && index !== layout.items.length - 1) && <div className={styles.dot}/>}</>)}</div>
    case UnitCardLayoutPosItemsType.List:
    default:
      return <div className={classNames(styles.list, classes)}>{layout.items.map(item => <UnitCardLayoutItem color={color} item={item} size={size} unit={unit}/>)}</div>
  }
}
