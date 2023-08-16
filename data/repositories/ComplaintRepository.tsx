import { IComplaint, IComplaintType } from 'data/interfaces/IComplaint'
import request from 'utils/request'

export default class ComplaintRepository {
  static async getComplaintTypes(): Promise<IComplaintType[]> {
    const res = await request<IComplaintType[]>({
      method: 'get',
      url: '/api/complaint/types',
    })
    return res
  }


  //TODO: починить типы когда получу ответ от сервера
  static async postComplaint(data: IComplaint): Promise<any> {
    const res = await request<any>({
      method: 'post',
      url: '/api/complaint',
      data
    })
    return res
  }
}