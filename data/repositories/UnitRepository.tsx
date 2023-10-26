import request from 'utils/request'
import {IUnitDetails} from 'data/interfaces/IUnitDetails'
import {IMenuRequest} from 'data/interfaces/IMenuRequest'
import {IMenuCategory} from 'data/interfaces/IMenu'
import {ILocationRequest} from 'data/interfaces/ILocation'
import {IProduct} from 'data/interfaces/IProduct'
import {IUnitIndex} from 'data/interfaces/IUnitIndex'
import {IUnitIndexRequest} from 'data/interfaces/IUnitIndexRequest'
import {IUnitRequest} from 'data/interfaces/IUnitRequest'
import { IUnit } from 'data/interfaces/IUnit'

export default class UnitRepository {
  static async fetchUnitIndex(data: IUnitIndexRequest): Promise<IUnitIndex> {
    const res = await request<IUnitIndex>({
      method: 'post',
      url: '/api/index-units',
      data,
    })
    return res
  }

  static async fetchBySlug(slug: string, data:  IMenuRequest & ILocationRequest): Promise<IUnitDetails> {
    const res = await request<IUnitDetails>({
      method: 'get',
      url: `/api/unit/bySlug/${slug}`,
      data
    })
    return res
  }

  static async fetchUnitDetails(id: number, data: ILocationRequest): Promise<Promise<IUnit>> {
    const res = await request({
      method: 'get',
      url: `/api/unit/${id}`,
      data
    })
    if(res.err) {
      return null
    }
    return res
  }

  static async fetchByBrandSlug(brandSlug: string, data:  IUnitRequest & IMenuRequest & ILocationRequest): Promise<IUnitDetails> {
    const res = await request<IUnitDetails>({
      method: 'get',
      url: `/api/unit/byBrandSlug/${brandSlug}`,
      data
    })
    return res
  }

  static async fetchMenuBySlug(slug: string, data: IMenuRequest & ILocationRequest): Promise<IMenuCategory[]> {
    const res = await request<IMenuCategory[]>({
      method: 'get',
      url: `/api/unit/menu/bySlug/${slug}`,
      data
    })
    return res
  }
  static async fetchMenuByBrandSlug(slug: string, data: IMenuRequest & ILocationRequest): Promise<IMenuCategory[]> {
    const res = await request<IMenuCategory[]>({
      method: 'get',
      url: `/api/unit/menu/byBrandSlug/${slug}`,
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
