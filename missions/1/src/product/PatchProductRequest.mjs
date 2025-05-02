import SprintUtility from "../util/SprintUtility.mjs"

export default class PatchProductRequest {
  #productId
  #name
  #description
  #price
  #tags
  #images

  // requirements : productId
  // options : name, description, price, tags, images
  constructor(schemes = {}) {
    const { productId, name, description, price, tags, images } = schemes

    this.#productId = this.#verifyId(productId)

    this.#name = name !== undefined ? this.#verifyName(name) : null
    this.#description = description !== undefined ? this.#verifyDescription(description) : null
    this.#price = price !== undefined ? this.#verifyPrice(price) : null
    this.#tags = tags !== undefined ? this.#verifyTags(tags) : null
    this.#images = images !== undefined ? this.#verifyImages(images) : null
  }

  get productId() {
    return this.#productId
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

  #verifyId(id) {
    // check datatype
    const number = SprintUtility.from(id, 'number', '[error] PatchProductRequest : /products/{productId} must be a number.')

    // check requirements
    // min=1
    const MIN = 1
    const IS_INTEGER = Number.isInteger(number)
    if (number < MIN) {
      throw Error(`[error] PatchProductRequest : /products/{productId} must be at least ${MIN}.`)
    } else if (IS_INTEGER === false) {
      throw Error(`[error] PatchProductRequest : /products/{productId} must be a integer.`)
    }

    return number
  }

  #verifyName(name) {
    // check datatype
    const string = SprintUtility.from(name, 'string', '[error] Product.name must be a string.')

    // check requirements
    // min=1, max=30
    const stringLength = string.length
    const MIN = 1
    const MAX = 30

    if (stringLength < MIN) {
      throw new Error(`[error] Product.title length at least ${MIN}`)
    } else if (stringLength > MAX) {
      throw new Error(`[error] Product.title length must be smaller than ${MAX}`)
    }

    return string
  }

  #verifyDescription(description) {
    // check datatype
    const string = SprintUtility.from(description, 'string', '[error] Product.description must be a string.')

    // check requirements
    // none

    return string
  }

  #verifyPrice(price) {
    // check datatype
    const number = SprintUtility.from(price, 'number', '[error] Product.price must be a number.')

    // check requirements
    // min=0
    const MIN = 0

    if (number < MIN) {
      throw new Error(`[error] Product.price must be positive.`)
    }

    return price
  }

  #verifyTags(tags) {
    // check datatype
    const array = SprintUtility.from(tags, 'array', '[error] Product.tags must be a array.')

    // check requirements
    // min=1
    const MIN = 1

    const arrayLength = array.length

    if (arrayLength < MIN) {
      throw new Error(`[error] Product.tags length at least ${MIN}.`)
    }

    const verifiedArray = array.map((tag) => this.#verifyTag(tag))

    return verifiedArray
  }

  #verifyTag(tag) {
    // check datatype
    const string = SprintUtility.from(tag, 'string', '[error] Product.tags.tag must be a string.')

    // check requirements
    // min=1
    // max=20
    const MIN = 1
    const MAX = 20

    const tagLength = string.length

    if (tagLength < MIN) {
      throw new Error(`[error] Product.tag length at least ${MIN}.`)
    } else if (tagLength > MAX) {
      throw new Error(`[error] Product.tag length must be smaller than ${MAX}.`)
    }

    return tag
  }

  #verifyImages(images) {
    // check datatype
    const array = SprintUtility.from(images, 'array', '[error] Product.images must be a array.')

    // check requirements
    // min=1
    const MIN = 1
    const arrayLength = array.length

    if (arrayLength < MIN) {
      throw new Error(`[error] Product.images length at least ${MIN}.`)
    }

    const verifiedArray = array.map((image) => this.#verifyImage(image))

    return verifiedArray
  }

  #verifyImage(image) {
    // check datatype
    const string = SprintUtility.from(image, 'string', '[error] Product.image must be a string.')

    // check requirements
    // start with http:// or https:// and at lest 1 character
    const PATTERN = /^https?:\/\/.+/
    const IS_NOT_FOLLOW_PATTERN = !PATTERN.test(string)

    if (IS_NOT_FOLLOW_PATTERN) {
      throw new Error(`[error] Product.images.image must start with http://... or https:///...`)
    }

    return string
  }

  toParameter() {
    return `/${this.#productId}`
  }

  toQuery() {
    const query = {}

    if (this.#name !== null) {
      query.name = this.#name
    }

    if (this.#description != null) {
      query.description = this.#description
    }

    if (this.#price != null) {
      query.price = this.#price
    }

    if (this.#tags != null) {
      query.tags = this.#tags
    }

    if (this.#images != null) {
      query.images = this.#images
    }

    return query
  }

  static fromJson(json) {
    return new PatchProductRequest(json)
  }
}