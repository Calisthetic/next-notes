export class BaseModel {
  readonly id: string = "id"

  constructor(id?: string) {
    if (id !== undefined) {
      this.id = id
    }
  }
}