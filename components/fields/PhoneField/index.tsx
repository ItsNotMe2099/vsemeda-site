import { FieldConfig, FieldHookConfig, useField } from 'formik'
import styles from './index.module.scss'
import { CountryCode } from 'libphonenumber-js/core'
import classNames from 'classnames'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { useState } from 'react'
import { FieldValidator } from 'formik/dist/types'
import { IField } from 'types/types'
import FieldError from 'components/ui/FieldError'
import Image from 'next/image'

interface Props extends IField<string> {
  blurValidate?: FieldValidator
  className?: string
  fieldWrapperClassName?: string
  label?: string
  errorClassName?: string
  defaultCountry?: string
  countrySelectClassName?: string
  icon?: React.ReactNode
}

export default function PhoneField(props: Props & FieldConfig) {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>)
  const { value } = field
  const [focused, setFocus] = useState(false)
  const showError = meta.touched && !!meta.error && !focused
  const handleChange = (value: string) => {
    helpers.setValue(value)
  }
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
          })}
          placeholder={props.placeholder}
          onFocus={(e) => {
            setFocus(true)
          }}
          value={field.value}
          onBlur={(e) => {
            setFocus(false)
            field.onBlur(e)

          }}
          international
          withCountryCallingCode
          useNationalFormatForDefaultCountryValue
          countrySelectProps={{
            className: props.countrySelectClassName,
          }}

          onChange={handleChange}
        />
        {props.icon ?
          <div className={styles.icon}>
            <Image src={'/images/icons/phone_form.svg'} alt='' fill />
          </div>
          : null}
        <FieldError showError={showError} />
      </div>
    </div>
  )
}
