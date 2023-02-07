import styles from './index.module.scss'
import classNames from 'classnames'
import {IProductCardLayoutCardItem} from 'data/interfaces/IProductCardLayout'
import LayoutIconImage from 'components/for_pages/Common/LayoutIconImage'
import {colors} from 'styles/variables'


interface Props {
  items: IProductCardLayoutCardItem[]
}

export default function CardImgLayoutPos(props: Props) {
  return <div className={classNames(styles.root)}>
    {props.items.map((item) => <div className={styles.item}>
      {item.img && <LayoutIconImage icon={item.img} color={item.clr ?? colors.green}/>}
    </div>)}
  </div>

}
