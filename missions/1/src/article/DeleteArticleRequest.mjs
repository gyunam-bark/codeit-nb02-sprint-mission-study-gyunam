import SprintUtility from "../util/SprintUtility.mjs"

export default class DeleteArticleRequest {
  #articleId

  constructor({ articleId = 0 }) {
    this.#articleId = this.#verifyId(articleId)
  }

  get articleId() {
    return this.#articleId
  }

  #verifyId(id) {
    // check datatype
    const number = SprintUtility.from(id, 'number', '[error] DeleteArticleRequest : /articles/{articleId} must be a number.')

    // check requirements
    // min=1
    if (number < 1) {
      throw Error(`[error] DeleteArticleRequest : /articles/{articleId} must be at least 1.`)
    }

    return number
  }

  toParameter() {
    return `/${this.#articleId}`
  }

  static fromJson(json) {
    return DeleteArticleRequest(json)
  }

  toJson() {
    return {
      articleId: this.#articleId
    }
  }
}