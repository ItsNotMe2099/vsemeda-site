import request from 'utils/request'
import {IUnitIndexRequest} from 'data/interfaces/IUnitIndexRequest'
import {IInitialData} from 'data/interfaces/InititalData'

export default class InitialDataRepository {
  static async fetchInitialData(data: IUnitIndexRequest): Promise<IInitialData> {
    const res = await request<IInitialData>({
      method: 'post',
      url: '/api/initial-data',
      data,
    })
    return res
  }
}
