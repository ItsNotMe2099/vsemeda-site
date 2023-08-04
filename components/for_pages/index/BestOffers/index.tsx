import styles from './index.module.scss'
import DropdownMenu from 'components/ui/DropdownMenu'
import { ICategory } from 'data/interfaces/ICategory'
import MenuRepository from 'data/repositories/MenuRepository'
import { useEffect, useRef, useState } from 'react'
import UnitSlider from 'components/for_pages/Common/UnitSlider'
import {IViewLayoutItem} from 'data/interfaces/IViewLayout'
import VisibleOnSize from 'components/visibility/VisibleOnSize'
import { breakpoints } from 'styles/variables'
import { useThrottleFn } from '@react-cmpt/use-throttle'
import { useResize } from 'components/hooks/useResize'
interface Props{
 item: IViewLayoutItem
}
export default function BestOffers(props: Props) {

  const [items, setItems] = useState<ICategory[] | null>(null)
  const offersRef = useRef<HTMLDivElement>(null!)
  const {isPhoneWidth} = useResize()


  const fetchData = async () => {
    await MenuRepository.fetchCategories().then(i => setItems(i))
  }
  
  const throt = useThrottleFn((e, top)=> {
    const topPos = offersRef.current.getBoundingClientRect().top
    offersRef.current.style.cssText = `transform: translateX(${(top - topPos)*1.5}px);`
    
  }, 50)

  const scrollProgress = () => {
    const top = offersRef.current.getBoundingClientRect().top
    window.addEventListener('scroll', (e) => {throt.callback(e, top)})
  }

  useEffect(() => {
    fetchData()
    isPhoneWidth&&scrollProgress()
  }, [])

  return (
      <div className={styles.root} ref={offersRef}>
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
        <VisibleOnSize width={breakpoints.PhoneWidth} minSize >
          <div className={styles.right}><UnitSlider units={props.item.units}/></div>
        </VisibleOnSize>
      </div>
  )
}
