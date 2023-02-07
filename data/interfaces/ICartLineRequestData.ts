

export interface ICartLineModificationRequestData{
  modificationId: string
  quantity: number
}
export interface ICartLineCreateRequestData{
  unitId: number
  productId: string
  quantity: number
  modificationLines?: ICartLineModificationRequestData[]

}
export interface ICartLineUpdateRequestData{
  quantity: number
  modificationLines?: ICartLineModificationRequestData[]
}
