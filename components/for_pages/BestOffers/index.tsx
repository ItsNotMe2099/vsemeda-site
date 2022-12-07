import RestaurantCard from '../RestaurantCard'
import SectionHeader from '../SectionHeader'
import styles from './index.module.scss'

export default function BestOffers() {

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
  ]

  return (
    <div className={styles.root}>
      <SectionHeader head='Лучшие предложения' desc='С учетом ваших предыдущих заказов' />
      <div className={styles.list}>
        {items.map((i, index) =>
          <RestaurantCard item={i} key={index} />
        )}
      </div>
    </div>
  )
}
