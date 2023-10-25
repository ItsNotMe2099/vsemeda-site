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
  const { ref: phoneRef, maskRef, setValue, value} = useIMask({ mask: '{+7 9}`00 000 00 00'})

  const phoneHandler = (p: FormEvent<HTMLInputElement>) => {
    const v = p.currentTarget.value
    if(v.length <= 3) {
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
    maskRef.current.updateCursor(value.length)
  }, [value])

  useEffect(()=>{
    if(!field.value || field.value.length <=3) {
      setValue('+7 9')
    }
    else {
      setValue(field.value)
    }
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
    onFocus={(e) => {
      setFocus(true)
      // maskRef.current.updateCursor(value.length)
    }} 
    onBlur={(e) => {
      setFocus(false)
      field.onBlur(e)
    }}
    onClick={()=> maskRef.current.updateCursor(value.length)}
    // onChange={()=>maskRef.current.updateCursor(value.length)}
    onInput={(v)=> phoneHandler(v)} 
    
    ref={phoneRef} 
    value={value} 
    />

  </div>)
}