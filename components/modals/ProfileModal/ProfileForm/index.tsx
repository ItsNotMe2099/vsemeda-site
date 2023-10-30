import styles from './index.module.scss'

import { Form, FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import { useAppContext } from 'context/state'
import { ModalType, SnackbarType } from 'types/enums'
import InputField from 'components/fields/InputField'
import RadioListField from 'components/fields/RadioListField'
import DateField from 'components/fields/DateField'
import Button from 'components/ui/Button'
import UserRepository from 'data/repositories/UserRepository'
import { Gender } from 'data/enum/Gender'
import Validator from 'utils/Validator'
import TrashBasketSvg from 'components/svg/TrashBasketSvg'
import { colors } from 'styles/variables'
import { ConfirmModalArguments } from 'types/modal_arguments'
import { useCartContext } from 'context/cart_state'


export default function ProfileForm() {

  const appContext = useAppContext()
  const cartContext = useCartContext()

  const [loading, setLoading] = useState<boolean>(false)

  const submit = async (data: { name: string, gender: Gender, birthday: string, email: string }) => {
    if(!data.email)  {
      delete data.email
    }
    setLoading(true)
    try {
      await UserRepository.updateUser(data)
      appContext.updateUser()
      appContext.showSnackbar('Изменения сохранены', SnackbarType.success)
    }
    catch (error: any) {
      let errorMessage = error.toString()
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
      birthday: appContext.user.birthday ?? null,
      email: appContext.user.email?? null
    },
    onSubmit: submit
  })

  const removeUser = () => {
    appContext.showModal(ModalType.Confirm, {
      onConfirm: ()=> {
        cartContext.clear()
        appContext.deleteUser()
        appContext.hideModal()
      },
      text: 'Вы уверены, что хотите удалить аккаунт?', 
      confirm: 'Принять',
      cancel: 'Отмена'
    } as ConfirmModalArguments)
  }

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
          <InputField
            label='E-mail'
            name='email'
            styleType='profile'
            color='white'
            labelType='top'
            validate={Validator.email}
          />
          <RadioListField
            rootClass={styles.radio}
            name='gender'
            label='Ваш пол'
            options={[{ label: 'Мужчина', value: 'male' }, { label: 'Женщина', value: 'female' }]} flex 
          />
          <DateField
            name='birthday'
            label='Дата рождения'
            visibleYearSelector={true}
            styleType='profile'
            iconName='field_date'
            className={styles.date}
          />
          
        </div>
        <Button type='submit' spinner={loading} className={styles.btn} styleType='filledGreen' font='semibold16'>
          Сохранить
        </Button>
        <p className={styles.deleteAcc} onClick={removeUser}><TrashBasketSvg color={colors.white}/> Удалить аккаунт</p>
      </Form>
    </FormikProvider>
  )
}
