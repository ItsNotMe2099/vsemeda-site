import request from 'utils/request'
import { IPagination, IPaginationRequest} from 'types/types'
// import {ILocation} from 'data/interfaces/ILocation'
// import queryString from 'query-string'
import {IOrder, IOrderPaymentData} from 'data/interfaces/IOrder'
import {IOrderCreateRequest} from 'data/interfaces/IOrderCreateRequest'
import {IReviewCreateRequest} from 'data/interfaces/IReviewCreateRequest'
import { OrderCancelReason } from 'data/enum/OrderState'
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
      url: '/api/order/history',
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


  static async cancel(id: string, data: {cancelReason: OrderCancelReason}): Promise<IOrder> {
    const res = await request<IOrder>({
      method: 'put',
      url: `/api/order/${id}/cancel`,
      data
    })
    return res
  }


  static async create(data: IOrderCreateRequest): Promise<IOrder> {
    const res = await request<IOrder>({
      method: 'post',
      url: '/api/order',
      data,
    })
    return res
  }

  static async payById(id: string): Promise<IOrderPaymentData> {
    const res = await request<IOrderPaymentData>({
      method: 'post',
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

  // пофиксить типизацию
  static async getOrderStatusById(orderId: string): Promise<IOrder> {
    const res = await request<any>({
      method: 'get',
      url: '/api/order/' + orderId
    })
    return res
  }
}
