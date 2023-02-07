import request from 'utils/request'
import {IUnitDetails} from 'data/interfaces/IUnitDetails'
import {IMenuRequest} from 'data/interfaces/IMenuRequest'
import {IMenuCategory} from 'data/interfaces/IMenu'
import {ILocation} from 'data/interfaces/ILocation'
import {IProduct} from 'data/interfaces/IProduct'
import {IUnitIndex} from 'data/interfaces/IUnitIndex'
import {IUnitIndexRequest} from 'data/interfaces/IUnitIndexRequest'
import queryString from 'query-string'

export default class UnitRepository {
  static async fetchUnitIndex(data: IUnitIndexRequest): Promise<IUnitIndex> {
    const res = await request<IUnitIndex>({
      method: 'post',
      url: '/api/index-units',
      data,
    })
    return res
  }
  static async fetchById(id: string, location: ILocation): Promise<IUnitDetails> {
    console.log('dsadsad', `/api/unit/${id}?${queryString.stringify(location)}`)
    const res = await request<IUnitDetails>({
      method: 'get',
      url: `/api/unit/${id}?${queryString.stringify(location)}`,
    })
    return res
  }

  static async fetchMenuById(id: string, data: IMenuRequest & ILocation): Promise<IMenuCategory[]> {
    const res = await request<IMenuCategory[]>({
      method: 'get',
      url: `/api/unit/menu/${id}`,
      data
    })
    return res
  }
  static async fetchUpsellById(id: number, data: IMenuRequest = {}): Promise<IProduct[]> {
    const res = await request<IProduct[]>({
      method: 'get',
      url: `/api/unit/upsell/${id}`,
      data
    })
    return res
  }
}
