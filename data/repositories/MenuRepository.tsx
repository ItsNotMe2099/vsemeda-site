import request from 'utils/request'
import { ICategory } from 'data/interfaces/ICategory'

export default class MenuRepository {

  static async fetchCategories(): Promise<ICategory[]> {
    const res = await request<ICategory[]>({
      method: 'get',
      url: '/api/menu/category',
    })
    return res
  }
}
