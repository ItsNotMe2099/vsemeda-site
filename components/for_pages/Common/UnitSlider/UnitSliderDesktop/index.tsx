import styles from './index.module.scss'
import classNames from 'classnames'
// import {useUnitContext} from 'context/unit_state'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import {Pagination, Mousewheel, Keyboard, Parallax, EffectCreative} from 'swiper'
import { useRef} from 'react'
import SliderArrow from 'components/ui/SliderArrow'
import {IUnit} from 'data/interfaces/IUnit'
import UnitCard from 'components/for_pages/Common/UnitCard'
import {SwiperRef} from 'swiper/react/swiper-react'
import EffectCarousel from 'components/ui/Slider/EffectCarousel'
import {colors} from 'styles/variables'
import { useAppContext } from 'context/state'
import HiddenXs from 'components/visibility/HiddenXs'
interface Props {
  className?: string
  units: IUnit[]
}

export default function UnitSliderDesktop(props: Props) {
  // const unitContext = useUnitContext()
  const sliderRef = useRef<SwiperRef>(null)
  const appContext = useAppContext()


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

  //(как опция этот слайдер настроил на мобилку)
  // TODO: настроить чтобы показывало 2 предыдущих слайда, а не 1
  const mobileSwiperOptions = {
    grabCursor: true,
    loop: props.units.length > 1 ? true : false,
    loopedSlides: 3,
    initialSlide: props.units.length > 2 ? 2 : 1,
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: false,
        translate: ['-5%', 0, -50],
        scale: 1
      },
      next: {
        shadow: false,
        translate: ['120%', 0, 30],
        opacity: 0,
        scale: 1,
      },
    },
    modules: [EffectCreative]
  } as SwiperProps

  // const swiperOptions = () => {
  //   return appContext.isDesktop? deskSwiperOptions: mobileSwiperOptions
  // }

  return (
    <div className={styles.root}>
      <HiddenXs>
        <SliderArrow direction={'prev'} color={colors.grey5} sliderRef={sliderRef} className={classNames(styles.arrow, styles.prev)}/>
      </HiddenXs>
      <Swiper {...deskSwiperOptions}
      >
       {props.units.map(unit => <SwiperSlide className={styles.slide}>
         <UnitCard unit={unit} className={styles.card}/>
       </SwiperSlide>)}
     </Swiper>
     <HiddenXs>
      <SliderArrow direction={'next'} color={colors.grey5} sliderRef={sliderRef} className={classNames(styles.arrow, styles.next)}/>
     </HiddenXs>

   </div>
  )
}
