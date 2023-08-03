import styles from './index.module.scss'
import classNames from 'classnames'
import {IField, IOption} from 'types/types'
import {useField} from 'formik'
import Checkbox from './Checkbox'


interface Props<T> extends IField<T> {
  options: IOption<T>[],
  restrictedValues?: T[],
  grid?: number
  label?: string
  itemClassName?: string
  activeClassName?: string
  itemLabelClassName?: string
  circleClassName?: string
  labelClassName?: string
  flex?: boolean
  rootClass?: string,
  wrapperClassName? : string
}

export default function CheckboxListField<T>(props: Props<T>) {
  const {restrictedValues, options, label, type, ...rest} = props
  const [field, meta, helpers] = useField<T[]>(props as any)
  const {value} = field
  const handleCheckboxChanged = (val: T) => {
    if(!value.includes(val)){
      helpers.setValue([...value, val])
    }else{
      helpers.setValue(value.filter(i => i !== val))
    }

  }

  return (
    <div className={classNames(styles.root, props.rootClass)}>
      {label && <div className={classNames(styles.label, props.labelClassName)}>{label}</div>}
      <div 
      className={props.wrapperClassName}
      style={{
        display: (props.grid) ? 'grid' : (props.flex) ? 'flex' : 'block',
        gridTemplateColumns: props.grid ? Array.from({length: props.grid}, (_, i) => '1fr').join(' ') : '',
        gridGap: '1vw'
      }}>
        {options.filter(item => restrictedValues.indexOf(item.value) === -1).map(item => (
          <Checkbox<T>
            circleClassName={props.circleClassName}
            className={classNames(props.itemClassName, [...(!props.grid ? [styles.radioNoGrid] : [])])}
            labelClassName={props.itemLabelClassName}
            activeClassName={props.activeClassName}
            value={item.value} isActive={value.includes(item.value)} label={item.label}
            onChange={() => handleCheckboxChanged(item.value)}
          />
        ))}
      </div>
    </div>

  )
}

CheckboxListField.defaultProps = {
  labelType: 'static',
  restrictedValues: []
}
