import Article from "./Article.mjs";

export default class GetArticleResponse {
  #article

  constructor(json) {
    this.#article = Article.fromJson(json)
  }

  get article() {
    return this.#article
  }

  static fromJson(json) {
    return new GetArticleResponse(json)
  }
}