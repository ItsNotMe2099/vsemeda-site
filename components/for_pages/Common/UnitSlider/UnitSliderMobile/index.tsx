import styles from 'components/for_pages/Common/UnitSlider/UnitSliderMobile/index.module.scss'
import classNames from 'classnames'
import {useUnitContext} from 'context/unit_state'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Parallax, EffectCreative} from 'swiper'
import {useEffect, useRef} from 'react'
import SliderArrow from 'components/ui/SliderArrow'
import {IUnit} from 'data/interfaces/IUnit'
import UnitCard from 'components/for_pages/Common/UnitCard'
import {SwiperRef} from 'swiper/react/swiper-react'
interface Props {
  className?: string
  units: IUnit[]
}

export default function UnitSliderMobile(props: Props) {
  const unitContext = useUnitContext()
  const sliderRef = useRef<SwiperRef>(null)
  useEffect(() => {
    const onResize = () => {
      if (!sliderRef.current?.swiper || sliderRef.current.swiper.destroyed) return
      // prettier-ignore
      sliderRef.current.swiper.params.creativeEffect.next.translate = [calcNextOffset(), 0, 0]
      if (
        sliderRef.current?.swiper.params.resizeObserver &&
        typeof window.ResizeObserver !== 'undefined'
      ) {
        sliderRef.current.swiper.update()
      }
    }
    window.addEventListener('resize', onResize)
    return () =>    window.removeEventListener('resize', onResize)
  }, [])
  const calcNextOffset = () => {
    if(!sliderRef.current?.swiper?.wrapperEl){
      return '0%'
    }
    const parentWidth = sliderRef.current.swiper.wrapperEl.parentElement.parentElement.offsetWidth
    const swiperWidth = sliderRef.current.swiper.wrapperEl.parentElement.offsetWidth

    let nextOffset =
      (parentWidth - (parentWidth - swiperWidth) / 2) / swiperWidth
    nextOffset = Math.max(nextOffset, 1)

    return `${nextOffset * 100}%`
  }
  return (
   <div className={styles.root}>
     <SliderArrow direction={'prev'} sliderRef={sliderRef} className={classNames(styles.arrow, styles.prev)}/>
     <Swiper
       effect={'creative' as any}
       ref={sliderRef}
       //slidesPerView={'auto'}
       spaceBetween={0}
       loop={props.units.length > 2 ? true : false}
       {...{      speed: 600,
         resistanceRatio: 0,
         grabCursor: true,
         parallax: true,
         creativeEffect: {
           limitProgress: 3,
           perspective: true,
           shadowPerProgress: true,
           prev: {
             shadow: true,
             translate: ['-15%', 0, -200],
           },
           next: {
             translate: [calcNextOffset(), 0, 0],
           }}}}
    //   pagination={true}
       modules={[ Parallax, EffectCreative]}
     >
       {props.units.map(unit => <SwiperSlide className={styles.slide}>
         <UnitCard unit={unit} className={styles.card}/>
       </SwiperSlide>)}
     </Swiper>
     <SliderArrow direction={'next'} sliderRef={sliderRef} className={classNames(styles.arrow, styles.next)}/>

   </div>
  )
}
