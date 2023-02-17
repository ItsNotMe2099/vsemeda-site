import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import { useAppContext } from 'context/state'
import { SnackbarType } from 'types/enums'
import InputField from 'components/fields/InputField'
import RadioListField from 'components/fields/RadioListField'
import DateField from 'components/fields/DateField'


interface Props {

}

export default function ProfileForm(props: Props) {

  const appContext = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)



  const submit = async () => {
    setLoading(true)
    try {

    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    }
    setLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      gender: '',
      birthday: ''
    },
    onSubmit: submit
  })

  return (
    <FormikProvider value={formik}>

      <Form className={styles.root}>
        <InputField
          label='Ваше имя'
          name='name'
          styleType='profile'
          color='white'
        />
        <RadioListField
          rootClass={styles.radio}
          name='gender'
          label='Ваш пол'
          options={[{ label: 'Мужчина', value: 'male' }, { label: 'Женщина', value: 'female' }]} flex />
        <DateField
          name='birthday'
          label='Дата рождения'
          styleType='profile'
          className={styles.date}
        />
      </Form>
    </FormikProvider>
  )
}
