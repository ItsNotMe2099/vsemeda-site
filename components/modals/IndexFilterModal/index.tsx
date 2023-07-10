import styles from './index.module.scss'
import {colors} from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import BackBtn from 'components/ui/BackBtn'
import {useAppContext} from 'context/state'
import ModalHeader from 'components/layout/Modal/ModalHeader'
import ModalBody from 'components/layout/Modal/ModalBody'
import ModalFooter from 'components/layout/Modal/ModalFooter'
import {FormikProvider, Form, useFormik} from 'formik'
import {RequestError} from 'types/types'
import {SnackbarType} from 'types/enums'
import {useState} from 'react'
import {PriceRating} from 'data/enum/PriceRating'
import {PaymentMethod} from 'data/enum/PaymentMethod'
import {IndexFilterModalArguments} from 'types/modal_arguments'
import Button from 'components/ui/Button'
import CheckboxListField from 'components/fields/CheckboxListField'
import RadioListField from 'components/fields/RadioListField'
import {IndexFilterFormData} from 'types/form_data/IndexFilterFormData'

export interface IFormData {

}

interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

export default function IndexFilterModal(props: Props) {
  const appContext = useAppContext()
  const [loading, setLoading] = useState(false)
  const args = appContext.modalArguments as IndexFilterModalArguments
  const handleCloseClick = () => {
    props.onRequestClose()
  }


  const submit = async (data: IndexFilterFormData) => {
    try {
      setLoading(true)
      await args.onSubmit(data)
      setLoading(false)
    } catch (err: any) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setLoading(false)
  }
  const handleClear = () => {
    args.onClear()
  }
  const formik = useFormik<IndexFilterFormData>({
    initialValues: {
      priceRatings: [],
      paymentMethods: [],
      categories: []
    },
    onSubmit: submit
  })
  const header = (
    <div className={styles.header}>
      <div className={styles.title}>
        Фильтр
      </div>
      <div className={styles.close}>
        <BackBtn bgColor='white' onClick={handleCloseClick}/>
      </div>
    </div>
  )
  const body = (
    <div className={styles.bodyWrapper}>
      <RadioListField<number> label={'Время доставки'} options={[{label: '15', value: 15}, {label: '30', value: 30}, {
        label: '45',
        value: 45
      }, {label: '60', value: 60}, {label: '90', value: 90}]} name={'deliveryTime'}/>
      <CheckboxListField<PriceRating> label={'Стоимость'} options={[{label: '₽', value: PriceRating.Cheap}, {
        label: '₽₽',
        value: PriceRating.Average
      }, {label: '₽₽₽', value: PriceRating.Expensive}]} name={'priceRatings'}/>
      <CheckboxListField<PaymentMethod> label={'Метод оплаты'} options={[{
        label: 'Картой онлайн',
        value: PaymentMethod.CardOnline
      }, {label: 'Картой курьеру', value: PaymentMethod.CardCourier}, {label: 'Наличными', value: PaymentMethod.Cash}]}
                                     name={'paymentMethods'}/>
      <CheckboxListField<number> label={'Кухня и типы блюд'} grid={2}
                              options={args.categories.map(i => ({label: i.name, value: i.id}))}
                              name={'categories'}/>
    </div>
  )

  const footer = (<div className={styles.footer}>
    <Button type={'button'} onClick={() => handleClear()} font='semibold16' styleType='filledGreen'>Очистить
      фильтр</Button>
    <Button type={'submit'}  spinner={loading} font='semibold16' styleType='filledGreen'>Сохранить</Button>
  </div>)

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
          {appContext.isMobile && <ModalHeader>{header}</ModalHeader>}
          <ModalBody fixed>{body}</ModalBody>
          <ModalFooter fixed className={styles.footer}>{footer}</ModalFooter>
        </ModalLayout>
      </Form>
    </FormikProvider>
  )
}

