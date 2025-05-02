import axios from "axios";

export default class ProductService {
  static #axiosInstance = new axios.create({
    baseURL: 'https://panda-market-api-crud.vercel.app/products',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  constructor() { }

  static async getProduct() { }
}