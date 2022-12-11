import Button from 'components/ui/Button'
import { useState } from 'react'
import RestaurantCard from '../RestaurantCard'
import SectionHeader from '../SectionHeader'
import styles from './index.module.scss'

export default function Nearby() {

  const [isShow, setIsShow] = useState(false)

  const items = [
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 5,
      prices: 'high',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '/images/home/wrap-item/kfc.png',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 5,
      prices: 'high',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 3,
      prices: 'low',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
    {
      link: '#',
      background: '',
      name: 'Kentucky Fried Chicken (KFC)',
      rating: 2,
      prices: 'medium',
      deliveryTime: '20-40 мин'
    },
  ]

  return (
    <div className={styles.root}>
      <SectionHeader head='Рестораны поблизости' />
      <div className={styles.list}>
        {(isShow ? items : items.slice(0, 12)).map((i, index) =>
          <RestaurantCard className={styles.card} item={i} key={index} />
        )}
      </div>
      <Button className={styles.btn}
        backColor='green'
        styleType='primary'
        btnSize='large'
        fluid
        onClick={() => setIsShow(isShow ? false : true)}
      >{isShow ? <>Скрыть</> : <>Показать все рестораны</>}</Button>
    </div>
  )
}
