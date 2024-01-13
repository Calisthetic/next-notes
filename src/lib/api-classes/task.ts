import { BaseModel } from "./base-model";

export class Task extends BaseModel {
  time: Date
  userId: string
  text: string
  completed?: string

  constructor(arr:any[]) {
    super(arr[0])
    this.time = arr[1]
    this.userId = arr[2]
    this.text = arr[3]
    this.completed = arr[4]
  }
}