import request, { catchNotFoundError } from 'utils/request'
import {IPage} from 'data/interfaces/IPage'



export default class PagesRepository {
  static async fetchBySlug(slug?: string): Promise<IPage | null> {
    if(!slug){
      return null
    }

    try {
      const res = await request<IPage[]>({
        url: '/api/page',
        method: 'get',
        data: {
          s: JSON.stringify({slug})
        },
      })
      return res[0] || null
    } catch (err) {
      catchNotFoundError(err)
    }

    return null
  }
}
