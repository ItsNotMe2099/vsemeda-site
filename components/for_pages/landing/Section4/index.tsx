import styles from './index.module.scss'
import Image from 'next/image'
import classnames from 'classnames'
import { useResize } from 'components/hooks/useResize'
import {Swiper, SwiperSlide} from 'swiper/react'



interface Props {
}

export default function Section4(props: Props) {
  const {isTabletWidth} = useResize()

  const cities: {name: string, isActive: boolean, badge?: string}[] = [
    {name: 'Москва', isActive: true, badge: undefined},
    {name: 'Ростов-на-Дону', isActive: true, badge: undefined},
    {name: 'Калининград', isActive: true, badge: 'NEW'},
    {name: 'Краснодар', isActive: false, badge: 'СКОРО'},
    {name: 'Новосибирск', isActive: false, badge: 'СКОРО'},
    {name: 'Челябинск', isActive: false, badge: 'СКОРО'},
  ]

  return (  
  <section className={styles.section}>
    <div className={styles.wrapper}>
      <picture>
        <source srcSet='/images/landings/pixelMapMid.png' media={'(max-width: 1200px)'} width={457} height={277}/>
        <Image src={'/images/landings/pixelMap.png'} className={styles.image} alt={'pixelMap'} width={633} height={270}/>
      </picture>

      <div className={styles.content}>
        <p className={styles.title}>🧭 Где есть Всем Еда?</p>
        <p className={styles.description}>Петербург, Москва, Ростов-на-Дону, Калининград уже с нами, совсем скоро мы охватим всю Россию. </p>
        {!isTabletWidth &&
        <div className={styles.tags}>
          {cities.map(el=> {
            return <div key={el.name} className={classnames(styles.tag, !el.isActive && styles.tag_grey)}>{el.name} {el.badge && <p className={styles.badge}>{el.badge}</p>}</div>
          })}
        </div>
        }

        {isTabletWidth &&
          <Swiper className={styles.tags} 
          slidesPerView={'auto'}
          spaceBetween={8}
          >
            {cities.map(el=> (
              <SwiperSlide className={styles.slide}>
                <div key={el.name} className={classnames(styles.tag, !el.isActive && styles.tag_grey)}>{el.name} {el.badge && <p className={styles.badge}>{el.badge}</p>}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        }
      </div>

    </div>
  </section>)
}