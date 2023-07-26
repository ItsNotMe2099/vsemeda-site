import {forwardRef, useEffect, useState} from 'react'
import styles from 'components/modals/BasketModal/PaymentSelect/index.module.scss'
import CardCourierSvg from 'components/svg/CardCourierSvg'
import CashSvg from 'components/svg/CashSvg'
import {PaymentMethod} from 'data/enum/PaymentMethod'
import PaymentMethodItem from 'components/modals/BasketModal/PaymentMethodItem'
import {useCartContext} from 'context/cart_state'
import CashForm from 'components/modals/BasketModal/CashForm'
import {Sticky} from 'react-sticky'
import classNames from 'classnames'
import PaymentMethodList from 'components/modals/BasketModal/PaymentSelect/PaymentTypeList'
import PaymentButton from 'components/modals/BasketModal/PaymentSelect/PaymentButton'
import PaymentSelectTitle from 'components/modals/BasketModal/PaymentSelect/PaymentSelectTitle'
import {useAppContext} from 'context/state'
import {ModalType} from 'types/enums'
import EmailForm from 'components/modals/BasketModal/EmailForm'

enum State {
  Closed = 'closed',
  Opened = 'opened',
  Cash = 'cash',
  Email = 'email'
}

interface Props {
  isSticky?: boolean
  restProps?: any
  className?: string
}

const PaymentSelectInner = forwardRef<HTMLDivElement, Props & { style?: any, distanceFromTop?: number, className?: string }>((props, ref) => {

  const cartContext = useCartContext()
  const appContext = useAppContext()
  const [state, setState] = useState<State>(State.Closed)

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(cartContext.cart?.paymentMethod)
  useEffect(() => {
    if (cartContext.cart?.paymentMethod) {
      setPaymentMethod(cartContext.cart?.paymentMethod)
    }
  }, [cartContext.cart?.paymentMethod])

  const paymentOptions = cartContext.unit.paymentMethods.map(i => {
    switch (i) {
      case PaymentMethod.Cash:
        return {
          label: `Наличные${paymentMethod ? cartContext.cart?.moneyChange ? ` Сдача ${cartContext.cart?.moneyChange - cartContext.cart?.total} руб.` : ' Без сдачи' : ''}`,
          icon: <CardCourierSvg color='#61D56E'/>,
          value: i
        }
      case PaymentMethod.CardCourier:
        return {label: 'Картой курьеру', icon: <CardCourierSvg color='#61D56E'/>, value: i}
      case PaymentMethod.CardOnline:
        return {label: 'Картой онлайн', icon: <CashSvg color='#61D56E'/>, value: i}
    }
  })


  const handlePay = () => {

  }
  const handleSubmit = () => {
    //pay
    if(!appContext.isLogged){
      appContext.showModal(ModalType.Login)
      return
    }
    if(!paymentMethod && state === State.Closed){
      setState(State.Opened)
      return
    }else if(paymentMethod === PaymentMethod.CardOnline && appContext.user?.email){
      setState(State.Email)
    }else{

    }
  }
  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    if(method === PaymentMethod.Cash){
      setState(State.Cash)
    }
    setPaymentMethod(method)
  }
  const handleTitleClick = () => {
    switch (state){
      case State.Cash:
      case State.Email:
        setState(State.Opened)
        break
      case State.Closed:
        setState(State.Opened)
        break
      case State.Opened:
        setState(State.Closed)
        break
    }
  }
  const currentPaymentItem = paymentMethod ?
    <PaymentMethodItem heading={'Оплата'} item={paymentOptions.find(i => i.value === paymentMethod)}/> : null

  return (
    <div className={classNames(styles.root, props.className)} ref={ref}
         style={props.style} {...(props.restProps ?? {})}>

      {[State.Closed, State.Opened].includes(state) && <PaymentSelectTitle onClick={handleTitleClick} title={state === State.Closed && paymentMethod ? null : 'Выберите способ оплаты:'} arrow={true}>
          {state === State.Closed && currentPaymentItem}
        </PaymentSelectTitle>}
      {[State.Cash].includes(state) &&
        <PaymentSelectTitle onClick={() => setState(State.Opened)} title={'Назад'} back={true}/>}
      {[State.Email].includes(state) &&
        <PaymentSelectTitle onClick={() => setState(State.Opened)} title={'Электронный чек'} back={true}/>}

      {state !== State.Closed && <div className={styles.center}>
        {state === State.Opened &&
          <PaymentMethodList paymentOptions={paymentOptions} onSelect={handleSelectPaymentMethod}
                             selected={paymentMethod}/>}
        {state === State.Cash &&  <CashForm onSubmit={handleSubmit}/>}
        {state === State.Email &&  <EmailForm onSubmit={handleSubmit}/>}
      </div>}

      {[State.Opened, State.Closed].includes(state) &&  <div className={styles.bottom}>
        <PaymentButton onClick={handleSubmit} loading={loading}/>
      </div>}
    </div>
  )
})

PaymentSelectInner.displayName = 'PaymentSelectInner'
export default function PaymentSelect(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({style, isSticky, distanceFromTop, ...rest}) => <PaymentSelectInner className={props.className}
                                                                                         distanceFromTop={distanceFromTop} {...props}
                                                                                         restProps={rest}
                                                                                         style={style}/>}</Sticky>
  } else {
    return <PaymentSelectInner {...props} />
  }
}
