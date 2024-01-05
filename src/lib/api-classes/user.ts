import { BaseModel } from "./base-model"

export class User extends BaseModel {
  name: string
  login: string
  password: string

  constructor(arr:any[]) {
    super(arr[0])
    this.name = arr[1]
    this.login = arr[2]
    this.password = arr[3]
  }
}