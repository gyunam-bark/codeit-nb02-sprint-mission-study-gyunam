// /articles/{articleId}
import SprintUtility from "../util/SprintUtility.mjs"
import ArticleSchemeRequirements from "./ArticleSchemeRequirements.mjs"

export default class GetArticleRequest {
  #articleId

  constructor({ articleId = 0 }) {
    this.#articleId = ArticleSchemeRequirements.checkIdRequirements(articleId)
  }

  get articleId() {
    return this.#articleId
  }

  toParameter() {
    return `/${this.#articleId}`
  }

  static fromJson(json) {
    return GetArticleRequest(json)
  }

}