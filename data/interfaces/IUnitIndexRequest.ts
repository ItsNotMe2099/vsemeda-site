import {ILocation} from 'data/interfaces/ILocation'
import {PriceRating} from 'data/enum/PriceRating'
import {PaymentMethod} from 'data/enum/PaymentMethod'

export enum IUnitIndexRequestFeature {
  Takeaway = 'takeaway',
}
export enum IUnitIndexRequestSortType {
  Default = 'default',
  Rating = 'ratingDesc',
  Time = 'timeAsc',
  PriceAsc = 'priceAsc',
  PriceDesc = 'priceDesc',
}

export interface IUnitIndexRequest {
  location: ILocation;
  priceRatings?: PriceRating[];
  categories?: number[];
  paymentMethods?: PaymentMethod[];
  features?: IUnitIndexRequestFeature[];
  maxDeliveryTime?: string;
  sort?: IUnitIndexRequestSortType;
}
