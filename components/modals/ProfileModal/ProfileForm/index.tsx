import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import { useAppContext } from 'context/state'
import { SnackbarType } from 'types/enums'
import InputField from 'components/fields/InputField'
import RadioListField from 'components/fields/RadioListField'
import DateField from 'components/fields/DateField'
import Button from 'components/ui/Button'
import UserRepository from 'data/repositories/UserRepository'
import { Gender } from 'data/enum/Gender'


interface Props {

}

export default function ProfileForm(props: Props) {

  const appContext = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)



  const submit = async (data: { name: string, gender: Gender, birthday: string }) => {
    setLoading(true)
    try {
      await UserRepository.updateUserById(+appContext.user.id, data)
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
      name: appContext.user.name ?? '',
      gender: appContext.user.gender ?? null,
      birthday: appContext.user.birthday ?? ''
    },
    onSubmit: submit
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <div className={styles.fields}>
          <div className={styles.phone}>
            <div className={styles.label}>
              Ваш номер телефона
            </div>
            <div className={styles.field}>
              <div className={styles.number}>
                {appContext.user.phone}
              </div>
            </div>
          </div>
          <InputField
            label='Ваше имя'
            name='name'
            styleType='profile'
            color='white'
            labelType='top'
          />
          <RadioListField
            rootClass={styles.radio}
            name='gender'
            label='Ваш пол'
            options={[{ label: 'Мужчина', value: 'male' }, { label: 'Женщина', value: 'female' }]} flex />
          <DateField
            name='birthday'
            label='Дата рождения'
            visibleYearSelector={true}
            styleType='profile'
            iconName='field_date'
            className={styles.date}
          />
        </div>
        <Button type='submit' className={styles.btn} styleType='filledGreen' font='semibold16'>
          Сохранить
        </Button>
      </Form>
    </FormikProvider>
  )
}
