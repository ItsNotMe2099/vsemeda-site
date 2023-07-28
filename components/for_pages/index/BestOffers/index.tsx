import styles from 'components/for_pages/index/BestOffers/index.module.scss'
import DropdownMenu from 'components/ui/DropdownMenu'
import { ICategory } from 'data/interfaces/ICategory'
import MenuRepository from 'data/repositories/MenuRepository'
import { useEffect, useState } from 'react'
import UnitSlider from 'components/for_pages/Common/UnitSlider'
import {IViewLayoutItem} from 'data/interfaces/IViewLayout'
import HiddenXs from 'components/visibility/HiddenXs'
interface Props{
 item: IViewLayoutItem
}
export default function BestOffers(props: Props) {

  const [items, setItems] = useState<ICategory[] | null>(null)

  const fetchData = async () => {
    await MenuRepository.fetchCategories().then(i => setItems(i))
  }



  useEffect(() => {
    fetchData()
  }, [])

  return (
      <div className={styles.root}>
        <div className={styles.left}>
          <div className={styles.title}>
            Лучшие<br /> рестораны
          </div>
          <div className={styles.choose}>
            Выберите тип заведения
          </div>
          <div className={styles.drop}>
            {items ? <DropdownMenu options={items} className={styles.dropDown} /> : null}
            <img src={'/images/icons/best-offers-arrow.svg'}/>
          </div>
        </div>
        <div className={styles.mobile} >
          <div className={styles.title} >
            Лучшие<br/> предложения 😍
          </div>
        </div>
        <HiddenXs>
          <div className={styles.right}><UnitSlider units={props.item.units}/></div>
        </HiddenXs>
      </div>
  )
}
