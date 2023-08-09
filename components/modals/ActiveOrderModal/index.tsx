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
import { OrderState, OrderStateButton } from 'data/enum/OrderState'
import RepeatSvg from 'components/svg/RepeatSvg'
import OrderRepository from 'data/repositories/OrderRepository'
import { useResize } from 'components/hooks/useResize'
import { getOrderColor, getOrderIcon, getOrderImage } from 'components/for_pages/index/ActiveOrder/ActiveOrderItem'
import { useEffect, useState } from 'react'
import CancelReasonForm from './CancelReasonForm'
import CSS from 'csstype'


interface Props {
  onRequestClose?: () => void
  isBottomSheet?: boolean

}


export default function ActiveOrderModal(props: Props) {  
  const appContext = useAppContext()
  const {isPhoneWidth} = useResize()
  const [cancelOrderModal, setCancelOrder] = useState<boolean>(false)
  
  const item = appContext.modalArguments as IOrder
  const orderType = getOrderIcon(item.stateDetails.icon)
  const style = getOrderColor(item.stateDetails.color)
  const image = (width: number, height: number) => {return getOrderImage(orderType, width, height)}
  const [backgroundColor, changeBackgroundColor] = useState<CSS.Property.BackgroundColor>(style.backgroundColor)


  const payHandler = () => {
    OrderRepository.payById(item.id)
    .then(res => {
        appContext.hideModal()
        window.location.href = res.payUrl
    })
  }

  const cancelButton = (
    <button type='button' className={classNames(styles.cancelButton, item.state === OrderState.PaymentError&&styles.cancelButton__white)} onClick={()=> {setCancelOrder(true)}}> 
        {<VisibleOnSize width={breakpoints.PhoneWidth}>
            <CancelSvg/>
        </VisibleOnSize>} 
        Отменить
    </button>
  )

  const payButton = (
    <button className={classNames(styles.payButton, item.state === OrderState.PaymentError&&styles.payButton__black)}  type='button' onClick={payHandler}>Оплатить</button>
  )


  const repeatButton = (
    <button type='button'>{<RepeatSvg/>}Повторить оплату</button>
  )
    
    
  const body = (cancelOrderModal
    ? 
    <CancelReasonForm 
      id={item.id} 
      isBottomSheet={props.isBottomSheet} 
      onBackClick={()=>{setCancelOrder(false)}}
      image={image(45, 45)}
    />
    : 
    <div className={styles.body}>  
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

  useEffect(()=> {
    if(cancelOrderModal) {
      changeBackgroundColor(colors.green)
    }
    else {
      changeBackgroundColor(style.backgroundColor)
    }

  }, [cancelOrderModal])



  //TODO: взять картинку бэкграунда
  if (props.isBottomSheet) { 
    return (
      <BottomSheetLayout closeIconColor={colors.black} backgroundColor={backgroundColor + ' url(/images/mobileBg/mobileBgLowOpacity.png)'}>
        <BottomSheetBody>
          {body}
          </BottomSheetBody>
      </BottomSheetLayout>
    )
  }

  return (
    <ModalLayout fixed className={classNames(styles.modalLayout)} backgroundColor={backgroundColor}>
      {body}
    </ModalLayout>
  )
}