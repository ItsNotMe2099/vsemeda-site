import {IOrderModificationLine} from 'data/interfaces/IOrderModificationLine'
import { IProduct } from './IProduct'

export interface IOrderLine  {
  id: string
  name: string;
  modificationLines: IOrderModificationLine[]
  total: number
  price: number
  quantity: number
  productId: number
  isWeighted: boolean
  modificationsPrice: number
  product?: IProduct
}
