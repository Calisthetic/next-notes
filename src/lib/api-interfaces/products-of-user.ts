import { BaseModel } from "./base-model";

export class ProductOfUser extends BaseModel {
  userId!: string
  productId!: string
  count!: number
}