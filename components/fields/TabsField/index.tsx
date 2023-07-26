import { useField } from 'formik'
import styles from './index.module.scss'
import classNames from 'classnames'
import FieldError from 'components/ui/FieldError'
import {IField, IOption} from 'types/types'

interface Props<T> extends IField<T> {
  options: IOption<T>[]
  disabled?: boolean
  renderIcon?: (value: IOption<T>, active: boolean) => React.ReactNode
}

export default function TabsField<T>(props: Props<T>) {
  const {options} = props
  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error
  const handleChange = (item: IOption<T>) => {
    if (!props.disabled) {
      helpers.setValue(item.value)
    }
  }

  return (
    <div className={classNames(styles.root, {[styles.hasError]: showError})}>
      <div className={styles.options}>
        {options.map(item => (
          <div
            key={`${item.value}`}
            className={classNames({
              [styles.option]: true,
              [styles.error]: showError,
              [styles.optionActive]: field.value === item.value},
            )}
            onClick={() => handleChange(item)}
          >
            {props.renderIcon && props.renderIcon(item, field.value === item.value)}
            {item.label}
          </div>
        ))}
      </div>
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}