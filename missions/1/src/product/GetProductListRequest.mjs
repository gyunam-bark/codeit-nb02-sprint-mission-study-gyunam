import SprintUtility from "../util/SprintUtility.mjs"

export default class GetProductListRequest {
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
    const number = SprintUtility.from(page, 'number', '[ERROR] GetProductListRequest : /products/ query.page must be a number.')

    // check requirements
    // min=1
    const MIN = 1
    if (number < MIN) {
      throw Error(`[ERROR] GetProductListRequest : /products/ query.page must be at least ${MIN}.`)
    }

    return number
  }

  #verifyPageSize(pageSize) {
    // check datatype
    const number = SprintUtility.from(pageSize, 'number', '[ERROR] GetProductListRequest : /products/ query..pageSize must be a number.')

    // check requirements
    // min=1
    const MIN = 1
    if (number < MIN) {
      throw Error(`[ERROR] GetProductListRequest : /products/ query.pageSize must be at least ${MIN}.`)
    }

    return number
  }

  #verifyKeyword(keyword) {
    // check datatype
    const string = SprintUtility.from(keyword, 'string', '[ERROR] GetProductListRequest : /products/ query.keyword must be a string.')

    // check requirements
    // none

    return string
  }

  toQuery() {
    const query = {}

    if (this.#page !== null) {
      query.page = this.#page
    }

    if (this.#pageSize !== null) {
      query.pageSize = this.#pageSize
    }

    if (this.#keyword !== null) {
      query.keyword = this.#keyword
    }

    return query
  }

  static fromJson(json) {
    return new GetProductListRequest(json)
  }

}