import { useResize } from 'components/hooks/useResize'
import CancelSvg from 'components/svg/CancelSvg'
import RepeatSvg from 'components/svg/RepeatSvg'
import VisibleOnSize from 'components/visibility/VisibleOnSize'
import { useOrderContext } from 'context/order_state'
import { useAppContext } from 'context/state'
import OrderRepository from 'data/repositories/OrderRepository'
import { breakpoints } from 'styles/variables'
import { ModalType, SnackbarType } from 'types/enums'

interface commonProps {
  className: string
  onClick?: ()=>void
  showSvg?: boolean
  buttonName?: string
}



export function RepeatButton() {
  return (
    <button type='button'>{<RepeatSvg/>}Повторить оплату</button>
  )
}

export function CancelButton(props: commonProps) {
  const appContext = useAppContext()
  const orderContext = useOrderContext()
  const {isPhoneWidth} = useResize()

  const cancelHandler = () => {
    if(props.onClick) {
      props.onClick()
    } else {
      isPhoneWidth
      ? appContext.showBottomSheet(ModalType.CancelOrder, orderContext.activeDetails??appContext.modalArguments)
      : appContext.showModal(ModalType.CancelOrder, orderContext.activeDetails??appContext.modalArguments)
    }
  }

  return (
    <button type='button' className={props.className} onClick={cancelHandler}> 
      {props.showSvg && <VisibleOnSize width={breakpoints.PhoneWidth}>
          <CancelSvg/>
      </VisibleOnSize>} 
      {props.buttonName? props.buttonName: 'Отменить'}
    </button>
  )
}

export function PayButton(props: commonProps) {
  const appContext = useAppContext()
  const {activeDetails} = useOrderContext()

  const payHandler = () => {
    if(props.onClick) {
      props.onClick()
    } else {
      OrderRepository.payById(activeDetails?.id??appContext.modalArguments.id)
      .then(res => {
        appContext.hideBottomSheet()
        window.open(res.payUrl, '_blank')
      })
      .catch((error) => {
        appContext.showSnackbar(error.toString(), SnackbarType.error)
      })
    }
  }

  return (
    <button 
      type='button' 
      className={props.className}  
      onClick={payHandler}
    >
      {props.buttonName? props.buttonName: 'Оплатить'}
    </button>
  )
}

export function FeedbackButton(props: commonProps) {

  const appContext = useAppContext()

  const feedbackHandler = () => {
    appContext.hideModal()
    appContext.showModal(ModalType.LeaveReview)
  }

  return <button className={props.className} onClick={feedbackHandler}>{props.buttonName? props.buttonName: 'Сказать спасибо'}</button>
}