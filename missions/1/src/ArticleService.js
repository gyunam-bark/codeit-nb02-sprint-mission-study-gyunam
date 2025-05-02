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

  static async getArticle(request) {
    if (request instanceof GetArticleRequest === false) {
      throw new TypeError(`[error] getArticle : request must be a instance of GetArticleRequest.`)
    }

    return this.#axiosInstance.get(request.toParameter())
      .then(
        response => GetArticleResponse.fromJson(response.data))
      .catch(
        error => { throw error })
  }

  static async getArticleList(request) {
    if (request instanceof GetArticleListRequest === false) {
      throw new TypeError(`[error] getArticle : request must be a instance of GetArticleRequest.`)
    }

    return this.#axiosInstance.get(``, { params: request.toQuery() })
      .then(
        response => {
          const getArticleListResponse = GetArticleListResponse.fromJson(response.data)
          const articleList = getArticleListResponse.list

          return articleList
        })
      .catch(
        error => {
          //console.error(error)
          throw error
        })
  }

  static async createArticle(request) {
    if (request instanceof CreateArticleRequest === false) {
      throw new TypeError(`[error] createArticle : request must be a instance of CreateArticleRequest.`)
    }

    return this.#axiosInstance.post(``, request.toQuery())
      .then(
        response => CreateArticleResponse.fromJson(response.data))
      .catch(
        error => {
          throw error
        })
  }

  static async patchArticle(request) {
    if (request instanceof PatchArticleRequest === false) {
      throw new TypeError(`[error] patchArticle : request must be a instance of PatchArticleRequest.`)
    }

    return this.#axiosInstance.patch(request.toParameter(), request.toQuery())
      .then(response => PatchArticleResponse.fromJson(response.data))
      .catch(
        error => {
          throw error
        })
  }

  static async deleteArticle(request) {
    if (request instanceof DeleteArticleRequest === false) {
      throw new TypeError(`[error] deleteArticle : request must be a instance of DeleteArticleRequest.`)
    }
    return this.#axiosInstance.delete(request.toParameter())
      .then(response => {
        return DeleteArticleResponse.fromJson(response.data)
      })
      .catch(
        error => {
          console.error(error)
          throw error
        })
  }
}
