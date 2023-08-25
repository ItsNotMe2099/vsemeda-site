import request from 'utils/request'
import { ILocation } from 'data/interfaces/ILocation'
import { ICart } from 'data/interfaces/ICart'
import { ICartUpdateRequestData } from 'data/interfaces/ICartUpdateRequestData'
import CartUtils from 'utils/CartUtils'
import queryString from 'query-string'

export default class CartRepository {

  static async fetchCurrentCart(location: ILocation): Promise<ICart> {
    const res = await request<ICart>({
      method: 'get',
      url: '/api/cart/current',
      data: { ...location }
    })
    return CartUtils.formatCart(res)
  }

  static async update(data: ICartUpdateRequestData, location: ILocation): Promise<ICart> {
    const res = await request<ICart>({
      method: 'patch',
      url: `/api/cart/current?${queryString.stringify(location)}`,
      data,
    })
    return CartUtils.formatCart(res)
  }

  static async applyPromoСode(data: {code: string}, location: ILocation): Promise<ICart> {
    const res = await request<ICart>({
      method: 'post',
      url: `/api/cart/current/apply-promocode?${queryString.stringify(location)}`,
      data
    })
    return CartUtils.formatCart(res)
  }

  static async clear(): Promise<boolean> {
    const res = await request<any>({
      method: 'delete',
      url: '/api/cart/current',

    })
    return !!res
  }
}
