import request from 'utils/request'
import { IPagination, IPaginationRequest} from 'types/types'
import {ILocation} from 'data/interfaces/ILocation'
import queryString from 'query-string'
import {IOrder, IOrderPaymentData} from 'data/interfaces/IOrder'
import {IOrderCreateRequest} from 'data/interfaces/IOrderCreateRequest'
import {IReviewCreateRequest} from 'data/interfaces/IReviewCreateRequest'
export default class OrderRepository {
  static async fetchActive(): Promise<IOrder[]> {
    const res = await request<IOrder[]>({
      method: 'get',
      url: '/api/order/active',
    })
    return res
  }

  static async fetchHistory(data: IPaginationRequest): Promise<IPagination<IOrder>> {
    const res = await request<IPagination<IOrder>>({
      method: 'get',
      url: `/api/order/history`,
      data
    })
    return res
  }

  static async fetchById(id: string): Promise<IOrder> {
    const res = await request<IOrder>({
      method: 'get',
      url: `/api/order/${id}`,
    })
    return res
  }


  static async create(location: ILocation, data: IOrderCreateRequest): Promise<IOrder> {
    const res = await request<IOrder>({
      method: 'post',
      url: `/api/cart/current?${queryString.stringify(location)}`,
      data,
    })
    return res
  }

  static async payById(id: string): Promise<IOrderPaymentData> {
    const res = await request<IOrderPaymentData>({
      method: 'get',
      url: `/api/order/${id}/pay`,
    })
    return res
  }

  static async createFeedBack(orderId: string, data: IReviewCreateRequest): Promise<boolean> {
    const res = await request<any>({
      method: 'post',
      url: `/api/order/${orderId}/feedback`,
      data
    })
    return res
  }
}
