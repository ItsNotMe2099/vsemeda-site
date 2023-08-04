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
  const windowRef = useRef<Window & typeof globalThis>(window)
  const {isPhoneWidth} = useResize()


  const fetchData = async () => {
    await MenuRepository.fetchCategories().then(i => setItems(i))
  }
  

  //TODO: как будто не  убирается eventListener при размонтировании... 
  //поэтому вылетает ошибка при переходе с главной на другую страницу (пока пофиксил костылем)

  const throt = useThrottleFn((e, top)=> {    
    if(!offersRef.current) {return}
    const topPos = offersRef.current.getBoundingClientRect().top
    offersRef.current.style.cssText = `transform: translate(${(top - topPos)*1.5}px) ;`        
  }, 50)

  const scrollProgress = (type? :'stop') => {  
    if(!offersRef.current) {return}    
    const top = offersRef.current.getBoundingClientRect().top
    const callback = (e: Event) => {throt.callback(e, top)}
    windowRef.current.addEventListener('scroll', callback)
    if(type === 'stop') {
      windowRef.current.removeEventListener('scroll', callback)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(()=> {   
    isPhoneWidth&&scrollProgress()
    return ()=> {scrollProgress('stop')}
  }, [isPhoneWidth])

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
