import Radio from './Radio'
import styles from './index.module.scss'
import classNames from 'classnames'
import {IField, IOption} from 'types/types'
import { useField, useFormikContext } from 'formik'


interface Props<T> extends IField<T> {
  options: IOption<T>[],
  restrictedValues?: T[],
  grid?: number
  label?: string
  itemClassName?: string
  itemLabelClassName?: string
  labelClassName?: string
  flex?: boolean
  rootClass?: string
}

export default function RadioListField<T>(props: Props<T>) {
  const { restrictedValues, options, label, type, ...rest } = props
  const [field, meta, helpers] = useField(props as any)
  const { value } = field
  const { setFieldValue, setFieldTouched } = useFormikContext()

  const handleCheckboxChanged = (value: T) => {
    helpers.setValue(value)
  }

  return (
    <div className={classNames(styles.root, props.rootClass)}>
      {label && <div className={classNames(styles.label, props.labelClassName)}>{label}</div>}
      <div style={{
        display: (props.grid) ? 'grid' : (props.flex) ? 'flex' : 'block',
        gridTemplateColumns: props.grid ? Array.from({ length: props.grid }, (_, i) => '1fr').join(' ') : '',
        gridGap: '1vw'
      }}>
        {options.filter(item => restrictedValues.indexOf(item.value) === -1).map(item => (
          <div className={styles.radio}>
            <Radio<T>
              className={classNames(props.itemClassName, [...(!props.grid ? [styles.radioNoGrid] : [])])}
              labelClassName={props.itemLabelClassName}
              value={item.value} isActive={item.value === value} label={item.label}
              onChange={() => handleCheckboxChanged(item.value)} />
          </div>
        ))}
      </div>
    </div>

  )
}

RadioListField.defaultProps = {
  labelType: 'static',
  restrictedValues: []
}
