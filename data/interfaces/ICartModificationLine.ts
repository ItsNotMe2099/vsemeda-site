export interface IModification {
  brutto: number|null
  id: string
  modificationGroupId: string
  name: string
  price: number
  type: string
}

export interface ICartModificationLine {
  id: string;
  cartLineId: number;
  modificationId: string;
  quantity: number;
  modification: IModification
}
