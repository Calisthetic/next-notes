import { BaseModel } from "./base-model"

export class User extends BaseModel {
  name!: string
  login!: string
  password!: string
}