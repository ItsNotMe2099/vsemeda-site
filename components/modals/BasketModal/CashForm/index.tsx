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
import {useState} from 'react'
import {RequestError} from 'types/types'

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
    return isNaN(+value) || value  < cartContext.cart.total ? 'Введенное число должно быть больше суммы заказа' : undefined
  }
  const submit = async (data: IFormData) => {
    try {
      setLoading(true)
      await cartContext.update({...data, moneyChange: data.needMoneyChange ?  +data.moneyChange : null})
      props.onSubmit()
    } catch (err: any) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setLoading(false)
  }

  const formik = useFormik<IFormData>({
    initialValues: {
      moneyChange: null,
      needMoneyChange: true,
    },
    onSubmit: submit
  })

  return (

    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <Spacer basis={20}/>
        <SwitchField label={formik.values.needMoneyChange ? 'Нужна сдача из:' : 'Нужна сдача?'} name={'needMoneyChange'}
                     fluid={true} className={styles.switchLabel}/>
        {formik.values.needMoneyChange && <><Spacer basis={15}/>
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
        <Spacer basis={20}/>
        <div className={styles.bottom}>
          <div className={styles.label}>
            Сдача:
          </div>
          <div className={styles.value}>
            {formik.values.moneyChange > cartContext.cart?.total ? formik.values.moneyChange - cartContext.cart?.total : 0} руб.
          </div>
        </div></>}
        <Spacer basis={16}/>
        <PaymentButton onClick={() => formik.submitForm()} loading={loading}/>
      </Form>


    </FormikProvider>
  )
}
