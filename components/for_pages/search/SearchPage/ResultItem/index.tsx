import MopedSvg from 'components/svg/MopedSvg'
import ShieldCheckSvg from 'components/svg/ShieldCheckSvg'
import StartFilledSvg from 'components/svg/StartFilledSvg'
import TicketDiscountSvg from 'components/svg/TicketDiscount'
import { colors } from 'styles/variables'
import styles from './index.module.scss'
import Product from './Product'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'


interface Props {

}

export default function ResultItem(props: Props) {

    const swiperOptions  = {
        slidesPerView: 'auto'
      } as SwiperProps

    return (<div className={styles.root}>
        <div className={styles.top}>
            <div className={styles.imgWrapper}>
                {/* //тут будет изображение */}
                <div className={styles.rating}>
                    <StartFilledSvg color={colors.white}/>
                    <p>{'4.5'}</p>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.restInfo}>
                    <p className={styles.delay}> <MopedSvg color={colors.red}/> Задержка +{'20'} мин</p>
                    <p className={styles.restName}>Ollis</p>
                    <p className={styles.restType}><ShieldCheckSvg color={colors.green}/>  &#183; {'₽₽₽'} &#183; {'Фастфуд'}</p>
                </div>
                <p className={styles.time}>{'75 мин'} &#183; {'8 km'}</p>
                <p className={styles.discount}>
                    <TicketDiscountSvg color={colors.green}/>
                    Скидка {'20%'}
                    &#183;
                    <span className={styles.discount__more}>7+</span>
                </p>
            </div>
        </div>
        <div className={styles.bottom}>
            {/* //TODO: сюда рендер продуктов из поиска, сделать InfiniteScroll */}
            <Swiper {...swiperOptions}>
                <SwiperSlide className={styles.slide}>
                    <Product/>
                </SwiperSlide >
                <SwiperSlide className={styles.slide}>
                    <Product/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <Product/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <Product/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <Product/>
                </SwiperSlide>
                
            </Swiper>
            
        </div>
    </div>)
}