import { useState } from 'react'
import styles from './index.module.scss'
import TicketPercentSvg from 'components/svg/TicketPercentSvg'
import { colors } from 'styles/variables'
import ChevronSvg from 'components/svg/ChevronSvg'
import CardCourierSvg from 'components/svg/CardCourierSvg'
import CashSvg from 'components/svg/CashSvg'
import { PaymentMethod } from 'data/enum/PaymentMethod'
import PaymentMethodComponent from '../PaymentMethodComponent'
import { useCartContext } from 'context/cart_state'
import { ICartUpdateRequestData } from 'data/interfaces/ICartUpdateRequestData'
import CashForm from '../CashForm'
import Switch from 'components/ui/Switch'

interface Props {
}

export default function PaymentSelect({ }: Props) {

  const cartContext = useCartContext()

  const [opened, setOpened] = useState<boolean>(false)

  const [cashForm, setCashForm] = useState<boolean>(false)

  const [change, setChange] = useState<boolean>(false)

  const items = [
    { img: null, title: 'Картой онлайн', value: PaymentMethod.CardOnline },
    { img: <CardCourierSvg color='#61D56E' />, title: 'Картой курьеру', value: PaymentMethod.CardCourier },
    { img: <CashSvg color='#61D56E' />, title: 'Наличные', value: PaymentMethod.Cash },
    { img: null, title: 'Google pay', value: PaymentMethod.GooglePay },
    { img: null, title: 'Apple pay', value: PaymentMethod.ApplePay },
  ]

  const handleMethod = (data: ICartUpdateRequestData) => {
    if (data.paymentMethod === PaymentMethod.CardCourier || data.paymentMethod === PaymentMethod.CardOnline) {
      cartContext.update(data)
      setOpened(false)
    }
    else if (data.paymentMethod === PaymentMethod.Cash) {
      cartContext.update(data)
      setCashForm(true)
    }
    else {
      cartContext.update(data)
      setOpened(false)
    }
  }

  const handleSubmit = () => {
    setChange(false)
    setCashForm(false)
    setOpened(false)
  }

  return (
    <div className={styles.root}>
      {!cashForm ? opened ?
        <div className={styles.choose} onClick={() => setOpened(false)}>
          <div className={styles.text}>Выберите способ оплаты:</div>
          <ChevronSvg color={'#F2F2F2'} />
        </div>
        :
        <>
          {!cartContext.cart?.paymentMethod ?
            <div className={styles.choose} onClick={() => setOpened(true)}>
              <div className={styles.text}>Выберите способ оплаты:</div>
              <ChevronSvg className={styles.chevron} color={'#F2F2F2'} />
            </div>
            :
            <div className={styles.choose} onClick={() => setOpened(true)}>
              <PaymentMethodComponent item={items.find(i => i.value === cartContext.cart?.paymentMethod)} chosen />
              <ChevronSvg className={styles.chevron} color={'#F2F2F2'} />
            </div>
          }
        </>
        :
        <div className={styles.back} onClick={() => setCashForm(false)}>
          <ChevronSvg className={styles.cash} color={'#F2F2F2'} />
          <div className={styles.text}>Назад к способу оплаты:</div>
        </div>}
      {opened ? <div className={styles.middle}>
        {!cashForm ?
          items.map((i, index) =>
            <PaymentMethodComponent onClick={() => handleMethod({ ...cartContext.cart, paymentMethod: i.value })} item={i} key={i.value} />
          )
          :
          <>
            <PaymentMethodComponent item={items.find(i => i.value === PaymentMethod.Cash)} />
            <div className={styles.change}>
              <div className={styles.text}>
                {change ? <>Нужна сдача из:</> : <>Нужна сдача?</>}
              </div>
              <Switch checked={change} onChange={() => setChange(change ? false : true)} />
            </div>
            {change ? <CashForm onSubmit={handleSubmit}/> : null}
          </>
        }
      </div> : null}
      <div className={styles.bottom}>
        <div className={styles.toPayment}>
          <div className={styles.left}>
            <div className={styles.top}>
              Перейти к оплате
            </div>
            <div className={styles.bottom}>
              45-60 мин
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.total}>{cartContext.cart?.total}₽</div>
            <TicketPercentSvg color={colors.black} />
          </div>
        </div>
      </div>
    </div>
  )
}
