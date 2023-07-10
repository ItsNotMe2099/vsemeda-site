import styles from './index.module.scss'
import { useCartContext } from 'context/cart_state'
import Formatter from 'utils/formatter'
import * as React from 'react'


interface Props {
  onSubmit?: () => void
  className?: string
}

const Row = (props: {label: string, value: string}) => {
  return ( <div className={styles.row}>
    <div className={styles.label}>{props.label}</div>
    <div className={styles.value}>{props.value}</div>
  </div>)
}
export default function BasketReceipt(props: Props) {

  const cartContext = useCartContext()
  if(cartContext.isEmpty){
    return null
  }

  return (

    <div className={styles.root}>
      <div className={styles.title}>Ваш чек</div>
      <div className={styles.separator}/>

      <Row label={'Еда'} value={Formatter.formatPrice(cartContext.cart.subTotal)}/>
      {cartContext.unit?.deliveryPrice > 0 && <Row label={'Доставка'} value={Formatter.formatPrice(cartContext.unit?.deliveryPrice)}/>}
      {cartContext.cart.serviceFee > 0 && <Row label={'Сервисный сбор'} value={Formatter.formatPrice(cartContext.cart.serviceFee)}/>}
      {cartContext.cart.totalDiscount > 0 && <Row label={'Скидка'} value={Formatter.formatPrice(cartContext.cart.totalDiscount)}/>}
      <div className={styles.separator}/>

      <Row label={'К оплате'} value={Formatter.formatPrice(cartContext.totalWithDelivery)}/>

    </div>
  )
}
