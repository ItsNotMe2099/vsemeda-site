import { useEffect, useRef, useState } from 'react'
import RestaurantCard from '../RestaurantCard'
import SectionHeader from '../SectionHeader'
import styles from './index.module.scss'
import { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import SliderControl from 'components/ui/SliderControl'

export default function OffersWeek() {

  const swiperRef = useRef<SwiperClass>(null)
  const handlePrevClick = async () => {
    swiperRef.current?.slidePrev()
  }
  const handleNextClick = async () => {
    swiperRef.current?.slideNext()
  }

  const items = [
    {
      slug: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 5,
      prices: 'high',
      deliveryTime: '20-40 мин'
    },
    {
      slug: '#',
      background: '/images/home/wrap-item/kfc.png',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 5,
      prices: 'high',
      deliveryTime: '20-40 мин'
    },
    {
      slug: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 3,
      prices: 'low',
      deliveryTime: '20-40 мин'
    },
    {
      slug: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
  ]

  const [isLast, setIsLast] = useState<boolean>(false)
  const [isFirst, setIsFirst] = useState<boolean>(true)

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on('slideChange', () => {
        setIsFirst(swiperRef.current.isBeginning)
        setIsLast(swiperRef.current.isEnd)
      })
    }
  }, [swiperRef.current?.activeIndex])

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <SectionHeader head='Предложения недели' />
        <div className={styles.controls}>
          <SliderControl disabled={isFirst} direction='prev' onClick={handlePrevClick} />
          <SliderControl disabled={isLast} direction='next' onClick={handleNextClick} />
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
            <RestaurantCard className={styles.card} item={i} />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}
