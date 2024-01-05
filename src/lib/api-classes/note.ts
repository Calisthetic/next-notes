import { BaseModel } from "./base-model";

export class Note extends BaseModel {
  text: string
  title: string
  userId: string

  constructor(arr:any[]) {
    super(arr[0])
    this.text = arr[1]
    this.title = arr[2]
    this.userId = arr[3]
  }
}