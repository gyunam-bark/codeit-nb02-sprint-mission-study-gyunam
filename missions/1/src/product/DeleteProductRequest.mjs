import SprintUtility from "../util/SprintUtility.mjs"

export default class DeleteProductRequest {
  #productId

  constructor({ productId = 0 }) {
    this.#productId = this.#verifyId(productId)
  }

  get productId() {
    return this.#productId
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

  toParameter() {
    return `/${this.#productId}`
  }

  static fromJson(json) {
    return new DeleteArticleResponse(json)
  }
}