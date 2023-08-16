export interface IFocalPoint{
  x: number,
  y: number
}

export default interface IFile {
  link: string
  focalPoint?: IFocalPoint

}


export interface IFileDownload {
  id: string
  name: string
  source: string
  type: 'IMAGE' | 'BINARY'
  fileSize: number
  focalPoint?: IFocalPoint
  authorName?: string
  metadata: {
    width?: number
    height?: number
  }
}