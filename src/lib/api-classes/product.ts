import { BaseModel } from "./base-model";

export class Product extends BaseModel {
  userId: string
  name: string

  constructor(arr:any[]) {
    super(arr[0])
    this.userId = arr[1]
    this.name = arr[2]
  }
}