import { BaseModel } from "./base-model";

export class Task extends BaseModel {
  text: string
  time: Date
  userId: string

  constructor(arr:any[]) {
    super(arr[0])
    this.text = arr[1]
    this.time = arr[2]
    this.userId = arr[3]
  }
}