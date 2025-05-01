import SprintUtility from "./SprintUtility.mjs"

export default class Product {
  #name
  #description
  #price
  #tags
  #images
  #favoriteCount

  constructor(name = '', description = '', price = 0, tags = [], images = [], favoriteCount = 0) {
    this.#name = SprintUtility.from(name, 'string', 'Product.name must be a string.')
    this.#description = SprintUtility.from(description, 'string', 'Product.description must be a string.')
    this.#price = SprintUtility.from(price, 'number', 'Product.price must be a number.')
    this.#tags = SprintUtility.from(tags, 'array', 'Product.tags must be a array.')
    this.#images = SprintUtility.from(images, 'array', 'Product.images must be a array.')
    this.#favoriteCount = SprintUtility.from(favoriteCount, 'number', 'Product.favoriteCount must be a number.')
  }

  get name() {
    return this.#name
  }

  get description() {
    return this.#description
  }

  get price() {
    return this.#price
  }

  get tags() {
    return this.#tags
  }

  get images() {
    return this.#images
  }

  get favoriteCount() {
    return this.#favoriteCount
  }

  favorite() {
    this.#favoriteCount += 1
  }
}