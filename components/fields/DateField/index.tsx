import styles from './index.module.scss'
import { IField, InputStyleType } from 'types/types'
import { useField } from 'formik'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import classNames from 'classnames'
import usePressAndHover from 'hooks/usePressAndHover'
import FieldIconSvg from 'components/svg/FieldIconSvg'
import FieldError from 'components/ui/FieldError'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import parse from 'date-fns/parse'
import FieldLabel from 'components/ui/FieldLabel'

interface Props extends IField<string> {
  styleType: InputStyleType
  maxDate?: Date
  minDate?: Date
  visibleYearSelector?: boolean
  excludeDates?: Date[]
  className?: string
}

export default function DateField(props: Props) {
  const [wrapperRef, press] = usePressAndHover()
  const [field, meta, helpers] = useField<string>(props as any)
  const showError = meta.touched && !!meta.error
  console.log('DateValue', field.value)

  const [date, setDate] = useState<Date | null>(null)

  return (
    <div className={classNames(styles.root, props.className)} data-field={props.name}>
      <FieldLabel>{props.label}</FieldLabel>
      <div className={styles.wrapper} ref={wrapperRef}>
        <DatePicker
          name={props.name}
          selected={field.value ? parse(field.value, 'yyyy-MM-dd', new Date()) : null}
          className={classNames({
            [styles.input]: true,
            [styles.error]: showError,
            [styles.withIcon]: props.iconName,
            [styles.press]: press,
          }, styles[props.styleType])}
          locale={ru}
          dateFormat="dd/MM/yyyy"
          placeholderText={props.placeholder}
          forceShowMonthNavigation={false}
          popperPlacement="bottom"
          showYearDropdown={props.visibleYearSelector}
          showMonthDropdown={props.visibleYearSelector}
          dropdownMode="select"
          maxDate={props.maxDate}
          minDate={props.minDate}
          excludeDates={props.excludeDates}
          onChange={(date) => {
            if (date) {
              console.log('OnChange', format(date, 'dd.MM.yyyy'))
              helpers.setValue(format(date, 'dd.MM.yyyy'))
            } else {
              helpers.setValue('')
            }
          }}
        />
        {props.styleType === 'default' && (
          <div className={classNames({
            [styles.label]: true,
            [styles.withIcon]: props.iconName,
          })}>
            {props.label}
          </div>
        )}
        {props.iconName && (
          <FieldIconSvg
            iconName={props.iconName}
            error={showError}
            className={classNames([styles.icon, styles[props.styleType], {[styles.withLabel]: props.label}])}
            color={'#828282'}
          />
        )}
        {showError && <img src="/images/icons/field_fail.svg" alt="" className={styles.failIcon} />}
        <FieldError showError={showError}>{meta.error}</FieldError>
      </div>
    </div>
  )
}

