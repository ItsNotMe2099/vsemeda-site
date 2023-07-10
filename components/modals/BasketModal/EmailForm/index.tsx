import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import InputField from 'components/fields/InputField'
import {useCartContext} from 'context/cart_state'
import {useAppContext} from 'context/state'
import {SnackbarType} from 'types/enums'
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

export default function EmailForm(props: Props) {

  const cartContext = useCartContext()
  const appContext = useAppContext()
  const [loading, setLoading] = useState(false)

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

          <InputField
            name='email'
            styleType={'cashForm'}
            color='darkPurple'
            placeholder='Введите email'
            isNumbersOnly
          validate={Validator.combine([Validator.required, Validator.email])}/>
        <Spacer basis={20}/>
        <PaymentButton onClick={() => formik.submitForm()} loading={loading}/>
      </Form>


    </FormikProvider>
  )
}
