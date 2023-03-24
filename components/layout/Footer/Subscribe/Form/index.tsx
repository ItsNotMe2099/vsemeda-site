import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import InputField from 'components/fields/InputField'
import Button from 'components/ui/Button'
import ArrowSubscribeSvg from 'components/svg/ArrowSubscribeSvg'


interface Props {
  onSubmit: (data: { email: string }) => void
}

export default function SubscribeForm(props: Props) {

  const handleSubmit = (data: { email: string }) => {
    props.onSubmit(data)
  }

  const initialValues = {
    //name: '',
    email: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <InputField placeholder='Ваш мейл' styleType='subscribe' color='white' name='email' />
        <Button className={styles.btn} styleType='filledGreen'>
          <ArrowSubscribeSvg />
        </Button>
      </Form>
    </FormikProvider>
  )
}
