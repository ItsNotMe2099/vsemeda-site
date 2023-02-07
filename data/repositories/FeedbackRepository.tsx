import request from 'utils/request'
import { IPagination, IPaginationRequest} from 'types/types'
import {IReview} from 'data/interfaces/IReview'

export default class FeedbackRepository {
  static async fetchByUnitId(unitId: number, data: IPaginationRequest): Promise<IPagination<IReview>> {
    const res = await request<IPagination<IReview>>({
      method: 'get',
      url: `/api/review/byUnit/${unitId}`,
      data
    })
    return res
  }
}
