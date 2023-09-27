import styles from './index.module.scss'
import {colors} from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import BackBtn from 'components/ui/BackBtn'
import {useAppContext} from 'context/state'
// import ModalHeader from 'components/layout/Modal/ModalHeader'
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
import BottomSheetFooter from 'components/layout/BottomSheet/BottomSheetFooter'
import { useResize } from 'components/hooks/useResize'
import BottomSheetHeader from 'components/layout/BottomSheet/BottomSheetHeader'
import classNames from 'classnames'
import CloseCircleSvg from 'components/svg/CloseCircle'
import IconButton from 'components/ui/IconButton'
import { useIndexPageContext } from 'context/index_page_state'

export interface IFormData {

}

interface Props {
  isBottomSheet?: boolean
  onRequestClose?: () => void
}

export default function IndexFilterModal(props: Props) {
  const appContext = useAppContext()
  const indexPageContext = useIndexPageContext()
  const [loading, setLoading] = useState(false)
  const args = appContext.modalArguments as IndexFilterModalArguments
  const {isPhoneWidth} = useResize()
  const handleCloseClick = () => {
    props.onRequestClose()
  }

  debugger


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
      priceRatings: indexPageContext.filter.priceRatings||[],
      paymentMethods: indexPageContext.filter.paymentMethods||[],
      categories: indexPageContext.filter.categories||[]
    },
    onSubmit: submit
  })
  const header = (
    <div className={styles.header}>
      <div className={styles.title}>
        Фильтрация
      </div>
        {/* <div className={styles.close}> */}
        {!isPhoneWidth && 
        <IconButton onClick={handleCloseClick} className={styles.closeButton} bgColor={'transparent'} ><CloseCircleSvg/></IconButton>
        ||
        <BackBtn bgColor='white' onClick={handleCloseClick}/>
        }
        {/* </div> */}
    </div>
  )

  const body = (
    <div className={styles.bodyWrapper}>
      
      <RadioListField<number> 
        wrapperClassName={styles.radioWrapper}
        itemClassName={styles.radioItem}
        activeItemClassName={styles.radioItemActive}
        itemCircleClassname={styles.radioCircle}
        itemLabelClassName={styles.radioLabel}
        labelClassName={styles.radioLabel}
        label={'Время доставки'} 
        name={'deliveryTime'}
        options={[
          {label: '15', value: 15}, 
          {label: '30', value: 30}, 
          {label: '45', value: 45 }, 
          {label: '60', value: 60}, 
          {label: '90', value: 90}]} 
      />
      <CheckboxListField<PriceRating> 
        wrapperClassName={styles.checkboxWrapper}
        itemClassName={classNames(styles.checkboxItem, styles.third)}
        itemLabelClassName={styles.radioLabel}
        labelClassName={styles.radioLabel}
        activeClassName={styles.checkboxActive}
        circleClassName={styles.radioCircle}
        label={'Стоимость'} 
        name={'priceRatings'}
        options={[
          {label: '₽', value: PriceRating.Cheap}, 
          {label: '₽₽', value: PriceRating.Average}, 
          {label: '₽₽₽', value: PriceRating.Expensive}]} 
      />
      <CheckboxListField<PaymentMethod> 
        wrapperClassName={styles.checkboxWrapper}
        itemClassName={styles.checkboxItem}
        itemLabelClassName={styles.radioLabel}
        labelClassName={styles.radioLabel}
        activeClassName={styles.checkboxActive}
        circleClassName={styles.radioCircle}
        label={'Метод оплаты'} 
        name={'paymentMethods'}
        options={[
          {label: 'Картой онлайн', value: PaymentMethod.CardOnline}, 
          {label: 'Картой курьеру', value: PaymentMethod.CardCourier}, 
          {label: 'Наличными', value: PaymentMethod.Cash}]}
      />
      <CheckboxListField<number> 
        circleClassName={styles.radioCircle}
        itemClassName={styles.checkboxItem}
        itemLabelClassName={styles.radioLabel}
        labelClassName={styles.radioLabel}
        activeClassName={styles.checkboxActive}
        label={'Кухня и типы блюд'} 
        grid={2} 
        name={'categories'}
        options={args.categories.map(i => ({label: i.name, value: i.id}))}
      />
    </div>
  )

  const footer = (<>
    <Button className={styles.footerButton} type={'button'} onClick={() => handleClear()} font='semibold16' styleType='filledGreen'>Очистить</Button>
    <Button className={styles.footerButton} type={'submit'}  spinner={loading} font='semibold16' styleType='filledGreen'>Сохранить</Button>
  </>
  )

  if (props.isBottomSheet) {
    return (
      <FormikProvider value={formik}>
        <Form className={styles.root}>
          <BottomSheetLayout closeIconColor={colors.grey2} backgroundColor={colors.purple}>
            <BottomSheetHeader>{header}</BottomSheetHeader>
            <BottomSheetBody>{body}</BottomSheetBody>
            <BottomSheetFooter className={styles.sheetFooter}>{footer}</BottomSheetFooter>
          </BottomSheetLayout>
        </Form>
      </FormikProvider>
    )
  }


  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <ModalLayout fixed className={styles.modalLayout}>
          {header}
          <ModalBody fixed>{body}</ModalBody>
          <ModalFooter fixed className={styles.footer}>{footer}</ModalFooter>
        </ModalLayout>
      </Form>
    </FormikProvider>
  )
}

