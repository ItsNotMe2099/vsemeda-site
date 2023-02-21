import { DeliveryMethod } from 'data/enum/DeliveryMethod'
import { PaymentMethod } from 'data/enum/PaymentMethod'
import { PriceRating } from 'data/enum/PriceRating'
import styles from './index.module.scss'
import OrderCard from './OrderCard'


interface Props {

}

export default function Orders(props: Props) {

  const orders = [
    {
      id: '1',
      number: '1',
      partnerNumber: '1',
      address: {
        id: '1',
        address: '',
        city: 'Moscow',
        street: 'Pushkina st.',
        house: '1',
      },
      location: {
        lat: 1,
        lng: 2,
      },
      paymentMethod: PaymentMethod.Cash,
      deliveryMethod: DeliveryMethod.Delivery,
      email: '',
      phone: '',
      personsCount: 666,
      createdAt: '10.10.2010',
      deliveredAt: '',
      subTotal: 1,
      totalDiscount: 20,
      total: 100000,
      isPreOrder: false,
      preOrderAt: new Date(),
      brand: {
        id: 1,
        name: 'Burger King',
        slug: 'burger_king',
        priceRating: PriceRating.Cheap
      },
      moneyChange: 0,
      isContactLessDelivery: false,
      lines: [{
        id: '1',
        name: 'pizza',
        modificationLines: [{
          id: '1',
          name: 'name',
          modificationId: '1',
          quantity: 1
        }],
        total: 1,
        price: 100,
        quantity: 100,
        productId: 1,
        isWeighted: true,
        modificationsPrice: 1
      }],
    }
  ]

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        История заказов
      </div>
      <div className={styles.container}>
        {orders.map((i, index) =>
          <OrderCard order={i} key={index} />
        )}
      </div>
    </div>
  )
}
