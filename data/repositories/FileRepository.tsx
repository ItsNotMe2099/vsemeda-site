import request from 'utils/request'
import { IFileDownload } from 'data/interfaces/IFile'
import {AxiosRequestConfig} from 'axios'

export default class FileRepository {
  static async uploadFile(file: File, config?: AxiosRequestConfig): Promise<IFileDownload> {
    return request({
      url: '/api/user-asset/upload',
      file: file,
      method: 'put',
      config
    })
  }
  static async deleteMyFile(id: number | string): Promise<{id: string}> {
    return request({
      url: `/api/user-asset/${id}`,
      method: 'delete',
    })
  }
}
