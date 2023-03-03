import styles from 'components/for_pages/index/BestOffers/index.module.scss'
import { useEffect } from 'react'
import {IViewLayoutItem} from 'data/interfaces/IViewLayout'

interface Props{
  item: IViewLayoutItem
}
export default function LayoutItem(props: Props) {


  useEffect(() => {

  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.name}>
        {props.item.name}
      </div>
    </div>
  )
}
