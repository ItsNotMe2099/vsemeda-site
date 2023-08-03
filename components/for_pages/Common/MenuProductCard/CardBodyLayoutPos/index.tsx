import styles from './index.module.scss'
import classNames from 'classnames'
import {IProductCardLayoutCardItem} from 'data/interfaces/IProductCardLayout'
import LayoutIconImage from 'components/for_pages/Common/LayoutIconImage'
import {colors} from 'styles/variables'


interface Props {
  items: IProductCardLayoutCardItem[]
  color?: string
}

export default function CardBodyLayoutPos(props: Props) {
  return <div className={classNames(styles.root)}>
    {props.items.map((item, index) => <div key={index} className={styles.item}>
      {item.img && <LayoutIconImage icon={item.img} color={item.clr ?? colors.green}/>}
      {item.txt && <div className={styles.txt} style={{color: props.color ?? colors.grey1}}>{item.txt}</div>}
    </div>)}
  </div>

}
