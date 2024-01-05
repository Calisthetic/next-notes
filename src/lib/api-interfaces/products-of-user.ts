import { BaseModel } from "./base-model";

export class ProductOfUser extends BaseModel {
  userId: string
  productId: string
  count: number

  constructor(arr:any[]) {
    super(arr[0])
    this.userId = arr[1]
    this.productId = arr[2]
    this.count = parseInt(arr[3])
  }
}