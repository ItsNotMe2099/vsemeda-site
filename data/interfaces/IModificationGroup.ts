import {ModificationGroupType} from 'data/enum/ModificationGroupType'
import {IModification} from 'data/interfaces/IModification'

export interface IModificationGroup {
  id: string
  name: string
  type: ModificationGroupType
  minNum: number
  maxNum: number
  modifications: IModification[]

}
