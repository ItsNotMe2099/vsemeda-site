import styles from './index.module.scss'
import classNames from 'classnames'
import { IField } from 'types/types'
import { useField } from 'formik'
import {IModification} from 'data/interfaces/IModification'
import Radio from 'components/ui/Radio'
import Formatter from 'utils/formatter'


interface Props extends IField<IModification> {
  options: IModification[],
  restrictedValues?: string[],
  grid?: number
  label?: string
  itemClassName?: string
  itemLabelClassName?: string
  labelClassName?: string
  flex?: boolean
  rootClass?: string
}

export default function ModificationCheckboxListField<T>(props: Props) {
  const { restrictedValues, options, label, type, value, ...rest } = props
  const [field, meta, helpers] = useField(props as any)
  // const { value } = field


  const handleCheckboxChanged = (item: IModification) => {
    if(item === field.value) {
      helpers.setValue(null)
      return
    }
   
    helpers.setValue(item)
  }

  return (
    <div className={classNames(styles.root, props.rootClass)}>
      {label && <div className={classNames(styles.label, props.labelClassName)}>{label}</div>}
    
      <div style={{
        display: (props.grid) ? 'grid' : (props.flex) ? 'flex' : 'block',
        gridTemplateColumns: props.grid ? Array.from({ length: props.grid }, (_, i) => '1fr').join(' ') : '',
        gridGap: '1vw',       
      }}>

        {options.map(item => (<>
          <div className={styles.item} onClick={() => handleCheckboxChanged(item)}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.price}>{Formatter.formatPrice(item.price)}</div>
              <Radio isActive={item === field.value}/>
          </div>
        </>
        ))}
      </div>      
    </div>

  )
}

ModificationCheckboxListField.defaultProps = {
  labelType: 'static',
  restrictedValues: []
}
