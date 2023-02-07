import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {IUserAddress} from 'data/interfaces/IUserAddress'
import InputField from 'components/fields/InputField'
import {Form, FormikProvider, useFormik} from 'formik'
import {DeepPartial} from 'types/types'
import BackBtn from 'components/ui/BackBtn'
import Button from 'components/ui/Button'
import {GeoObject} from 'data/interfaces/IYandexGeocoder'
import Converter from 'utils/converter'
import TextAreaField from 'components/fields/TextAreaField'

export interface AddressFormModalArguments {
  address: IUserAddress
}

interface Props {
  initialGeoObject?: GeoObject
}

export default function AddressForm(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as AddressFormModalArguments
  const submit = (data: DeepPartial<IUserAddress>) => {

  }
  const handleBack = () => {

  }
  const formik = useFormik<DeepPartial<IUserAddress>>({
    initialValues: {

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
          <BackBtn onClick={handleBack} bgColor={'white'}  />
          <div className={styles.title}>Сохраните адрес доставки</div>
        </div>
        <div className={styles.body}>
        <div className={styles.mainFields}>
          <div className={styles.row}>
            <div className={styles.columns}>
              <InputField styleType={'default'} name={'entrance'} label={'Подьезд'} color={'purple'}/>
            </div>
            <div className={styles.columns}>
              <InputField styleType={'default'} name={'intercomCode'} label={'Домофон'} color={'purple'}/>
            </div>
          </div>

          <div className={styles.row}>
          <div className={styles.columns}>
            <InputField styleType={'default'} name={'apartment'} label={'Кв/Офис'} color={'purple'}/>
          </div>

          <div className={styles.columns}>
            <InputField styleType={'default'} name={'floor'} label={'Этаж'} color={'purple'}/>
          </div>
          </div>
        </div>

          <div className={styles.line}/>
          <TextAreaField name={'comment'} label={'Коммментарий'} color={'purple'}/>
          <div className={styles.addressDetails}>
          {props.initialGeoObject &&  <div className={styles.address}>
            <div className={styles.addressLabel}>Адрес Доставки:</div>
            <div className={styles.addressValue}>{Converter.convertGeoObjectToString(props.initialGeoObject)}</div>
          </div>}
          <div className={styles.address}>
            <div className={styles.addressLabel}>Уточнения:</div>
            <div className={styles.addressValue}>{formatAddressDetails()}</div>
          </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button styleType={'filledGreen'} fluid type={'submit'}>Сохранить</Button>
        </div>

      </Form>
    </FormikProvider>)
}
