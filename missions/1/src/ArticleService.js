import axios from "axios";
import SprintUtility from "./SprintUtility.mjs";
import Article from "./Article.mjs";
import ArticleListResponse from "./ArticleListResponse.mjs";

export default class ArticleService {
  static #axiosInstance = new axios.create({
    baseURL: 'https://panda-market-api-crud.vercel.app/articles',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  constructor() { }

  static async getArticle(articleId = 0) {
    const id = this.#verifyParameterId(articleId)

    return this.#axiosInstance.get(`/${id}`)
      .then(
        response => Article.fromJson(response.data))
      .catch(
        error => {
          console.error(error)
          throw error
        })
  }

  static async getArticleList(schemes = {}) {
    const { page, pageSize, keyword } = schemes
    const query = {}

    if (page !== undefined) {
      query.page = this.#verifyParameterPage(page)
    }

    if (pageSize !== undefined) {
      query.pageSize = this.#verifyParameterPageSize(pageSize)
    }

    if (keyword !== undefined) {
      query.keyword = this.#verifyParameterKeyword(keyword)
    }

    return this.#axiosInstance.get(``, { params: query })
      .then(
        response => {
          const articleListResponse = ArticleListResponse.fromJson(response.data)
          const articleList = articleListResponse.list

          return articleList
        })
      .catch(
        error => {
          console.error(error)
          throw error
        })
  }

  static async createArticle(title = '', content = '', schemes = {}) {
    const { image } = schemes
    const query = {}

    query.title = this.#verifyParameterTitle(title)
    query.content = this.#verifyParameterContent(content)

    if (image !== undefined) {
      query.image = this.#verifyParameterImage(image)
    }

    return this.#axiosInstance.post(``, query)
      .then(
        response => Article.fromJson(response.data))
      .catch(
        error => {
          throw error
        })
  }

  static async patchArticle(articleId = 0, schemes = {}) {
    const { title, content, image } = schemes
    const query = {}

    const id = this.#verifyParameterId(articleId)

    if (title !== undefined) {
      query.title = this.#verifyParameterTitle(title)
    }

    if (content !== undefined) {
      query.content = this.#verifyParameterContent(content)
    }

    if (image !== undefined) {
      query.image = this.#verifyParameterImage(image)
    }

    return this.#axiosInstance.patch(`/${id}`, query)
      .then(response => Article.fromJson(response.data))
      .catch(
        error => {
          throw error
        })
  }

  static async deleteArticle(articleId = 0) {
    const id = this.#verifyParameterId(articleId)

    return this.#axiosInstance.delete(`/${id}`)
      .then(response => response.data)
      .catch(
        error => {
          console.error(error)
          throw error
        })
  }

  static #verifyParameterId(id) {
    // check datatype
    const number = SprintUtility.from(id, 'number', '[error] getArticle() parameters.id must be a number.')

    // check requirements
    // min=1
    if (number < 1) {
      throw Error(`[error] getArticle() parameters.id must be at least 1.`)
    }

    return number
  }

  static #verifyParameterPage(page) {
    // check datatype
    const number = SprintUtility.from(page, 'number', '[error] getArticleList() parameters.page must be a number.')

    // check requirements
    // min=1
    if (number < 1) {
      throw Error(`[error] getArticleList() parameters.page must be at least 1.`)
    }

    return number
  }

  static #verifyParameterPageSize(pageSize) {
    // check datatype
    const number = SprintUtility.from(pageSize, 'number', '[error] getArticleList() parameters.pageSize must be a number.')

    // check requirements
    // min=1
    if (number < 1) {
      throw Error(`[error] getArticleList() parameters.pageSize must be at least 1.`)
    }

    return number
  }

  static #verifyParameterKeyword(keyword) {
    // check datatype
    const string = SprintUtility.from(keyword, 'string', '[error] getArticleList() parameters.keyword must be a string.')

    // check requirements
    // none

    return string
  }

  static #verifyParameterTitle(title) {
    // check datatype
    const string = SprintUtility.from(title, 'string', '[error] createArticle() parameters.title must be a string.')

    // check requirements
    // min=1, max=50
    const stringLength = string.length

    if (!stringLength) {
      throw Error(`[error] createArticle() parameters.title length at least 1.`)
    } else if (stringLength > 50) {
      throw Error(`[error] createArticle() parameters.title length must be smaller than 50.`)
    }

    return string
  }

  static #verifyParameterContent(content) {
    // check datatype
    const string = SprintUtility.from(content, 'string', '[error] createArticle() parameters.content must be a string.')

    // check requirements
    // min=1, max=50
    const stringLength = string.length

    if (!stringLength) {
      throw Error(`[error] createArticle() parameters.content length at least 1.`)
    }

    return string
  }

  static #verifyParameterImage(image) {
    // check datatype
    const string = SprintUtility.from(image, ['string', 'null'], `[error] createArticle() parameters.image must be a string or null.`)

    if (string === null) {
      return null
    }

    // check requirements
    const pattern = /^https?:\/\/.+/
    if (!pattern.test(string)) {
      console.error(`[error] createArticle() parameters.image must start with http:// or https://.`)
      return null
    }

    return image
  }

}
