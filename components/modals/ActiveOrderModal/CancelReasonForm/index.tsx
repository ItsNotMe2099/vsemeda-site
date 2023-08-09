import styles from './index.module.scss'
import RadioListField from 'components/fields/RadioListField'
import { useAppContext } from 'context/state'
import { OrderCancelReason } from 'data/enum/OrderState'
import OrderRepository from 'data/repositories/OrderRepository'
import { Form, FormikProvider, useFormik } from 'formik'
import { ModalType, SnackbarType } from 'types/enums'
import { colors } from 'styles/variables'
import ChevronSvg from 'components/svg/ChevronSvg'
import { useOrderContext } from 'context/order_state'

interface Props {
  id: string,
  isBottomSheet: boolean,
  onBackClick: () => void
  image: JSX.Element
}

export default function CancelReasonForm(props: Props) {

  const appContext = useAppContext()
  const {setIsOrderActive} = useOrderContext()

  const submit = (data: { cancelReason: OrderCancelReason|undefined }) => {
   
    try {
      if(data.cancelReason === undefined) {
        throw Error('Укажите причину отмены')
      }

      OrderRepository.cancel(props.id, data)
      .then(res => {

        props.onBackClick()
        
        props.isBottomSheet
        ?appContext.hideBottomSheet()
        :appContext.hideModal()
        
        props.isBottomSheet
        ?appContext.showBottomSheet(ModalType.ActiveOrder, res)
        : appContext.showModal(ModalType.ActiveOrder, res)

        setIsOrderActive(false)

      })
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
      cancelReason: undefined,
    },
    onSubmit: submit
  })

  return (
    <div className={styles.root}>
      <div className={styles.header} onClick={props.onBackClick}>
        <ChevronSvg className={styles.leftChevron} color={colors.black}/>
        <p className={styles.headerText}>
          Укажите причину отмены
        </p>
        {props.image}
      </div>
      <FormikProvider value={formik}>
        <Form>
          <RadioListField 
            rootClass={styles.radios}
            itemCircleClassname={styles.radio__circle}
            itemLabelClassName={styles.radio__label}
            activeItemClassName={styles.radio__active}
            name='cancelReason'
            options={[
              { label: 'Я хочу изменить заказ', value: OrderCancelReason.ChangeOrder }, 
              { label: 'Я передумал', value: OrderCancelReason.ChangeMyMind },
              { label: 'Другая причина', value: OrderCancelReason.Other },
            ]}
          />
          <button type='submit' className={styles.button}>Отменить заказ</button>
        </Form>
      </FormikProvider>
    </div>
  )

  
}