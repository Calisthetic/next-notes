import { BaseModel } from "./base-model";

export class Product extends BaseModel {
  name: string
  categoryId: string
  unitId: string

  constructor(arr:any[]) {
    super(arr[0])
    this.name = arr[1]
    this.categoryId = arr[2]
    this.unitId = arr[3]
  }
}