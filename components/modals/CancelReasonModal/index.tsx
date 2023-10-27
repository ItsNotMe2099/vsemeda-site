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
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import { IOrder } from 'data/interfaces/IOrder'
import Image from 'next/image'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import ModalBody from 'components/layout/Modal/ModalBody'

interface Props {
  isBottomSheetPart?: boolean,
  onBackClick: () => void
  isBottomSheet?: boolean
  isModal?: boolean
}

export default function CancelReasonForm(props: Props) {

  const appContext = useAppContext()
  const {refreshOrders} = useOrderContext()
  // const item = appContext.modalArguments as IOrder
  const item = appContext.modalArguments as IOrder

  const submit = (data: { cancelReason: OrderCancelReason|undefined }) => {
   
    try {
      if(data.cancelReason === undefined) {
        throw Error('Укажите причину отмены')
      }

      OrderRepository.cancel(item.id, data)
      .then(res => {
        props.onBackClick()
        if(props.isBottomSheetPart || props.isBottomSheet) {
          appContext.hideBottomSheet()
          appContext.hideModal()
          appContext.showBottomSheet(ModalType.ActiveOrder, res)
        } 
        else {
          appContext.hideModal()
          appContext.showModal(ModalType.ActiveOrder, res)
        }
        refreshOrders()
      })
    }
    catch (error: any) {
      debugger
      let errorMessage = error.message
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

  const body = (
    <div className={styles.root}>
    <div className={styles.header} onClick={props.onBackClick}>
      <ChevronSvg className={styles.leftChevron} color={colors.black}/>
      <p className={styles.headerText}>
        Укажите причину отмены
      </p>
      <Image src={'/images/orderStatusIcon/3.0x/payment_error.png'} alt='cancel' width={45} height={45}/>
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

  if(props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.green} backgroundColor={colors.green + ' url(/images/mobileBg/mobileBgLowOpacity.png)'}>
        <BottomSheetBody>
          {body}
        </BottomSheetBody>
      </BottomSheetLayout>
  )}
  else if(props.isModal) {
    return (
      <ModalLayout backgroundColor={colors.green + ' url(/images/mobileBg/mobileBgLowOpacity.png)'}>
      <ModalBody>
        {body}
      </ModalBody>
    </ModalLayout>
  )}
  else {
    return body
  }
}