import styles from './index.module.scss'
import { colors } from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import BackBtn from 'components/ui/BackBtn'
import { useCartContext } from 'context/cart_state'
import CartLine from 'components/modals/BasketModal/CartLine'
import { useAppContext } from 'context/state'
import PaymentSelect from 'components/modals/BasketModal/PaymentSelect'
import PromoForm from 'components/modals/BasketModal/PromoForm'
import ModalHeader from 'components/layout/Modal/ModalHeader'
import ModalBody from 'components/layout/Modal/ModalBody'
import ModalFooter from 'components/layout/Modal/ModalFooter'
import BasketAddressDetails from 'components/modals/BasketModal/BasketAddressDetails'
import BasketReceipt from 'components/modals/BasketModal/BasketReceipt'
import BasketEmpty from 'components/modals/BasketModal/BasketEmpty'
import { useEffect, useState } from 'react'
import { ModalType } from 'types/enums'


interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

export default function BasketModal(props: Props) {

  const handleCloseClick = () => {
    props.onRequestClose()
  }

  const cartContext = useCartContext()
  const appContext = useAppContext()

  const [iframeSrc, setIframeSrc] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const header = (
  <div className={styles.close}>
    <BackBtn bgColor='white' onClick={handleCloseClick} />
  </div>
  )

  useEffect(()=>{
    
    if(iframeSrc) {
      appContext.showModal(ModalType.IFrame, iframeSrc)
    }
  }, [iframeSrc])

  cartContext.cart
  

  const body = ( cartContext.isEmpty 
    ? <BasketEmpty/>
    : (<>
        <div className={styles.content}>
          <div className={styles.title}>Ваш заказ 🤝</div>
          <BasketAddressDetails/>
          <BasketReceipt  />
        </div>
        <div className={styles.list}>
          {!cartContext.cart?.lines.length ? <div className={styles.empty}>Корзина пуста</div> : null}
          {cartContext.cart?.lines.map(i =>
            <CartLine item={i} key={i.id} quantity={cartContext.groupingIdQuantityMap[i.groupingId]}/>
          )}
        </div>
        {cartContext.cart?.lines.length ? <PromoForm className={styles.promo} /> : null}
      </>)
  )

  const footer = !cartContext.isEmpty && (<PaymentSelect setSrc={(s: string) => setIframeSrc(s)} setLoading={(b: boolean)=>{setIsLoading(b)}}/>)

  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.grey2}>
        <BottomSheetBody>{body}</BottomSheetBody>
      </BottomSheetLayout>
    )
  }


  return (
  <>
    {!isLoading &&
      <ModalLayout fixed className={styles.modalLayout}>
        {appContext.isMobile && <ModalHeader>{header}</ModalHeader>}
        <ModalBody fixed>{body}</ModalBody>
        <ModalFooter fixed className={styles.footer}>{footer}</ModalFooter>
      </ModalLayout>
    }
  </>
  )
}

