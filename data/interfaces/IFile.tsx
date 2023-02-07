export interface IFocalPoint{
  x: number,
  y: number
}

export default interface IFile {
  link: string
  focalPoint?: IFocalPoint

}
