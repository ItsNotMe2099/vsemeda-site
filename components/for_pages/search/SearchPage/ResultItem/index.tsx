import StartFilledSvg from 'components/svg/StartFilledSvg'
import { colors } from 'styles/variables'
import styles from './index.module.scss'
import Product from './Product'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { ISearchUnit } from 'data/interfaces/ISearchBrand'
import Image from 'next/image'
import { useAppContext } from 'context/state'
import { useRouter } from 'next/router'
import { Routes } from 'types/routes'


interface Props {
  unit: ISearchUnit
}

export default function ResultItem(props: Props) {

	const appContext = useAppContext()
  const swiperOptions = {slidesPerView: 'auto'} as SwiperProps
	const router = useRouter()

  return (<div className={styles.root} onClick={()=> router.push(Routes.restaurant(appContext.regionSlug, props.unit.brand.slug, props.unit.slug))}>
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
  	  {props.unit.products && props.unit.products.length > 1 &&
  	  	<Swiper {...swiperOptions}>
  	  	  {props.unit.products.map(product => {
  	  	    return (
							<SwiperSlide key={product.id} className={styles.slide}>
								<Product product={product}/>
							</SwiperSlide>
						)
  	  	  })}
  	  	</Swiper> 
				|| 
				props.unit.products.length === 1 &&<Product product={props.unit.products[0]}/>
				||
				<></>
  	  }
  	</div>
  </div>)
}