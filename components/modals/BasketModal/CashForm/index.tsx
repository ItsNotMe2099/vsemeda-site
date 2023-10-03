import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import InputField from 'components/fields/InputField'
import {useCartContext} from 'context/cart_state'
import {useAppContext} from 'context/state'
import {SnackbarType} from 'types/enums'
import SwitchField from 'components/fields/SwitchField'
import Spacer from 'components/ui/Spacer'
import Validator from 'utils/Validator'
import PaymentButton from 'components/modals/BasketModal/PaymentSelect/PaymentButton'
import {useEffect, useState} from 'react'
import {RequestError} from 'types/types'
import CashSvg from 'components/svg/CashSvg'
import PaymentMethodItem from '../PaymentMethodItem'

interface IFormData {
  moneyChange: number,
  needMoneyChange: boolean,
}

interface Props {
  onSubmit: () => void
}

export default function CashForm(props: Props) {

  const cartContext = useCartContext()
  const appContext = useAppContext()
  const [loading, setLoading] = useState(false)
  const  minMoneyChange = (value: string | number): string | undefined => {
    return isNaN(+value) || +value  < cartContext.cart.total ? 'Введенное число должно быть больше суммы заказа' : undefined
  }
  const submit = (data: IFormData) => {
    
    try {
      setLoading(true)
      cartContext.update({...data, moneyChange: data.needMoneyChange ?  +data.moneyChange : null})
      .then(() => {
        setLoading(false)
        props.onSubmit()
      })
    } catch (err: any) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
        setLoading(false)
      }
    }
  }

  const formik = useFormik<IFormData>({
    initialValues: {
      moneyChange: cartContext.cart?.moneyChange||null,
      needMoneyChange: cartContext.needMoneyChange||false,
    },
    onSubmit: submit
  })

  useEffect(()=>{
    cartContext.cart.moneyChange = formik.values.moneyChange
    
    if(cartContext.cart.moneyChange > (cartContext.cart.total + cartContext.unit.deliveryPrice)) {
      cartContext.update({moneyChange: Number(formik.values.moneyChange)})
    }
  }, [formik.values.moneyChange])

  useEffect(()=>{
    let data = formik.values.needMoneyChange
    
    cartContext.setNeedMoneyChange(data)
  }, [formik.values.needMoneyChange])

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        {/* <Spacer basis={20}/> */}
        <PaymentMethodItem item={{label: 'Наличными', icon: <CashSvg color='#61D56E'/>}} ></PaymentMethodItem>
        <SwitchField 
        label={formik.values.needMoneyChange ? 'Нужна сдача из:' : 'Нужна сдача?'} 
        name={'needMoneyChange'}
        fluid={true}  
        className={styles.switchLabel}
        labelClassName={styles.label}
        />
        {/* {formik.values.needMoneyChange && <><Spacer basis={15}/> */}
        {cartContext.needMoneyChange && <>
        {/* <Spacer basis={15}/> */}
        <div className={styles.moneyChangeForm}>
          <InputField
            className={styles.input}
            name='moneyChange'
            styleType={'cashForm'}
            color='darkPurple'
            placeholder='Введите сумму'
            isNumbersOnly
            validate={Validator.combine([Validator.required, minMoneyChange])}/>
        </div>
        {/* <Spacer basis={20}/> */}
        <div className={styles.bottom}>
          <div className={styles.label}>
            Сдача:
          </div>
          <div className={styles.value}>
            {formik.values.moneyChange > (cartContext.cart?.total+cartContext.unit?.deliveryPrice) ? formik.values.moneyChange - (cartContext.cart?.total+cartContext.unit?.deliveryPrice) : 0} руб.
          </div>
        </div></>}
        <Spacer basis={8}/>
        <PaymentButton onClick={() => formik.submitForm()} loading={loading}/>
      </Form>


    </FormikProvider>
  )
}
