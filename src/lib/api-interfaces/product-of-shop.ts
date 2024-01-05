import { BaseModel } from "./base-model";

export class ProductOfShop extends BaseModel {
  shopId: string
  productId: string
  price: number
  description: string

  constructor(arr:any[]) {
    super(arr[0])
    this.shopId = arr[1]
    this.productId = arr[2]
    this.price = parseFloat(arr[3])
    this.description = arr[4]
  }
}