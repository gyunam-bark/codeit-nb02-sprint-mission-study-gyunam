import SprintUtility from "./SprintUtility.mjs"

export default class GetArticleListRequest {
  #page
  #pageSize
  #keyword

  constructor(scheme = {}) {
    const { page, pageSize, keyword } = scheme

    this.#page = page !== undefined ? this.#verifyPage(page) : null
    this.#pageSize = pageSize !== undefined ? this.#verifyPageSize(pageSize) : null
    this.#keyword = keyword !== undefined ? this.#verifyKeyword(keyword) : null
  }

  get page() {
    return this.#page
  }

  get pageSize() {
    return this.#pageSize
  }

  get keyword() {
    return this.#keyword
  }

  #verifyPage(page) {
    // check datatype
    const number = SprintUtility.from(page, 'number', '[error] getArticleListRequest : /articles/ query.page must be a number.')

    // check requirements
    // min=1
    if (number < 1) {
      throw Error(`[error] getArticleListRequest : /articles/ query.page must be at least 1.`)
    }

    return number
  }

  #verifyPageSize(pageSize) {
    // check datatype
    const number = SprintUtility.from(pageSize, 'number', '[error] getArticleListRequest : /articles/ query.pageSize must be a number.')

    // check requirements
    // min=1
    if (number < 1) {
      throw Error(`[error] getArticleListRequest : /articles/ query.pageSize must be at least 1.`)
    }

    return number
  }

  #verifyKeyword(keyword) {
    // check datatype
    const string = SprintUtility.from(keyword, 'string', '[error] getArticleListRequest : /articles/ query.keyword must be a string.')

    // check requirements
    // none

    return string
  }

  toQuery() {
    const query = {}

    if (this.#page !== null && this.#page > 0) {
      query.page = this.#page
    }

    if (this.#pageSize !== null && this.#pageSize > 0) {
      query.pageSize = this.#pageSize
    }

    if (this.#keyword !== null) {
      query.keyword = this.#keyword
    }

    return query
  }

  static fromJson(json) {
    return new GetArticleListRequest(json)
  }

  toJson() {
    return {
      page: this.#page,
      pageSize: this.#pageSize,
      keyword: this.#keyword
    }
  }
}