import {IProductCategory} from 'data/interfaces/IProductCategory'
import {IProduct} from 'data/interfaces/IProduct'


export interface IMenuCategory extends IProductCategory{
  products: IProduct[]
}
