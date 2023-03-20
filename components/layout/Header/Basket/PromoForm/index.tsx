import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import InputField from 'components/fields/InputField'
import Button from 'components/ui/Button'
import { useCartContext } from 'context/cart_state'
import classNames from 'classnames'
import { useState } from 'react'


interface Props {
  onSubmit?: () => void
  className?: string
}

export default function PromoForm(props: Props) {

  const cartContext = useCartContext()

  const submit = async (data: { code: string }) => {
    cartContext.updatePromocode(data)
    props.onSubmit ? props.onSubmit() : null
  }

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    onSubmit: submit
  })

  const [promo, setPromo] = useState<boolean>(false)

  console.log('VALUES!!!!', formik.values)

  return (

    <FormikProvider value={formik}>
      <div className={classNames(styles.discount, {[styles.active]: promo})}>
        <div className={styles.text}>
          Активная скидка:
        </div>
        <div className={styles.promo} onClick={() => !promo ? setPromo(true) : null}>
          Есть промокод?
        </div>
      </div>
      {promo ?
        <Form className={classNames(styles.root, props.className)}>
          <InputField
            className={styles.input}
            name='code'
            styleType={'promo'}
            color='white'
            placeholder='Введите промокод' />
          <Button type='submit' className={styles.btn} font='semibold16' styleType='filledGreen'>
            Применить
          </Button>
        </Form> : null}
    </FormikProvider>
  )
}
