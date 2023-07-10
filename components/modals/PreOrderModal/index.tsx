import styles from './index.module.scss'
import {colors} from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import {useCartContext} from 'context/cart_state'
import {useAppContext} from 'context/state'
import ModalHeader from 'components/layout/Modal/ModalHeader'
import ModalBody from 'components/layout/Modal/ModalBody'
import ModalFooter from 'components/layout/Modal/ModalFooter'
import {useMemo, useState} from 'react'
import {IOption, RequestError} from 'types/types'
import {format, isSameDay, isTomorrow} from 'date-fns'
import {SnackbarType} from 'types/enums'
import {Form, FormikProvider, useFormik} from 'formik'
import Spacer from 'components/ui/Spacer'
import TabsField from 'components/fields/TabsField'
import RadioListField from 'components/fields/RadioListField'
import Button from 'components/ui/Button'
import Formatter from 'utils/formatter'


interface IFormData {
  day: number,
  time: string
}

interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

export default function PreOrderModal(props: Props) {

  const handleCloseClick = () => {
    props.onRequestClose()
  }

  const cartContext = useCartContext()
  const appContext = useAppContext()
  const [loading, setLoading] = useState(false)

  const submit = async (data: IFormData) => {
    try {
      setLoading(true)
      if (data.time === 'now') {
        await cartContext.update({isPreOrder: false, preOrderAt: null})
      } else {
        await cartContext.update({isPreOrder: true, preOrderAt: data.time})
      }
      await appContext.hideModal()
    } catch (err: any) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setLoading(false)
  }

  const formik = useFormik<IFormData>({
    initialValues: {
      day: 0,
      time: null
    },
    onSubmit: submit
  })
  const optionsDays = useMemo<IOption<number>[]>(() => {
    return cartContext.cart.availableTimes.map((i, key) => ({
      label: isSameDay(new Date(), new Date(i[0])) ? 'Сегодня' : isTomorrow(new Date(i[0])) ? 'Завтра' : format(new Date(i[0]), 'dd.MM.yyyy'),
      value: key
    }))
  }, [cartContext.unit?.orderSettings])
  const optionsTimes = useMemo<IOption<string>[]>(() => {
    return cartContext.cart.availableTimes[formik.values.day].map((i, key) => ({
      label: format(new Date(i), 'HH:mm'),
      value: i
    }))
  }, [formik.values.day])
  const header = (
    <div className={styles.header}>
      <div className={styles.title}>
        Время доставки
      </div>
      <Spacer basis={15}/>
      <TabsField name={'day'} options={optionsDays}/>

    </div>

  )
  const body = (<>
      <RadioListField
        rootClass={styles.radio}
        name='time'
        label='Время'
        options={[...(formik.values.day === 0 ? [{
          label: `Сегодня ${Formatter.formatDeliveryTime({minDeliveryTime: cartContext.unit?.deliveryTime})}`,
          value: 'now'
        }] : []), ...optionsTimes]} grid={1}/>
      <Spacer basis={20}/>
    </>
  )
  const footer = <Button onClick={() => formik.submitForm()} spinner={loading} font='semibold16'
                         styleType='filledGreen'>Выбрать</Button>

  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.grey2}>
        <BottomSheetBody>{body}</BottomSheetBody>
      </BottomSheetLayout>
    )
  }


  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <ModalLayout fixed className={styles.modalLayout}>
          <ModalHeader>{header}</ModalHeader>
          <ModalBody fixed>{body}</ModalBody>
          <ModalFooter fixed className={styles.footer}>{footer}</ModalFooter>
        </ModalLayout>
      </Form>
    </FormikProvider>
  )
}

