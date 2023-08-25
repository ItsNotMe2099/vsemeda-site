import { IField } from 'types/types'
import { useField } from 'formik'
import ProductQuantityButton from 'components/ui/ProductQuantityButton'
import { useState } from 'react'

interface Props extends IField<number> {
  min?: number,
  className?: string
}

export default function QuantityField(props: Props) {
  const { label, type, ...rest } = props
  const [field, meta, helpers] = useField(props as any)
  const { value } = field
  const [isMinusDisabled, setIsMinusDisabled] = useState<boolean>(false)


  const handleAddClick = () => {
    helpers.setValue(field.value + 1)
    setIsMinusDisabled(false)
  }
  const handleMinusClick = () => {
    if((props.min > 0 && value <= props.min) || value === 0){
      setIsMinusDisabled(true)
      return
    }
    helpers.setValue(field.value - 1)
  }


  return (
    <ProductQuantityButton quantity={value} theme={'grey'} minusDisabled={isMinusDisabled} className={props.className} onAddClick={handleAddClick} onMinusClick={handleMinusClick}/>
  )
}

