import styles from 'components/for_pages/Common/UnitSlider/UnitSliderDesktop/index.module.scss'
import classNames from 'classnames'
import {useUnitContext} from 'context/unit_state'
import { Swiper, SwiperSlide } from 'swiper/react'
import {Pagination, Mousewheel, Keyboard, Parallax} from 'swiper'
import { useRef} from 'react'
import SliderArrow from 'components/ui/SliderArrow'
import {IUnit} from 'data/interfaces/IUnit'
import UnitCard from 'components/for_pages/Common/UnitCard'
import {SwiperRef} from 'swiper/react/swiper-react'
import EffectCarousel from 'components/ui/Slider/EffectCarousel'
import {colors} from 'styles/variables'
interface Props {
  className?: string
  units: IUnit[]
}

export default function UnitSliderDesktop(props: Props) {
  const unitContext = useUnitContext()
  const sliderRef = useRef<SwiperRef>(null)
  return (
   <div className={styles.root}>
     <SliderArrow direction={'prev'} color={colors.grey5} sliderRef={sliderRef} className={classNames(styles.arrow, styles.prev)}/>
     <Swiper
       effect={'carousel' as any}
       ref={sliderRef}
       slidesPerView={'auto'}
       spaceBetween={0}
       loop={props.units.length > 2 ? true : false}
       centeredSlides={true}
       pagination={true}
       modules={[Pagination, Mousewheel, Keyboard, Parallax, EffectCarousel]}
     >
       {props.units.map(unit => <SwiperSlide className={styles.slide}>
         <UnitCard unit={unit} className={styles.card}/>
       </SwiperSlide>)}
     </Swiper>
     <SliderArrow direction={'next'} color={colors.grey5} sliderRef={sliderRef} className={classNames(styles.arrow, styles.next)}/>

   </div>
  )
}
