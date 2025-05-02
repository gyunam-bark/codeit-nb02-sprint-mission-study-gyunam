import axios from "axios";
import Article from "./article/Article.mjs";
import GetArticleRequest from "./article/GetArticleRequest.mjs";
import GetArticleResponse from "./article/GetArticleResponse.mjs";
import GetArticleListRequest from "./article/GetArticleListRequest.mjs";
import GetArticleListResponse from "./article/GetArticleListResponse.mjs";
import CreateArticleRequest from "./article/CreateArticleRequest.mjs";
import CreateArticleResponse from "./article/CreateArticleResponse.mjs";
import PatchArticleRequest from "./article/PatchArticleRequest.mjs";
import PatchArticleResponse from "./article/PatchArticleResponse.mjs";
import DeleteArticleRequest from "./article/DeleteArticleRequest.mjs";
import DeleteArticleResponse from "./article/DeleteArticleResponse.mjs"


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
    const request = new GetArticleRequest({ articleId: articleId })

    return this.#axiosInstance.get(request.toParameter())
      .then(
        response => {
          const getArticleResponse = GetArticleResponse.fromJson(response.data)
          const article = getArticleResponse.article

          return article
        })
      .catch(error => { throw error })
  }

  static async getArticleList(schemes = {}) {
    const { page, pageSize, keyword } = schemes

    const request = new GetArticleListRequest({ page: page, pageSize: pageSize, keyword: keyword })

    return this.#axiosInstance.get(``, { params: request.toQuery() })
      .then(
        response => {
          const getArticleListResponse = GetArticleListResponse.fromJson(response.data)
          const articleList = getArticleListResponse.list

          return articleList
        })
      .catch(
        error => { throw error })
  }

  static async createArticle(schemes = {}) {
    const { title, content, image } = schemes

    const request = new CreateArticleRequest({ title: title, content: content, image: image })

    return this.#axiosInstance.post(``, request.toQuery())
      .then(
        response => CreateArticleResponse.fromJson(response.data))
      .catch(error => { throw error })
  }

  static async patchArticle(articleId = 0, schemes = {}) {
    const { title, content, image } = schemes

    const request = new PatchArticleRequest({ articleId: articleId, title: title, cotent: content, image: image })

    return this.#axiosInstance.patch(request.toParameter(), request.toQuery())
      .then(response => {
        const patchArticleResponse = PatchArticleResponse.fromJson(response.data)
        const article = patchArticleResponse.article

        return article
      })
      .catch(error => { throw error })
  }

  static async deleteArticle(articleId = 0) {
    const request = new DeleteArticleRequest({ articleId: articleId })

    return this.#axiosInstance.delete(request.toParameter())
      .then(response => {
        return DeleteArticleResponse.fromJson(response.data)
      })
      .catch(error => { throw error })
  }
}
