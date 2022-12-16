import { useRef } from 'react'
import styles from './index.module.scss'
import { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import SliderControl from 'components/ui/SliderControl'
import SectionHeaderLoader from '../SectionHeaderLoader'
import RestaurantCardLoader from '../RestaurantCardLoader'

export default function OffersWeekLoader() {

  const swiperRef = useRef<SwiperClass>(null)
  const handlePrevClick = async () => {
    swiperRef.current?.slidePrev()
  }
  const handleNextClick = async () => {
    swiperRef.current?.slideNext()
  }

  const array = Array(4)

  const items = array.fill(<RestaurantCardLoader/>)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <SectionHeaderLoader/>
        <div className={styles.controls}>
          <SliderControl direction='prev' onClick={handlePrevClick} />
          <SliderControl direction='next' onClick={handleNextClick} />
        </div>
      </div>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          576: {
            slidesPerView: 2
          },
          1200: {
            slidesPerView: 3
          },
        }}
      >
        {items.map((i, index) =>
          <SwiperSlide className={styles.slide} key={index}>
            <RestaurantCardLoader className={styles.card}/>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}
