import {IUnitCardLayoutPos, UnitCardLayoutPosItemsType} from 'data/interfaces/IUnitCardLayout'
import styles from './index.module.scss'
import UnitCardLayoutItem from 'components/for_pages/Common/UnitCard/UnitCardLayoutItem'
import classNames from 'classnames'
import Converter from 'utils/converter'

interface Props {
  layout: IUnitCardLayoutPos
  margin: 'small' | 'normal' | 'large'
  size: 'small' | 'normal' | 'large'
  position: 'tl' | 'tr' | 'bl' | 'br'
  className?: string
  bgColor: string
  color: string
}

export default function CardImgLayoutPos(props: Props) {
  const { layout, margin, size, position, className } = props
   if(!layout){
    return null
  }

  const classes = classNames({
    [styles.small]: margin === 'small',
    [styles.normal]: margin === 'normal',
    [styles.large]: margin === 'large',
    [styles[position]]: true
  }, className)
  const bgColor = layout?.bg.color ?? props.bgColor
  const style = {...(bgColor ? {backgroundColor: layout?.bg.opacity ? Converter.hexToRgbA(bgColor, layout.bg.opacity) : layout.bg.color} : {})}
  switch (layout.type){
    case UnitCardLayoutPosItemsType.ListDot:
      return <div className={classNames(styles.list, classes)} style={style}>{layout.items.map(item => <UnitCardLayoutItem color={props.color} item={item} size={size}/>)}</div>
    case UnitCardLayoutPosItemsType.List:
    default:
      return <div className={classNames(styles.list, classes)} style={style}>{layout.items.map(item => <UnitCardLayoutItem color={props.color}  item={item} size={size}/>)}</div>
  }
}