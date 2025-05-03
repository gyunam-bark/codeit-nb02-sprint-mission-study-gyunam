import ProductSchemeRequirements from "./ProductSchemeRequirements.mjs";

export default class GetProductRequest {
  #productId

  constructor({ productId = 0 }) {
    this.#productId = ProductSchemeRequirements.checkIdRequirements(productId)
  }

  toParameter() {
    return `/${this.#productId}`
  }

  static fromJson(json) {
    return GetArticleRequest(json)
  }
}