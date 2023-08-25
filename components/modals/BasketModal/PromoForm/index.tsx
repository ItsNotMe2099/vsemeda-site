import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import InputField from 'components/fields/InputField'
import Button from 'components/ui/Button'
import { useCartContext } from 'context/cart_state'
import classNames from 'classnames'
import { useState } from 'react'
import PromoSlider from 'components/for_pages/Common/PromoSlider'
import {RequestError} from 'types/types'
import {SnackbarType} from 'types/enums'
import {useAppContext} from 'context/state'


interface Props {
  onSubmit?: () => void
  className?: string
}

export default function PromoForm(props: Props) {
  const appContext = useAppContext()
  const cartContext = useCartContext()

  const [loading, setLoading] = useState(false)
  const submit = async (data: { code: string }) => {
    setLoading(true)
    try {
      cartContext.updatePromoCode(data)
      formik.resetForm()
    } catch (err: any) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    onSubmit: submit
  })

  const [promo, setPromo] = useState<boolean>(false)

  return (<>
    <div className={classNames(styles.discount, {[styles.active]: promo})}>
      <div className={styles.text}>
        Активная скидка:
      </div>
      <div className={styles.promo} onClick={() => !promo ? setPromo(true) : null}>
        Есть промокод?
      </div>
    </div>

    {promo &&    <FormikProvider value={formik}>
      <Form className={classNames(styles.root, props.className)}>
        <InputField
          className={styles.input}
          name='code'
          styleType={'promo'}
          color='white'
          disabled={loading}
          placeholder='Введите промокод' />
        <Button type='submit' className={styles.btn} font='semibold16' styleType='filledGreen' spinner={loading}>
          Применить
        </Button>
      </Form>
    </FormikProvider>}
    {cartContext.promos&&cartContext.promos.length > 0&&
      <PromoSlider promos={cartContext.promos}/>
    }
  </>)
}
