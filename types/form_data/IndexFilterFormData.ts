import {PriceRating} from 'data/enum/PriceRating'
import {PaymentMethod} from 'data/enum/PaymentMethod'
import {IUnitIndexRequestFeature, IUnitIndexRequestSortType} from 'data/interfaces/IUnitIndexRequest'

export interface IndexFilterFormData {
  priceRatings?: PriceRating[];
  categories?: number[];
  paymentMethods?: PaymentMethod[];
  features?: IUnitIndexRequestFeature[];
  maxDeliveryTime?: string;
  sort?: IUnitIndexRequestSortType;
}
