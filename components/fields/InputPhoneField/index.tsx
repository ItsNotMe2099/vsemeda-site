import classNames from 'classnames'
import FieldIconSvg from 'components/svg/FieldIconSvg'
import { useField } from 'formik'
import { FormEvent, useEffect, useState } from 'react'
import { useIMask } from 'react-imask'
import { IField } from 'types/types'
import styles from './index.module.scss'

interface Props  extends IField<string>{
}

export default function InputPhoneField(props: Props) {
  const [field, meta, helpers] = useField(props as any)
  const [focused, setFocus] = useState(false)
  const showError = !!meta.error && !focused
  const { ref: phoneRef, setValue, value} = useIMask({ mask: '+7 900 000 00 00' })


  const phoneHandler = (p: FormEvent<HTMLInputElement>) => {
    const v = p.currentTarget.value
    if(v.length < 2) {
      setValue('+7 9')
    }
    helpers.setValue(v)
  }

  useEffect(()=>{
    if(focused === true) {
      helpers.setTouched(true)
    }
  }, [focused])

  useEffect(()=>{
    setValue(field.value||'+7 9')
  }, [])


  return (<div className={classNames(styles.root, showError&&styles.inputError)}> 
    <FieldIconSvg
    iconName={'field_phone'}
    error={showError}
    className={styles.icon}
    color={'#6B4C9F'}
    />
    <input 
    placeholder={props.placeholder}
    className={styles.input}
    maxLength={16}  
    onFocus={(e) => {setFocus(true)}} 
    onBlur={(e) => {
      setFocus(false)
      field.onBlur(e)
    }}
    onInput={(v)=> phoneHandler(v)} 
    ref={phoneRef} 
    value={value} 
    />

  </div>)
}