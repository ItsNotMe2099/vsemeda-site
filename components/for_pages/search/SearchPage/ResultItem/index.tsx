import StartFilledSvg from 'components/svg/StartFilledSvg'
import { colors } from 'styles/variables'
import styles from './index.module.scss'
import Product from './Product'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { ISearchUnit } from 'data/interfaces/ISearchBrand'
import Image from 'next/image'


interface Props {
    unit: ISearchUnit
}

export default function ResultItem(props: Props) {

    const swiperOptions  = {
        slidesPerView: 'auto'
      } as SwiperProps

    return (<div className={styles.root}>
        <div className={styles.top}>
            <div className={styles.imgWrapper}>             
                <Image src={props.unit.brand.image.link} alt={props.unit.brand.name} width={100} height={100}/>
                <div className={styles.rating}>
                    <StartFilledSvg color={colors.white}/>
                    <p>{props.unit.rating}</p>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.restInfo}>
                    <p className={styles.restName}>{props.unit.brand.name}</p>
                </div>
                <p className={styles.time}>{props.unit.deliveryTime} мин</p>              
            </div>
        </div>
        <div className={styles.bottom}>
            
            {/* //TODO: сделать InfiniteScroll */}
            {props.unit.products.length > 1 ? 
            <Swiper {...swiperOptions}>
                {props.unit.products.map(product => {
                    return <SwiperSlide key={product.id} className={styles.slide}><Product product={product}/></SwiperSlide >
                })}
            </Swiper> : <Product product={props.unit.products[0]}/>
            }
            
        </div>
    </div>)
}