import axios from "axios";
import GetProductRequest from "./product/GetProductRequest.mjs";
import GetProductResponse from "./product/GetProductResponse.mjs";
import GetProductListRequest from "./product/GetProductListRequest.mjs";
import GetProductListResponse from "./product/GetProductListResponse.mjs";
import CreateProductRequest from "./product/CreateProductRequest.mjs"
import CreateProductResponse from "./product/CreateProductResponse.mjs";

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
    } catch (error) { throw error }

  }

  static async getProductList(schemes = {}) {
    try {
      const { page, pageSize, keyword } = schemes

      const request = new GetProductListRequest({ page: page, pageSize: pageSize, keyword: keyword })
      const response = await this.#axiosInstance.get(``, { params: request.toQuery() })
      const getProductListResponse = GetProductListResponse.fromJson(response.data)
      const productList = getProductListResponse.list

      return productList
    } catch (error) { throw error }
  }

  static async createProduct(name = '', description = '', price = 0, tags = [], images = []) {
    try {
      const request = new CreateProductRequest({ name: name, description: description, price: price, tags: tags, images: images })
      const response = await this.#axiosInstance.post(``, request.toQuery())
      const createProductResponse = CreateProductResponse.fromJson(response.data)
      const product = createProductResponse.product

      return product
    } catch (error) { throw error }
  }

  static async patchProduct(productId, schemes = {}) {
    const { } = schemes

  }

  static async deleteProduct(productId = 0) { }
}