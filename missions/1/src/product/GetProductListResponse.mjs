import ProductSchemeRequirements from "./ProductSchemeRequirements.mjs"

export default class GetProductListResponse {
  #totalCount
  #list

  constructor({ totalCount = 0, list = [] }) {
    this.#totalCount = ProductSchemeRequirements.checkTotalCountRequirements(totalCount)
    this.#list = ProductSchemeRequirements.checkListRequirements(list)
  }

  get totalCount() {
    return this.#totalCount
  }

  get list() {
    return this.#list
  }

  static fromJson(json) {
    return new GetProductListResponse(json)
  }
}