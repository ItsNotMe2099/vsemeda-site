import request from 'utils/request'
import {ISearchBrandsRequest} from 'data/interfaces/ISearchBrandsRequest'
import {ISearchUnit} from 'data/interfaces/ISearchBrand'

/** поиск через строку, вывод ресторанов и блюд */
export default class SearchRepository {
  static async searchUnits(data: ISearchBrandsRequest): Promise<ISearchUnit[]> {   
    const res = await request<ISearchUnit[]>({
        method: 'post',
        url: '/api/search-units',
        data: data
      }
    )
    return res
  }
}
