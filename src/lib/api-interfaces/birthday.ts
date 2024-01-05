import { BaseModel } from "./base-model";

export class Birthday extends BaseModel {
  name: string
  date: Date
  description: string = ""
  userId: string

  constructor(arr:any[]) {
    super(arr[0])
    this.name = arr[1]
    this.date = new Date(arr[2])
    this.description = arr[3]
    this.userId = arr[4]
  }
}