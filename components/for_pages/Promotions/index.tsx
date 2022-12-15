import { useRef } from 'react'
import SectionHeader from '../SectionHeader'
import styles from './index.module.scss'
import { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppContext } from 'context/state'
import SliderControl from 'components/ui/SliderControl'
import PromoCard from '../PromoCard'

export default function Promotions() {

  const swiperRef = useRef<SwiperClass>(null)
  const appContext = useAppContext()
  const handlePrevClick = async () => {
    swiperRef.current?.slidePrev()
  }
  const handleNextClick = async () => {
    swiperRef.current?.slideNext()
  }

  const items = [
    {
      link: '#',
      background: '/images/home/wrap-item/promo1.png',
      name: 'Мини-торт в подарок',
      desc: 'при заказе в День Рождения'
    },
    {
      link: '#',
      background: '/images/home/wrap-item/promo1.png',
      name: 'Мини-торт в подарок',
      desc: 'при заказе в День Рождения'
    },
    {
      link: '#',
      background: '/images/home/wrap-item/promo1.png',
      name: 'Мини-торт в подарок',
      desc: 'при заказе в День Рождения'
    },
    {
      link: '#',
      background: '/images/home/wrap-item/promo1.png',
      name: 'Мини-торт в подарок',
      desc: 'при заказе в День Рождения'
    },
    {
      link: '#',
      background: '/images/home/wrap-item/promo1.png',
      name: 'Мини-торт в подарок',
      desc: 'при заказе в День Рождения'
    },
    {
      link: '#',
      background: '/images/home/wrap-item/promo1.png',
      name: 'Мини-торт в подарок',
      desc: 'при заказе в День Рождения'
    },
    {
      link: '#',
      background: '/images/home/wrap-item/promo1.png',
      name: 'Мини-торт в подарок',
      desc: 'при заказе в День Рождения'
    },
    {
      link: '#',
      background: '/images/home/wrap-item/promo1.png',
      name: 'Мини-торт в подарок',
      desc: 'при заказе в День Рождения'
    },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <SectionHeader head='Акции' />
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
        className={styles.swiper}
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
            <PromoCard className={styles.card} item={i} />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}
