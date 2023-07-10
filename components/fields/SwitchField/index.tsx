import styles from './index.module.scss'
import { useField, useFormikContext } from 'formik'
import React from 'react'
import Switch from 'components/ui/Switch'
import classNames from 'classnames'
import {IField} from 'types/types'

interface Props extends IField<boolean>{
  onChange?: () => void
  label?: string
  className?: string
  offColor?: string
  onColor?: string
  offHandleColor?: string
  onHandleColor?: string
  fluid?: boolean
}

export default function SwitchField(props: Props) {
  //@ts-ignore
  const [field, meta] = useField(props)
  const { setFieldValue } = useFormikContext()
  const hasError = !!meta.error && meta.touched

  const handleChange = (val: boolean) => {
    props.onChange && props.onChange()
    setFieldValue(field.name, val)
  }
  const label = ( <div className={styles.label}>
    {props.label}
  </div> )
  return (
    <div className={classNames(styles.root, props.className, {[styles.fluid]: props.fluid})}>
      {props.label && props.fluid && label}
      <Switch
          onChange={(val) => handleChange(val)}
          checked={field.value}
          offColor={props.offColor}
          onColor={props.onColor}
          offHandleColor={props.offHandleColor}
          onHandleColor={props.onHandleColor}
          />
          {props.label && !props.fluid && label}
    </div>
  )
}
