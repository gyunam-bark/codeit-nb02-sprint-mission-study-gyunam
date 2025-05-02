import Article from "./Article.mjs";

export default class PatchArticleResponse {
  #article

  constructor(json) {
    this.#article = this.#verifyArticle(json)
  }

  get article() {
    return this.#article
  }

  #verifyArticle(json) {
    // default
    return Article.fromJson(json)
  }

  static fromJson(json) {
    console.log(json)
    return new PatchArticleResponse(json)
  }
}