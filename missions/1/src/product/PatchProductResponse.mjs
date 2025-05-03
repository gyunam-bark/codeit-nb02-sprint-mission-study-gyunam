import ProductCallbacks from "./ProductCallbacks.mjs"

export default class PatchProductResponse {
  #product

  constructor(json) {
    this.#product = ProductCallbacks.setProductByTag(json)
  }

  get product() {
    return this.#product
  }

  static fromJson(json) {
    return new PatchProductResponse(json)
  }
}