import {IProduct} from 'data/interfaces/IProduct'
import {ICategory} from 'data/interfaces/ICategory'
import {IndexFilterFormData} from 'types/form_data/IndexFilterFormData'

export interface ProductModalArguments{
  product: IProduct
  unitId?: number
}
export interface AddressModalArguments{
  firstAddress?: boolean
}
export interface IndexFilterModalArguments{
  categories: ICategory[],
  filter: IndexFilterFormData,
  onSubmit: (data: IndexFilterFormData) => void
  onClear: () => void
}
export interface ConfirmModalArguments {
  onConfirm: () => Promise<void>
  onCancel?: () => void
  text?: string
  confirm?: string,
  cancel?: string
}
