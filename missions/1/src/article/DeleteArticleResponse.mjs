import SprintUtility from "../util/SprintUtility.mjs"

export default class DeleteArticleResponse {
  #id

  constructor({ id }) {
    this.#id = this.#verifyId(id)
  }

  get id() {
    return this.#id
  }

  #verifyId(id) {
    // check datatype
    const number = SprintUtility.from(id, 'number', '[error] deleteArticleResponse : id must be a number.')

    // check requirements
    // min=1
    const MIN = 1
    if (number < MIN) {
      throw Error(`[error] deleteArticleResponse : id must be at least ${MIN}.`)
    }

    return number
  }

  static fromJson(json) {
    return new DeleteArticleResponse(json)
  }

}