import SprintUtility from "../util/SprintUtility.mjs"
import Product from "./Product.mjs"
import PRODUCT_FILTER from "./ProductCategoryCallback.mjs"

export default class getProductListResponse {
  #totalCount
  #list

  constructor({ totalCount = 0, list = [] }) {
    this.#totalCount = this.#verifyTotalCount(totalCount)
    this.#list = this.#verifyList(list)
  }

  get totalCount() {
    return this.#totalCount
  }

  get list() {
    return this.#list
  }

  #verifyTotalCount(totalCount) {
    // check datatype
    const number = SprintUtility.from(totalCount, 'number', '[error] GetProductListResponse.totalCount must be a number.')

    // check requirements
    // only positive
    if (number < 0 || !Number.isInteger(number)) {
      throw Error(`[error] GetProductListResponse.totalCount must be positive integer.`)
    }

    return number
  }

  #verifyList(list) {
    // check datatype
    const array = SprintUtility.from(list, 'array', '[error] GetProductListResponse.list must be a array.')

    // check requirements
    // datatype in must be Article 
    const productList = []

    for (const json of array) {
      const product = this.#verifyProduct(json)
      productList.push(product)
    }

    return productList
  }

  #verifyProduct(json) {
    const tags = json.tags

    const key = Object.keys(PRODUCT_FILTER).find(tag => tags.includes(tag));

    // category
    if (key) { return PRODUCT_FILTER[key](json) }

    // default
    return Product.fromJson(json)
  }

  static fromJson(json) {
    return new GetArticleListResponse(json)
  }
}