import { BaseModel } from "./base-model";

export class ProductOfShop extends BaseModel {
  shopId!: string
  productId!: string
  price!: number
  description: string = ""
}