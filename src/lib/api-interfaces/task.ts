import { BaseModel } from "./base-model";

export class Task extends BaseModel {
  text!: string
  time!: Date
  userId!: string
}