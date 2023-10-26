import styles from './index.module.scss'
import { IField } from 'types/types'
import { useField } from 'formik'
import FieldError from 'components/ui/FieldError'
import usePressAndHover from 'hooks/usePressAndHover'
import classNames from 'classnames'
import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import FloatingFieldLabel from 'components/ui/FloatingFieldLabel'

const TextAreaInner = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {autoSize?: boolean}) => {
  if(props.autoSize){
    return <TextareaAutosize {...props as any}/>
  }else{
    return <textarea {...props}/>
  }
}
interface Props extends IField<string> {
  autoSize?: boolean
  color: 'white' | 'purple'
  areaClassname?: string
  className?: string
  maxlength?: number
}

export default function TextAreaField(props: Props) {
  const [ref, press, hover] = usePressAndHover()
  const [field, meta, helpers] = useField(props as any)
  const [focused, setFocused] = useState(false)
  const showError = meta.touched && !!meta.error

  return (
    <div className={classNames(styles.root, props.className)} ref={ref} data-field={props.name}>
      <TextAreaInner
        {...field}
        autoSize={props.autoSize}
        placeholder={props.placeholder}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          if (!field.value) {
            setFocused(false)
          }
        }}
        maxLength={props.maxlength}
        className={classNames({
          [styles.input]: true,
          [styles.hover]: hover,
          [styles.focused]: focused || field.value,
          [styles.withIcon]: props.iconName,
          [styles.error]: showError,
          [styles.white]: props.color === 'white',
          [styles.purple]: props.color === 'purple',
        }, props.areaClassname&&props.areaClassname)}
      />
      {props.label && <FloatingFieldLabel active={focused || !!field.value}>{props.label}</FloatingFieldLabel>}
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
