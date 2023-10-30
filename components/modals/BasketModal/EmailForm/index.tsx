import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import InputField from 'components/fields/InputField'
// import {useCartContext} from 'context/cart_state'
import {useAppContext} from 'context/state'
import {SnackbarType} from 'types/enums'
import Spacer from 'components/ui/Spacer'
import Validator from 'utils/Validator'
import PaymentButton from 'components/modals/BasketModal/PaymentSelect/PaymentButton'
import {useState} from 'react'
import {RequestError} from 'types/types'
import UserRepository from 'data/repositories/UserRepository'

interface IFormData {
  moneyChange: number,
  needMoneyChange: boolean,
  email?: string|undefined
}

interface Props {
  onSubmit: (string?: string) => void
}

export default function EmailForm(props: Props) {

  // const cartContext = useCartContext()
  const appContext = useAppContext()
  const [loading, setLoading] = useState(false)


  const submit = async (data: IFormData) => {    
    try {
      setLoading(true)
      //bug: update не апдейтит емейл, вот никак... 
      // cartContext.update({email: data.email ? data.email : undefined})
      // .then((res) => {
      await UserRepository.updateUser(data)
      appContext.updateUser()
      props.onSubmit(data.email)
      setLoading(false)
      // })
    } catch (err: any) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
  }

  const formik = useFormik<IFormData>({
    initialValues: {
      moneyChange: null,
      needMoneyChange: true,
      email: ''
    },
    onSubmit: submit
  })

  return (

    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <InputField
        name='email'
        styleType={'cashForm'}
        color='darkPurple'
        placeholder='Введите email'
        validate={Validator.combine([Validator.required, Validator.email])}
        />
        <Spacer basis={20}/>
        <PaymentButton onClick={() => formik.submitForm()} loading={loading}/>
      </Form>


    </FormikProvider>
  )
}
