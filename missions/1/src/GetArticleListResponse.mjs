import SprintUtility from "./SprintUtility.mjs"
import Article from "./Article.mjs"

export default class GetArticleListResponse {
  #totalCount
  #list

  constructor({ totalCount = 0, list = [] }) {
    this.#totalCount = this.#verifyTotalCount(totalCount)
    this.#list = this.#verifyList(list)
  }

  get totalCount() {
    return this.#totalCount
  }

  get list() {
    return this.#list
  }

  #verifyTotalCount(totalCount) {
    // check datatype
    const number = SprintUtility.from(totalCount, 'number', '[error] ArticleListResponse.totalCount must be a number.')

    // check requirements
    // only positive
    if (number < 0 || !Number.isInteger(number)) {
      throw Error(`[error] ArticleListResponse.totalCount must be positive integer.`)
    }

    return number
  }

  #verifyList(list) {
    // check datatype
    const array = SprintUtility.from(list, 'array', '[error] ArticleListResponse.list must be a array.')

    // check requirements
    // datatype in must be Article 
    const articleList = []

    for (const json of array) {
      articleList.push(Article.fromJson(json))
    }

    return articleList
  }

  static fromJson(json) {
    return new GetArticleListResponse(json)
  }
}