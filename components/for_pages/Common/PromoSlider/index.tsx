import styles from './index.module.scss'
import classNames from 'classnames'
import {useUnitContext} from 'context/unit_state'
import PromoCard from 'components/for_pages/Common/PromoCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Mousewheel, Keyboard } from 'swiper'
import { useRef} from 'react'
import SliderArrow from 'components/ui/SliderArrow'
import {IPromo} from 'data/interfaces/IPromo'
interface Props {
  className?: string
  promos: IPromo[]
}

export default function PromoSlider(props: Props) {
  const unitContext = useUnitContext()
  const sliderRef = useRef(null)
  return (
   <div className={styles.root}>
     <SliderArrow direction={'prev'} sliderRef={sliderRef} className={classNames(styles.arrow, styles.prev)}/>
     <Swiper
       ref={sliderRef}
       slidesPerView={'auto'}
       spaceBetween={24}
        pagination={true}
       modules={[Pagination, Mousewheel, Keyboard]}
     >
       {props.promos.map(i => <SwiperSlide className={styles.slide}>
         <PromoCard promo={i}/>
       </SwiperSlide>)}
     </Swiper>
     <SliderArrow direction={'next'} sliderRef={sliderRef} className={classNames(styles.arrow, styles.next)}/>

   </div>
  )
}
