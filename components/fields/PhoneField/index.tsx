import { FieldConfig, FieldHookConfig, useField,  } from 'formik'
import styles from './index.module.scss'
import { CountryCode } from 'libphonenumber-js/core'
import classNames from 'classnames'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { useEffect, useState } from 'react'
import { FieldValidator } from 'formik/dist/types'
import { IField, InputStyleType } from 'types/types'
import FieldError from 'components/ui/FieldError'
import FieldIconSvg from 'components/svg/FieldIconSvg'

interface Props extends IField<string> {
  blurValidate?: FieldValidator
  className?: string
  fieldWrapperClassName?: string
  label?: string
  errorClassName?: string
  defaultCountry?: string
  countrySelectClassName?: string
  styleType: InputStyleType
}

export default function PhoneField(props: Props & FieldConfig) {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>)
  const [focused, setFocus] = useState(false)
  const showError = !!meta.error && !focused
  const handleChange = (value: string) => {
    helpers.setValue(value)
  }

  useEffect(()=>{
    if(focused === true) {
      helpers.setTouched(true)
    }
  }, [focused])

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <PhoneInputWithCountrySelect
          disabled={props.disabled}
          countrySelectComponent={() => null}
          defaultCountry={props.defaultCountry as CountryCode}
          className={classNames({
            [styles.input]: true,
            [styles.inputError]: showError,
            [styles.inputFocused]: focused,
            [styles.inputTouched]: meta.touched
          })}
          placeholder={props.placeholder}
          onFocus={(e) => {
            setFocus(true)
          }}
          value={'+7 9'}
          onBlur={(e) => {
            setFocus(false)
            field.onBlur(e)
          }}
          limitMaxLength={true}
          maxlength={16}
          minlength={16}
          withCountryCallingCode
          useNationalFormatForDefaultCountryValue
          countrySelectProps={{
            className: props.countrySelectClassName,
          }}
          onChange={handleChange}
        />
        {props.iconName && (
          <FieldIconSvg
            iconName={props.iconName}
            error={showError}
            className={classNames([styles.icon, styles[props.styleType]])}
            color={'#6B4C9F'}
          />
        )}
        <FieldError showError={showError} />
      </div>
    </div>
  )
}
