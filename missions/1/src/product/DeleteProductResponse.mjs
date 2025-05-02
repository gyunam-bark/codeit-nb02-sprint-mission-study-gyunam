import SprintUtility from "../util/SprintUtility.mjs"

export default class DeleteProductResponse {
  #id

  constructor({ id }) {
    this.#id = this.#verifyId(id)
  }

  get id() {
    return this.#id
  }

  #verifyId(id) {
    // check datatype
    const number = SprintUtility.from(id, 'number', '[ERROR] deleteProductResponse : id must be a number.')

    // check requirements
    // min=1
    const MIN = 1
    if (number < MIN) {
      throw Error(`[ERROR] deleteProductResponse : id must be at least ${MIN}.`)
    }

    return number
  }

  static fromJson(json) {
    return new DeleteProductResponse(json)
  }
}