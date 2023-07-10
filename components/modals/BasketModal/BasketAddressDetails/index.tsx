import styles from './index.module.scss'
import * as React from 'react'
import {useMemo} from 'react'
import {useCartContext} from 'context/cart_state'
import LocationSvg from 'components/svg/LocationSvg'
import {useAppContext} from 'context/state'
import Formatter from 'utils/formatter'
import {Formik} from 'formik'
import SwitchField from 'components/fields/SwitchField'
import {colors} from 'styles/variables'
import ChevronSvg from 'components/svg/ChevronSvg'
import {ModalType} from 'types/enums'

interface Props {

}

export default function BasketAddressDetails(props: Props) {
  const appContext = useAppContext()
  const cartContext = useCartContext()
  const deliveryTimeStr = useMemo(() => {
    if(cartContext.cart.isPreOrder){
      return Formatter.formatPreOrderTime(cartContext.cart.preOrderAt)
    }else{
      return Formatter.formatDeliveryTime({minDeliveryTime: cartContext.unit?.deliveryTime})
    }

  }, [cartContext?.cart?.preOrderAt, cartContext.cart?.unit?.deliveryTime, cartContext.cart?.isPreOrder])
  return (
    <div className={styles.root}>
      <div className={styles.ofDeliver}>
        Адрес доставки:
      </div>
      <div className={styles.current}>
        <div>{appContext.currentAddress.address}</div><LocationSvg color='#828282' />
      </div>
      <div className={styles.separator}/>
      <Formik initialValues={{}} onSubmit={() => null}>
        <SwitchField className={styles.contactLessField} name={'isContactLessDelivery'} label={'Бесконтактная доставка'} offColor={colors.grey5} onColor={colors.grey5} offHandleColor={colors.dark2} fluid/>
      </Formik>
      <div className={styles.separator}/>
      <div className={styles.toDelivery} onClick={() => appContext.showModal(ModalType.PreOrderForm)}>
        <div className={styles.text}>Время доставки:</div>
        <div className={styles.time}>{deliveryTimeStr}</div>
        <ChevronSvg className={styles.chevron} color={colors.dark2} />
      </div>
    </div>
  )
}
