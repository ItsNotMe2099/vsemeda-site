import { IField } from 'types/types'
import { useField } from 'formik'
import ProductQuantityButton from 'components/ui/ProductQuantityButton'

interface Props extends IField<number> {
  min?: number
}

export default function QuantityField(props: Props) {
  const { label, type, ...rest } = props
  const [field, meta, helpers] = useField(props as any)
  const { value } = field


  const handleAddClick = () => {
    helpers.setValue(field.value + 1)
  }
  const handleMinusClick = () => {
    if((props.min > 0 && props.value <= props.min) || props.value === 0){
      return
    }
    helpers.setValue(field.value - 1)
  }


  return (
    <ProductQuantityButton quantity={value} theme={'grey'} onAddClick={handleAddClick} onMinusClick={handleMinusClick}/>

  )
}

