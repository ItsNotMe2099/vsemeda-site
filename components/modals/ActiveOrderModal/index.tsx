import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import { IOrder } from 'data/interfaces/IOrder'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import { breakpoints, colors } from 'styles/variables'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import classNames from 'classnames'
import CrossSvg from 'components/svg/CrossSvg'
import VisibleOnSize from 'components/visibility/VisibleOnSize'
import CancelSvg from 'components/svg/CancelSvg'
import { OrderStateButton } from 'data/enum/OrderState'
import RepeatSvg from 'components/svg/RepeatSvg'
import OrderRepository from 'data/repositories/OrderRepository'
import { useResize } from 'components/hooks/useResize'
import { getOrderColor, getOrderIcon, getOrderImage } from 'components/for_pages/index/ActiveOrder/ActiveOrderItem'




interface Props {
  onRequestClose?: () => void
  isBottomSheet?: boolean

}


export default function ActiveOrderModal(props: Props) {
  const appContext = useAppContext()
  const {isPhoneWidth} = useResize()

  const {item} = appContext.modalArguments as {item: IOrder}
  const orderType = getOrderIcon(item.stateDetails.icon)
  const style = getOrderColor(item.stateDetails.color)
  const image = (width: number, height: number) => {return getOrderImage(orderType, width, height)}

  const cancelHandler = () => {
    /* TODO: нарисовать действие отмены на 
    десктопе, потому что есть только для мобилки. 
    видимо должна быть еще одна модалка для подтверждения */
    OrderRepository.cancel(item.id)
    appContext.hideModal()
  }

  const payHandler = () => {
    OrderRepository.payById(item.id)
    .then(res => {
        appContext.hideModal()
        window.location.href = res.payUrl
    })
  }

  const cancelButton = (
    <button type='button' className={styles.cancelButton} onClick={cancelHandler}> 
        {<VisibleOnSize width={breakpoints.PhoneWidth}>
            <CancelSvg/>
        </VisibleOnSize>} 
        Отменить
    </button>
  )

  const payButton = (
    <button className={styles.payButton}  type='button' onClick={payHandler}>Оплатить</button>
  )


  const repeatButton = (
    <button type='button'>{<RepeatSvg/>}Повторить оплату</button>
  )
    
    
  const body = (
    <div className={styles.body} style={style}>  
        <VisibleOnSize width={breakpoints.PhoneWidth} minSize>
            <div className={styles.closeWrapper} onClick={props.onRequestClose}>
                <CrossSvg color={colors.black}/>
            </div>
        </VisibleOnSize>
        {isPhoneWidth? image(100, 100): image(140, 140)}
        <p className={styles.primaryText}>
            {item.stateDetails.name}
        </p>
        <p className={styles.secondaryText}>
            {item.stateDetails.desc}
        </p>
        <div className={styles.buttonsWrapper}>
            {item.stateDetails.buttons.map(item=> {                                
                return item === OrderStateButton.Cancel
                ?cancelButton
                :item === OrderStateButton.Pay
                ?payButton
                :item === OrderStateButton.Repeat
                ?repeatButton
                :null
            })}
        </div>
    </div>
  )


  if (props.isBottomSheet) { 
    return (
      <BottomSheetLayout closeIconColor={colors.black} backgroundColor={style.backgroundColor}>
        <BottomSheetBody>{body}</BottomSheetBody>
      </BottomSheetLayout>
    )
  }

  return (
    <ModalLayout fixed className={classNames(styles.modalLayout)}>
      {body}
    </ModalLayout>
  )
}