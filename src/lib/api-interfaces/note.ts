import { BaseModel } from "./base-model";

export class Note extends BaseModel {
  text!: string
  title!: string
  userId!: string
}