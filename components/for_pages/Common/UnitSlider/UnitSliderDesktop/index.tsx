import styles from './index.module.scss'
import classNames from 'classnames'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import {Pagination, Mousewheel, Keyboard, Parallax} from 'swiper'
import { useRef} from 'react'
import SliderArrow from 'components/ui/SliderArrow'
import {IUnit} from 'data/interfaces/IUnit'
import UnitCard from 'components/for_pages/Common/UnitCard'
import {SwiperRef} from 'swiper/react/swiper-react'
import EffectCarousel from 'components/ui/Slider/EffectCarousel'
import {colors} from 'styles/variables'
import HiddenXs from 'components/visibility/HiddenXs'
interface Props {
  className?: string
  units: IUnit[]
}

export default function UnitSliderDesktop(props: Props) {
  const sliderRef = useRef<SwiperRef>(null)

  const deskSwiperOptions  = {
    effect: 'carousel',
    ref: sliderRef,
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: props.units.length > 2 ? true : false,
    centeredSlides: true,
    pagination: true,
    modules: [Pagination, Mousewheel, Keyboard, Parallax, EffectCarousel]
  } as SwiperProps


  return (
    <div className={styles.root}>
      <HiddenXs>
        <SliderArrow direction={'prev'} color={colors.grey5} sliderRef={sliderRef} className={classNames(styles.arrow, styles.prev)}/>
      </HiddenXs>
      <Swiper {...deskSwiperOptions}>
        {props.units.map((unit, index) => <SwiperSlide key={index} className={styles.slide}>
          <UnitCard unit={unit} wrapperClassName={styles.card}/>
        </SwiperSlide>)}
      </Swiper>
      <HiddenXs>
        <SliderArrow direction={'next'} color={colors.grey5} sliderRef={sliderRef} className={classNames(styles.arrow, styles.next)}/>
      </HiddenXs>
   </div>
  )
}
