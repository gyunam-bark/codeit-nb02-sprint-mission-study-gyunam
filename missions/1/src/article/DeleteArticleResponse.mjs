import ArticleSchemeRequirements from "./ArticleSchemeRequirements.mjs"

export default class DeleteArticleResponse {
  #id

  constructor({ id }) {
    this.#id = ArticleSchemeRequirements.checkIdRequirements(id)
  }

  get id() {
    return this.#id
  }

  static fromJson(json) {
    return new DeleteArticleResponse(json)
  }

}