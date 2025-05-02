import SprintUtility from "../util/SprintUtility.mjs";

export default class GetProductRequest {
  #productId

  constructor({ productId = 0 }) {
    this.#productId = this.#verifyId(productId)
  }

  #verifyId(id) {
    // check datatype
    const number = SprintUtility.from(id, 'number', '[ERROR] GetProductRequest : /products/{productId} must be a number.')

    // check requirements
    // min=1
    const MIN = 1
    if (number < MIN) {
      throw Error(`[ERROR] GetProductRequest : /products/{productId} must be at least ${MIN}.`)
    }

    return number
  }
  toParameter() {
    return `/${this.#productId}`
  }

  static fromJson(json) {
    return GetArticleRequest(json)
  }

  toJson() {
    return {
      articleId: this.#productId
    }
  }
}