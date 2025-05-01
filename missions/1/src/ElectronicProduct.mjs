import Product from "./Product.mjs";
import SprintUtility from "./SprintUtility.mjs";

export default class ElectronicProduct extends Product {
  #manufacturer

  constructor(name = '', description = '', price = 0, tags = [], images = [], favoriteCount = 0, manufacturer = '') {
    super(name, description, price, tags, images, favoriteCount)
    this.#manufacturer = SprintUtility.from(manufacturer, 'string', 'ElectronicProduct.manufacturer must be a string.')
  }

  get manufacturer() {
    return this.#manufacturer
  }
}