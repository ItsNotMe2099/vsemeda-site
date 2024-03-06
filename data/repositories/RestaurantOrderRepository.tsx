import request from 'utils/request'
import {IPromoQrCode} from 'data/interfaces/IPromoQrCode'

interface IRestaurantOrderRequest{
  code: string,
  number?: string | null,
  total: number
}
export default class RestaurantOrderRepository {
  static async create(data: IRestaurantOrderRequest): Promise<IPromoQrCode | null> {
    const res = await request<IPromoQrCode | null>({
      method: 'post',
      url: '/api/restaurant-order',
      data,
    })
    return res
  }
}
