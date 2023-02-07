import {IUnit} from 'data/interfaces/IUnit'
import {IPromo} from 'data/interfaces/IPromo'

export interface IUnitDetails extends IUnit {
  promos: IPromo[]
}
