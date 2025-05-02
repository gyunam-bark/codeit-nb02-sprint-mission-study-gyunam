import Product from "./Product.mjs"
import PRODUCT_FILTER from "./ProductCategoryCallback.mjs"

export default class GetProductResponse {
  #product

  constructor(json) {
    this.#product = this.#verifyProduct(json)
  }

  get product() {
    return this.#product
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
    return new GetProductResponse(json)
  }
}