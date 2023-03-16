import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { ICartUpdateRequestData } from 'data/interfaces/ICartUpdateRequestData'
import InputField from 'components/fields/InputField'
import Button from 'components/ui/Button'
import { useCartContext } from 'context/cart_state'
import { useAppContext } from 'context/state'
import { SnackbarType } from 'types/enums'


interface Props {
  onSubmit: () => void
}

export default function CashForm(props: Props) {

  const cartContext = useCartContext()
  const appContext = useAppContext()

  const submit = async (data: ICartUpdateRequestData) => {
    try {
      await cartContext.update({ ...data, moneyChange: +data.moneyChange })
      props.onSubmit()
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    }
  }

  const formik = useFormik({
    initialValues: {
      moneyChange: null
    },
    onSubmit: submit
  })

  console.log('VALUES!!!!', formik.values)

  return (

    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <InputField
          className={styles.input}
          name='moneyChange'
          styleType={'cashForm'}
          color='darkPurple'
          placeholder='Введите сумму'
          isNumbersOnly />
        <Button type='submit' className={styles.btn} font='semibold16' styleType='outlinedWhite'>
          OK
        </Button>
      </Form>
      <div className={styles.change}>
        Сдача:
        <span>
          {formik.values.moneyChange > cartContext.cart?.total ? formik.values.moneyChange - cartContext.cart?.total : 0} руб.
        </span>
      </div>
    </FormikProvider>
  )
}
