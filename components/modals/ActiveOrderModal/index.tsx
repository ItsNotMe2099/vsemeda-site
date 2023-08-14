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
import { OrderState, OrderStateButton } from 'data/enum/OrderState'
import OrderRepository from 'data/repositories/OrderRepository'
import { useResize } from 'components/hooks/useResize'
import { useEffect, useState } from 'react'
import CSS from 'csstype'
import OrderHelper from 'utils/orderHelper'
import { CancelButton, PayButton, RepeatButton } from 'components/ui/OrderButtons'
import CancelReasonForm from '../CancelReasonModal'


interface Props {
  onRequestClose?: () => void
  isBottomSheet?: boolean

}


export default function ActiveOrderModal(props: Props) {  
  const appContext = useAppContext()
  const {isPhoneWidth} = useResize()
  const [cancelOrderModal, setCancelOrder] = useState<boolean>(false)
  
  const order = appContext.modalArguments as IOrder
  const orderHelper = new OrderHelper({color: order.stateDetails.color, icon: order.stateDetails.icon})
  const [backgroundStyle] = orderHelper.background
  const [backgroundColor, changeBackgroundColor] = useState<CSS.Property.BackgroundColor>(backgroundStyle.backgroundColor)


  // const payHandler = () => {
  //   OrderRepository.payById(order.id)
  //   .then(res => {
  //     try{
  //       appContext.hideModal()
  //       window.open(res.payUrl, '_blank')
  //     } catch (error) {

  //     }
  //   })
  // }
    
  const body = (cancelOrderModal
    ? 
    <CancelReasonForm 
      isBottomSheetPart={props.isBottomSheet} 
      onBackClick={()=>{setCancelOrder(false)}}
    />
    : 
    <div className={styles.body}>  
      <VisibleOnSize width={breakpoints.PhoneWidth} minSize>
      <div className={styles.closeWrapper} onClick={props.onRequestClose}>
      <CrossSvg color={colors.black}/>
      </div>
      </VisibleOnSize>
      {isPhoneWidth? orderHelper.image(100, 100): orderHelper.image(140, 140)}
      <p className={styles.primaryText}>
        {order.stateDetails.name}
      </p>
      <p className={styles.secondaryText}>
        {order.stateDetails.desc}
      </p>
      <div className={styles.buttonsWrapper}>
          {order.stateDetails.buttons.map(item=> {                                
            return item === OrderStateButton.Cancel
            ? <CancelButton 
              showSvg={true}
              onClick={()=> {setCancelOrder(true)}}
              className={classNames(styles.cancelButton, order.state === OrderState.PaymentError&&styles.cancelButton__white)}
              />
            : item === OrderStateButton.Pay
            ? <PayButton  
                className={classNames(styles.payButton, order.state === OrderState.PaymentError&&styles.payButton__black)}
                // onClick={payHandler}
              />
            : item === OrderStateButton.Repeat
            ? <RepeatButton/>
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
      changeBackgroundColor(backgroundStyle.backgroundColor)
    }

  }, [cancelOrderModal])

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