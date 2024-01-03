import { BaseModel } from "./base-model";

export class Birthday extends BaseModel {
  name!: string
  date!: Date
  description: string = ""
  userId!: string
}