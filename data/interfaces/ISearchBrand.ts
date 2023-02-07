import {IUnit} from 'data/interfaces/IUnit'
import {IProduct} from 'data/interfaces/IProduct'

export interface ISearchUnit extends IUnit{
 products: IProduct[]
}
