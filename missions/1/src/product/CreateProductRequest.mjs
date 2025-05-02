import SprintUtility from "../util/SprintUtility.mjs"

export default class CreateProductRequest {
  #name
  #description
  #price
  #tags
  #images

  // requirements : name, description, price,
  // options : tags, iamges
  constructor(schemes = {}) {
    const { name, description, price, tags, images } = schemes

    this.#name = this.#verifyName(name)
    this.#description = this.#verifyDescription(description)
    this.#price = this.#verifyPrice(price)
    this.#tags = tags !== undefined ? this.#verifyTags(tags) : []
    this.#images = images !== undefined ? this.#verifyImages(images) : []
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

  get iamges() {
    return this.#images
  }

  #verifyName(name) {
    // check datatype
    const string = SprintUtility.from(name, 'string', '[ERROR] CreateProductRequest : name must be a string.')

    // check requirements
    // min=1, max=30
    const MIN = 1
    const MAX = 30
    const stringLength = string.length

    if (stringLength < MIN) {
      throw new Error(`[ERROR] CreateProductRequest : title length at least ${MIN}.`)
    } else if (stringLength > MAX) {
      throw new Error(`[ERROR] CreateProductRequest : title length must be smaller than ${MAX}.`)
    }

    return string
  }

  #verifyDescription(description) {
    // check datatype
    const string = SprintUtility.from(description, 'string', '[ERROR] CreateProductRequest : description must be a string.')

    // check requirements
    // none

    return string
  }

  #verifyPrice(price) {
    // check datatype
    const number = SprintUtility.from(price, 'number', '[ERROR] CreateProductRequest : price must be a string.')

    // check requirements
    // min=0
    const MIN = 0

    if (number < MIN) {
      throw Error(`[ERROR] CreateProductRequest : price length at least ${MIN}.`)
    }

    return number
  }

  #verifyTags(tags) {
    // check datatype
    const array = SprintUtility.from(tags, 'array', '[ERROR] CreateProductRequest : tags must be a array.')

    // check requirements
    // min=0
    const MIN = 0

    const arrayLength = array.length

    if (arrayLength < MIN) {
      throw new Error(`[ERROR] CreateProductRequest : tags length at least ${MIN}.`)
    }

    const verifiedArray = array.map((tag) => this.#verifyTag(tag))

    return verifiedArray
  }

  #verifyTag(tag) {
    // check datatype
    const string = SprintUtility.from(tag, 'string', '[ERROR] CreateProductRequest : tags.tag must be a string.')

    // check requirements
    // min=1
    // max=20
    const MIN = 1
    const MAX = 20

    const tagLength = string.length

    if (tagLength < MIN) {
      throw new (`[ERROR] CreateProductRequest : tag length at least ${MIN}.`)
    } else if (tagLength > MAX) {
      throw new (`[ERROR] CreateProductRequest : tag length must be smaller than ${MAX}.`)
    }

    return tag
  }

  #verifyImages(images) {
    // check datatype
    const array = SprintUtility.from(images, 'array', '[ERROR] CreateProductRequest : images must be a array.')

    // check requirements
    // min=1
    const MIN = 0
    const arrayLength = array.length

    if (arrayLength < MIN) {
      throw new Error(`[ERROR] CreateProductRequest : images length at least ${MIN}.`)

    }

    const verifiedArray = array.map((image) => this.#verifyImage(image))

    return verifiedArray
  }

  #verifyImage(image) {
    // check datatype
    const string = SprintUtility.from(image, 'string', '[ERROR] CreateProductRequest : image must be a string.')

    // check requirements
    // start with http:// or https:// and at lest 1 character
    const PATTERN = /^https?:\/\/.+/
    const IS_NOT_FOLLOW_PATTERN = !PATTERN.test(string)

    if (IS_NOT_FOLLOW_PATTERN) {
      throw new Error(`[ERROR] CreateProductRequest : images.image must start with http://.. or https://...`)
    }

    return image
  }

  toQuery() {
    const query = {}

    query.name = this.#name
    query.description = this.#description
    query.price = this.#price
    query.tags = this.#tags
    query.images = this.#images

    return query
  }

  static fromJson(json) {
    return new CreateProductRequest(json)
  }

}