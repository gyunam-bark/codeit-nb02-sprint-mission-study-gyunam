import ArticleSchemeRequirements from "../article/ArticleSchemeRequirements.mjs"

export default class DeleteProductResponse {
  #id

  constructor({ id }) {
    this.#id = ArticleSchemeRequirements.checkIdRequirements(id)
  }

  get id() {
    return this.#id
  }

  static fromJson(json) {
    return new DeleteProductResponse(json)
  }
}