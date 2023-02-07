import request from 'utils/request'
import {ISearchBrandsRequest} from 'data/interfaces/ISearchBrandsRequest'
import {ISearchUnit} from 'data/interfaces/ISearchBrand'


export default class SearchRepository {
  static async searchUnits(data: ISearchBrandsRequest): Promise<ISearchUnit[]> {
    const res = await request<ISearchUnit[]>({
        method: 'post',
        url: '/api/search',
        data
      }
    )
    return res
  }

}
