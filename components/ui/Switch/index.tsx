import React from 'react'
import RSwitch from 'react-switch'
interface Props {
  checked: boolean
  onChange: (val: boolean) => void
  height?: number
  width?: number
  offColor?: string
  onColor?: string
  handleDiameter?: number
  unCheckedIcon?: boolean
  checkedIcon?: boolean
  offHandleColor?: string
  onHandleColor?: string
}

export default function Switch(props: Props) {


  return (
      <RSwitch
        onChange={props.onChange}
        checked={props.checked}
        handleDiameter={props.handleDiameter ?? 24}
        uncheckedIcon={props.unCheckedIcon ?? false}
        checkedIcon={props.checkedIcon ?? false}
        height={props.height ?? 30}
        width={props.width ?? 56}
        offColor={props.offColor ?? '#fff'}
        onColor={props.onColor ?? '#fff'}
        offHandleColor={props.offHandleColor ?? '#812292'}
        onHandleColor={props.onHandleColor ?? '#61D56E'}
      />
  )
}
