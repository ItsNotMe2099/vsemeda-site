import {ICartModificationLine} from 'data/interfaces/ICartModificationLine'

export interface ICartLine{
  id: string
  modificationLines: ICartModificationLine[]
  totalBase: number;
  total: number
  price: number
  quantity: number
  productId: string
  isWeighted: boolean
  modificationsPrice: number
  groupingId: string
}
