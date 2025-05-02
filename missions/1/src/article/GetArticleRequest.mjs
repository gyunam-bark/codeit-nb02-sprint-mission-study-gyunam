// /articles/{articleId}
import SprintUtility from "../util/SprintUtility.mjs"

export default class GetArticleRequest {
  #articleId

  constructor({ articleId = 0 }) {
    this.#articleId = this.#verifyId(articleId)
  }

  get articleId() {
    return this.#articleId
  }

  #verifyId(id) {
    // check datatype
    const number = SprintUtility.from(id, 'number', '[error] getArticleRequest : /articles/{articleId} must be a number.')

    // check requirements
    // min=1
    const MIN = 1
    if (number < MIN) {
      throw Error(`[error] getArticleRequest : /articles/{articleId} must be at least ${MIN}.`)
    }

    return number
  }

  toParameter() {
    return `/${this.#articleId}`
  }

  static fromJson(json) {
    return GetArticleRequest(json)
  }

}