import axios from "axios";
import GetProductRequest from "./product/GetProductRequest.mjs";
import GetProductResponse from "./product/GetProductResponse.mjs";

export default class ProductService {
  static #axiosInstance = new axios.create({
    baseURL: 'https://panda-market-api-crud.vercel.app/products',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  constructor() { }

  static async getProduct(productId = 0) {
    try {
      const request = new GetProductRequest({ productId: productId })
      const response = await this.#axiosInstance.get(request.toParameter())
      const product = GetProductResponse.fromJson(response.data).product

      return product
    } catch (error) {
      throw error
    }

  }

  static async getProductList(schemes = {}) {
    try {
      const { page, pageSize, keyword } = schemes

      const request = new GetProductListRequest({ page: page, pageSize: pageSize, keyword: keyword })

      const response = await this.#axiosInstance.get(``, { params: request.toQuery() })
      const getProductListResponse = GetProductResponse.fromJson(response.data)
      const productList = getProductListResponse.list

      return productList
    } catch (error) {
      throw error
    }

  }

  static async createProduct(schemes = {}) { }

  static async deleteProduct(productId = 0) { }
}