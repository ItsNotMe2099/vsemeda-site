import Rating from 'components/for_pages/Rating'
import Layout from 'components/layout/Layout'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'

interface Props {
  slug: string
}

export default function Restaurant({ slug }: Props) {

  const [loading, setIsLoading] = useState(true)

  const data =
  {
    logo: '/images/restaurant/burger.png', label: 'Burger Heroes', address: 'г. Санкт-Петербург, ул. Маршала Жукова 25',
    rating: 5, priceDelivery: 200, deliveryTime: '30-40', minPrice: 300
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  return (
    <Layout className={styles.root}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.content}>
            <div className={styles.img}>
              <Image src={data.logo} alt='' fill />
            </div>
            <div className={styles.desc}>
              <div className={styles.header}>
                {data.label}
              </div>
              <div className={styles.address}>
                {data.address}
              </div>
              <div className={styles.bottom}>
                <Rating rating={data.rating} />
                <div className={styles.priceDelivery}>
                  Доставка {data.priceDelivery}₽
                </div>
                <div className={styles.priceDelivery}>
                  {data.deliveryTime} мин
                </div>
                <div className={styles.priceDelivery}>
                  От {data.minPrice}₽
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
