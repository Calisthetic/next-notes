import { BaseModel } from "./base-model";

export class Task extends BaseModel {
  title: string
  time: Date
  userId: string
  text: string

  constructor(arr:any[]) {
    super(arr[0])
    this.title = arr[1]
    this.time = arr[2]
    this.userId = arr[3]
    this.text = arr[4]
  }
}