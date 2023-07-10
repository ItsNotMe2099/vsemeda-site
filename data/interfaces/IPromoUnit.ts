import {IPromo} from 'data/interfaces/IPromo'

export interface IPromoUnit {
  id: number;
  includedCategoriesIds?: number[];
  excludedCategoriesIds?: number[];
  includeAllCategories?: boolean;
  includeAllProducts?: boolean;
  includedProductCategoriesIds?: number[];
  excludedProductCategoriesIds?: number[];
  includedProductsIds?: number[];
  excludedProductsIds?: number[];
  minOrderAmount: number;
  promo: IPromo
}
