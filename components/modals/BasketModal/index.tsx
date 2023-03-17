import styles from './index.module.scss'
import { colors } from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import BackBtn from 'components/ui/BackBtn'
import { useCartContext } from 'context/cart_state'
import CartLine from 'components/layout/Header/Basket/CartLine'
import { useAppContext } from 'context/state'
import LocationSvg from 'components/svg/LocationSvg'
import PaymentSelect from 'components/layout/Header/Basket/PaymentSelect'
import { StickyContainer } from 'react-sticky'


interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

const BasketModalInner = (props: Props) => {

  const handleCloseClick = () => {
    props.onRequestClose()
  }

  const cartContext = useCartContext()
  const appContext = useAppContext()


  const body = (
    <StickyContainer>
      <div className={styles.bodyWrapper}>
        <div className={styles.head}>
          Подтверждение заказа
        </div>
        <div className={styles.content}>
          <div className={styles.title}>Ваш заказ 🤝</div>
          <div className={styles.address}>
            <div className={styles.ofDeliver}>
              Адрес доставки:
            </div>
            <div className={styles.current}>
              <div>{appContext.currentAddress.address}</div><LocationSvg color='#828282' />
            </div>
            <div className={styles.toDelivery}>
              <div className={styles.text}>Время доставки:</div>
              <div className={styles.time}>45-60 мин</div>
            </div>
          </div>
          <div className={styles.list}>
            {!cartContext.cart?.lines.length ? <div className={styles.empty}>Корзина пуста</div> : null}
            {cartContext.cart?.lines.map((i, index) =>
              <CartLine item={i} key={i.id} />
            )}
          </div>
        </div>
        <PaymentSelect isSticky className={styles.footer}/>
      </div>
    </StickyContainer>
  )

  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.grey2}>
        <BottomSheetBody>{body}</BottomSheetBody>
      </BottomSheetLayout>
    )
  }

  return (
    <ModalLayout fixed className={styles.modalLayout}>
      <div className={styles.close}>
        <BackBtn bgColor='white' onClick={handleCloseClick} />
      </div>
      {body}
    </ModalLayout>
  )
}

export default function BasketModal(props: Props) {

  return (<>
    <BasketModalInner {...props} />
  </>)
}
