import { BaseModel } from "./base-model";

export class Shop extends BaseModel {
  name: string

  constructor(arr:any[]) {
    super(arr[0])
    this.name = arr[1]
  }
}