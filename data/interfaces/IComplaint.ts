export interface IComplaintType {
  id: string
  name: string,
}

export interface IComplaint {
 
    orderId: number,
    reasonType: IComplaintType['id'],
    text: string,
    assetsIds: string[]
}