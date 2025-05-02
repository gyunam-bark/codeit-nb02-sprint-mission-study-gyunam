import Product from "./Product.mjs";
import SprintUtility from "../util/SprintUtility.mjs";

export default class ElectronicProduct extends Product {
  #manufacturer

  constructor({ id = 0, name = '', description = '', price = 0, tags = [], images = [], favoriteCount = 0, createdAt = '', manufacturer = '' }) {
    super({ id, name, description, price, tags, images, createdAt, favoriteCount, createdAt })
    this.#manufacturer = this.#verifyManufacturer(manufacturer)
  }

  get manufacturer() {
    return this.#manufacturer
  }

  #verifyManufacturer(manufacturer) {
    // check datatype
    const string = SprintUtility.from(manufacturer, 'string', '[ERROR] ElectronicProduct : manufacurer must be a string.')

    // check requirements
    // none

    return string
  }

  static fromJson(json) {
    return new ElectronicProduct(json)
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      tags: this.tags,
      images: this.iamges,
      favoriteCount: this.favoriteCount,
      createdAt: this.createdAt,
      manufacturer: this.#manufacturer
    }
  }
}