import {ProductDeliveryType} from 'data/enum/ProductDeliveryType'
import IFile from 'data/interfaces/IFile'
import {IModificationGroup} from 'data/interfaces/IModificationGroup'
import {IProductCardLayout} from 'data/interfaces/IProductCardLayout'

export interface IProduct {
  id: string
  name: string
  description: string
  slug: string
  price: number
  sort: number
  weight: string
  energy: number
  volume: number
  vat: number
  deliveryType: ProductDeliveryType
  isWeighted: boolean
  isAvailable: boolean
  image?: IFile
  modificationGroups: IModificationGroup[]
  layout?: IProductCardLayout
}
