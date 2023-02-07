import {ModificationType} from 'data/enum/ModificationType'
import IFile from 'data/interfaces/IFile'

export interface IModification {
  id: string
  name: string
  type: ModificationType
  brutto: number
  price: number
  image?: IFile
}
