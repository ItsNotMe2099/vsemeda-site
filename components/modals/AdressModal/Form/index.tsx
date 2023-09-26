import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import { IUserAddress } from 'data/interfaces/IUserAddress'
import InputField from 'components/fields/InputField'
import { Form, FormikProvider, useFormik } from 'formik'
import { DeepPartial } from 'types/types'
import BackBtn from 'components/ui/BackBtn'
import Button from 'components/ui/Button'
import TextAreaField from 'components/fields/TextAreaField'
import { useAddressContext } from 'context/address_state'
import { useEffect, useState } from 'react'
import { ModalType, SnackbarType } from 'types/enums'
import TrashBasketSvg from 'components/svg/TrashBasketSvg'

export interface AddressFormModalArguments {
  address: IUserAddress
}

interface Props {
  initialAddress?: IUserAddress
  editedAddressString?: string
  isMobile?: boolean
}

export default function AddressForm(props: Props) {
  const appContext = useAppContext()
  const addressContext = useAddressContext()
  const [loading, setLoading] = useState(false)
  const args = appContext.modalArguments as AddressFormModalArguments

  const submit = async (data: DeepPartial<IUserAddress>) => {
    
    
    setLoading(true)
    try {
      const submitData: DeepPartial<IUserAddress> = {
        ...props.initialAddress,
        ...data,
        address: props.editedAddressString||data.address||props.initialAddress.address

      }
      if (props.initialAddress?.id) {
        addressContext.update(props.initialAddress.id, submitData)
        appContext.hideModal()
        props.isMobile?appContext.showBottomSheet(ModalType.AddressList):appContext.showModal(ModalType.AddressList)
      } else {
        addressContext.create(submitData)
        appContext.hideModal()
        // props.isMobile?appContext.showBottomSheet(ModalType.AddressList):appContext.showModal(ModalType.AddressList)
      }
      addressContext.refreshAddresses()
    } catch (e) {
      appContext.showSnackbar(e.toString(), SnackbarType.error)
    }
    setLoading(false)
  }

  useEffect(()=>{
    props.editedAddressString
    
  }, [props.editedAddressString])

  const handleBack = () => {
    if (args?.address) {
      appContext.showModal(ModalType.AddressList)
    } else {
      appContext.showModal(ModalType.AddressList)
    }
  }

  const formik = useFormik<DeepPartial<IUserAddress>>({
    initialValues: {
      ...props.initialAddress
    }, onSubmit: submit
  })

  const formatAddressDetails = () => {
    const labels = ['Кв', 'Этаж', 'Подьезд', 'Домофон']
    const values = [formik.values.apartment, formik.values.floor, formik.values.entrance, formik.values.intercomCode]
    return values.map((i, key) => i ? `${labels[key]} ${i}` : null).filter(i => !!i).join(', ')
  }

  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <div className={styles.header}>
          <BackBtn onClick={handleBack} bgColor={'white'} />
          <div className={styles.title}>Сохраните адрес доставки</div>
        </div>
        <div className={styles.body}>
          <div className={styles.mainFields}>
            <div className={styles.row}>
              <div className={styles.columns}>
                <InputField maxLength={7} className={styles.input} placeholder='Подъезд' styleType={'default'} name={'entrance'} label={'Подьезд'} color={'purple'} />
              </div>
              <div className={styles.columns}>
                <InputField maxLength={7} className={styles.input} placeholder='Код домофона' styleType={'default'} name={'intercomCode'} label={'Домофон'} color={'purple'} />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.columns}>
                <InputField maxLength={7} className={styles.input} placeholder='Кв/офис' styleType={'default'} name={'apartment'} label={'Кв/Офис'} color={'purple'} />
              </div>

              <div className={styles.columns}>
                <InputField maxLength={7} className={styles.input} placeholder='Этаж' styleType={'default'} name={'floor'} label={'Этаж'} color={'purple'} />
              </div>
            </div>
          </div>

          <div className={styles.line} />
          <TextAreaField areaClassname={styles.textarea} name={'comment'} maxlength={120} label={'Коммментарий'} color={'purple'} />
          <div className={styles.addressDetails}>
            {props.initialAddress && <div className={styles.address}>
              <div className={styles.addressLabel}>Адрес Доставки:</div>
              <div className={styles.addressValue}>{props.editedAddressString||props.initialAddress?.address}</div>
            </div>}
            <div className={styles.address}>
              <div className={styles.addressLabel}>Уточнения:</div>
              <div className={styles.addressValue}>{formatAddressDetails()}</div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button className={styles.button} styleType={'filledGreen'} fluid type='button' onClick={formik.submitForm} spinner={loading}>Сохранить</Button>
          {props.initialAddress?.id &&
            <Button className={styles.trash} onClick={()=>addressContext.delete(props.initialAddress?.id)} type='button' styleType={'icon'}><><TrashBasketSvg/></></Button>
          }
        </div>

      </Form>
    </FormikProvider>)
}
