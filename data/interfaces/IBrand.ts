import IFile from 'data/interfaces/IFile'
import {PriceRating} from 'data/enum/PriceRating'

export interface IBrand {
  id: number
  name: string
  slug: string
  image?: IFile
  logo?: IFile
  priceRating: PriceRating


}
