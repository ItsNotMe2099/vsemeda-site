import CancelSvg from 'components/svg/CancelSvg'
import RepeatSvg from 'components/svg/RepeatSvg'
import VisibleOnSize from 'components/visibility/VisibleOnSize'
import { breakpoints } from 'styles/variables'

interface commonProps {
  className: string
  onClick: ()=>void
  showSvg?: boolean
}

export function RepeatButton() {
  return (
    <button type='button'>{<RepeatSvg/>}Повторить оплату</button>
  )
}

export function CancelButton(props: commonProps) {
  return (
    <button type='button' className={props.className} onClick={props.onClick}> 
      {props.showSvg && <VisibleOnSize width={breakpoints.PhoneWidth}>
          <CancelSvg/>
      </VisibleOnSize>} 
      Отменить
    </button>
  )
}

export function PayButton(props: commonProps) {
  return (
    <button className={props.className}  type='button' onClick={props.onClick}>Оплатить</button>
  )
}