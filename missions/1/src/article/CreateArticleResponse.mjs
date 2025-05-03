import Article from "./Article.mjs";

export default class CreateArticleResponse {
  #article

  constructor(json) {
    this.#article = Article.fromJson(json)
  }

  get article() {
    return this.#article
  }

  static fromJson(json) {
    return new CreateArticleResponse(json)
  }
}