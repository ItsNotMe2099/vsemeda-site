import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { ICartUpdateRequestData } from 'data/interfaces/ICartUpdateRequestData'


interface Props {
 
}

export default function CashForm(props: Props) {

  const submit = async (data: ICartUpdateRequestData) => {
    
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
        
      </Form>
    </FormikProvider>
  )
}
