import Rating from 'components/for_pages/Rating'
import Layout from 'components/layout/Layout'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import Menu from 'components/for_pages/restaurant/Menu'
import ProductCard from 'components/for_pages/restaurant/ProductCard'
import Basket from 'components/for_pages/restaurant/Basket'

interface Props {
  slug: string
}

export default function Restaurant({ slug }: Props) {

  const [loading, setIsLoading] = useState(true)

  const appContext = useAppContext()

  const data =
  {
    logo: '/images/restaurant/burger.png', label: 'Burger Heroes', address: 'г. Санкт-Петербург, ул. Маршала Жукова 25',
    rating: 5, priceDelivery: 200, deliveryTime: '30-40', minPrice: 300,
    categories: [
      {
        name: 'Новое',
        link: '#new',
        products: [
          {
            name: 'Креветки в азиатском соусе', desc: 'Креветки, Цукини, Тайский соус, Крахмал, масло растительное, Сахар',
            price: 559, weight: '220 г', cover: ''
          },
          {
            name: 'Креветки в азиатском соусе', desc: 'Креветки, Цукини, Тайский соус, Крахмал, масло растительное, Сахар',
            price: 559, weight: '220 г', cover: '/images/restaurant/Photo_Burgers.png'
          },
          {
            name: 'Креветки в азиатском соусе', desc: 'Креветки, Цукини, Тайский соус, Крахмал, масло растительное, Сахар',
            price: 559, weight: '220 г', cover: '/images/restaurant/Photo_Burgers.png'
          },
          {
            name: 'Креветки в азиатском соусе', desc: 'Креветки, Цукини, Тайский соус, Крахмал, масло растительное, Сахар',
            price: 559, weight: '220 г', cover: '/images/restaurant/Photo_Burgers.png'
          },
          {
            name: 'Креветки в азиатском соусе', desc: 'Креветки, Цукини, Тайский соус, Крахмал, масло растительное, Сахар',
            price: 559, weight: '220 г', cover: '/images/restaurant/Photo_Burgers.png'
          },
          {
            name: 'Креветки в азиатском соусе', desc: 'Креветки, Цукини, Тайский соус, Крахмал, масло растительное, Сахар',
            price: 559, weight: '220 г', cover: '/images/restaurant/Photo_Burgers.png'
          },
          {
            name: 'Креветки в азиатском соусе', desc: 'Креветки, Цукини, Тайский соус, Крахмал, масло растительное, Сахар',
            price: 559, weight: '220 г', cover: '/images/restaurant/Photo_Burgers.png'
          },
          {
            name: 'Креветки в азиатском соусе', desc: 'Креветки, Цукини, Тайский соус, Крахмал, масло растительное, Сахар',
            price: 559, weight: '220 г', cover: '/images/restaurant/Photo_Burgers.png'
          },
        ],
      },
      {
        name: 'Бургеры',
        link: '#burgers',
        products: [
          {
            name: 'Креветки в азиатском соусе', desc: 'Креветки, Цукини, Тайский соус, Крахмал, масло растительное, Сахар',
            price: 559, weight: '220 г', cover: '/images/restaurant/Photo_Burgers.png'
          },
          {
            name: 'Креветки в азиатском соусе', desc: 'Креветки, Цукини, Тайский соус, Крахмал, масло растительное, Сахар',
            price: 559, weight: '220 г', cover: '/images/restaurant/Photo_Burgers.png'
          }
        ],
      }
    ]
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
        <Menu items={data.categories} />
        <div className={styles.catalog}>
          {data.categories.map((i, index) =>
            <div className={styles.category} key={index}>
              <h2 className={styles.head}>
                {i.name}
              </h2>
              <div className={styles.list}>
                {i.products.map((i, index) =>
                  <ProductCard className={styles.card} item={i} key={index} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.fixed}>
          <Basket/>
        </div>
      </div>
    </Layout>
  )
}
