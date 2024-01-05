import { BaseModel } from "./base-model";

export class WeightOfOne extends BaseModel {
  productId: string
  weight: number

  constructor(arr:any[]) {
    super(arr[0])
    this.productId = arr[1]
    this.weight = arr[2]
  }
}