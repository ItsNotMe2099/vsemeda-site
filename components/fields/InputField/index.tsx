import styles from './index.module.scss'
import { IField, InputStyleType } from 'types/types'
import { useField } from 'formik'
import { useIMask } from 'react-imask'
import FieldError from 'components/ui/FieldError'
import classNames from 'classnames'
import usePressAndHover from 'hooks/usePressAndHover'
import { ChangeEvent, MouseEventHandler, ReactElement, useEffect, useState } from 'react'
import CrossSvg from 'components/svg/CrossSvg'
import FloatingFieldLabel from 'components/ui/FloatingFieldLabel'
import FieldLabel from 'components/ui/FieldLabel'

type FormatType = 'phone'

interface Props extends IField<string> {
  obscure?: boolean
  format?: FormatType
  success?: boolean
  styleType: InputStyleType
  suffix?: 'clear' | 'icon' | ReactElement
  color: 'white' | 'purple' | 'darkPurple'
  suffixIcon?: ReactElement
  onSuffixClick?: () => void
  className?: string
  errorClassName?: string
  value?: any
  onClick?: MouseEventHandler<HTMLInputElement>
  labelType?: 'floating' | 'top'
  isNumbersOnly?: boolean
}

export default function InputField(props: Props) {
  const [wrapperRef, press, hover] = usePressAndHover()
  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error
  const { ref: phoneRef } = useIMask({ mask: '+7 000 000 0000' })
  const [focused, setFocused] = useState(false)
  useEffect(() => {
    if (props.format === 'phone' && phoneRef.current && phoneRef.current.value) {
      // set masked default value
      helpers.setValue(phoneRef.current.value)
    }
  }, [phoneRef.current])

  const getSuffix = () => {
    switch (props.suffix) {
      case 'clear':
        return <div className={styles.suffix} onClick={() => helpers.setValue('')}><CrossSvg color={'red'} /></div>
      case 'icon':
        return <div className={styles.suffix} onClick={props.onSuffixClick}>{props.suffixIcon}</div>
      default:
        return props.suffix
    }
  }
  return (
    <div className={classNames(styles.root, props.className)} data-field={props.name}>
      <div className={styles.wrapper} ref={wrapperRef}>
        {props.labelType === 'floating' ? <FloatingFieldLabel active={focused || !!field.value}>{props.label}</FloatingFieldLabel> : null}
        {props.labelType === 'top' ? <FieldLabel>{props.label}</FieldLabel> : null}
        <input
          {...field}
          {...(typeof props.value !== 'undefined' ? { value: props.value } : {})}
          ref={props.format === 'phone' ? phoneRef as any : null}
          type={props.type ?? 'text'}
          disabled={props.disabled}
          onInput=
          {props.isNumbersOnly ? (e: ChangeEvent<HTMLInputElement>) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') } : null}
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => {
            setFocused(false)
          }}
          onClick={props.onClick}
          className={classNames({
            [styles.input]: true,
            [styles.error]: showError,
            [styles.success]: props.success,
            [styles.withIcon]: props.iconName,
            [styles.hover]: hover,
            [styles.press]: press,
            [styles.white]: props.color === 'white',
            [styles.purple]: props.color === 'purple',
            [styles.darkPurple]: props.color === 'darkPurple',
          }, styles[props.styleType])}
          placeholder={props.placeholder}
        />
        {props.success && <img src="/images/icons/field_success.svg" alt="" className={styles.successIcon} />}
        {props.suffix && getSuffix()}
        <FieldError className={props.errorClassName} showError={showError}>{meta.error}</FieldError>
      </div>
    </div>
  )
}

