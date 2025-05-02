import SprintUtility from "../util/SprintUtility.mjs"

export default class Product {
  #id
  #name
  #description
  #price
  #tags
  #images
  #favoriteCount
  #createdAt

  constructor({ id = 0, name = '', description = '', price = 0, tags = [], images = [], favoriteCount = 0, createdAt = '' }) {
    this.#id = this.#verifyId(id)
    this.#name = this.#verifyName(name)
    this.#description = this.#verifyDescription(description)
    this.#price = this.#verifyPrice(price)
    this.#tags = this.#verifyTags(tags)
    this.#images = this.#verifyImages(images)
    this.#favoriteCount = this.#verifyFavoriteCount(favoriteCount)
    this.#createdAt = this.#verifyCreatedAt(createdAt)
  }

  get id() {
    return this.#id
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

  get createdAt() {
    return this.#createdAt
  }

  favorite() {
    this.#favoriteCount += 1
  }

  #verifyId(id) {
    // check datatype
    const number = SprintUtility.from(id, 'number', '[error] Product.id must be a number.')

    // check requirements
    // min=1
    const MIN = 1
    if (number < MIN) {
      console.error(`[error] Product.id must be at least ${MIN}.`)
      return MIN
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
    const SPACE_STRING = ' '

    if (stringLength < MIN) {
      console.error(`[error] Product.title length at least 1.`)
      return SPACE_STRING
    } else if (stringLength > MAX) {
      console.error(`[error] Product.title length must be smaller than ${MAX}`)
      return string.slice(MIN - 1, MAX)
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
      console.error(`[error] Product.price must be positive.`)
      return MIN
    }

    return price
  }

  #verifyTags(tags) {
    // check datatype
    const array = SprintUtility.from(tags, 'array', '[error] Product.tags must be a array.')

    // check requirements
    // min=1
    const MIN = 1
    const SPACE_STRING = ' '

    const arrayLength = array.length

    if (arrayLength < MIN) {
      console.error(`[error] Product.tags length at least ${MIN}.`)
      return [SPACE_STRING]
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
    const SPACE_STRING = ' '

    const tagLength = string.length

    if (tagLength < MIN) {
      console.error(`[error] Product.tag length at least ${MIN}.`)
      return SPACE_STRING
    } else if (tagLength > MAX) {
      console.error(`[error] Product.tag length must be smaller than ${MAX}.`)
      return string.slice(MIN - 1, MAX)
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
    const EMPTY_URL = 'https://.'

    if (arrayLength < MIN) {
      console.error(`[error] Product.images length at least ${MIN}.`)
      return [EMPTY_URL]
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
    const EMPTY_URL = 'https://.'

    if (IS_NOT_FOLLOW_PATTERN) {
      console.error(`[error] Product.images.image must start with http://... or https:///...`)
      return EMPTY_URL
    }

    return string
  }

  #verifyFavoriteCount(favoraiteCount) {
    // check datatype
    const number = SprintUtility.from(favoraiteCount, 'number', '[error] Product.favoraiteCount must be a number.')

    // check requirements
    // none
    const MIN = 0
    const IS_NOT_INTEGER = !Number.isInteger(favoraiteCount)

    if (number < MIN) {
      console.error(`[error] Product.favoraiteCount must be positive.`)
      return MIN
    } else if (IS_NOT_INTEGER) {
      console.error(`[error] Product.favoraiteCount must be integer.`)
      return MIN
    }

    return number
  }

  #verifyCreatedAt(createdAt) {
    // check datatype
    const string = SprintUtility.from(createdAt, 'string', '[error] Product.createdAt must be a string.')

    // check requirements
    // date-time
    const PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    const IS_NOT_FOLLOW_PATTERN = !PATTERN.test(string)
    const IS_NOT_EVENT_DATE_LIKE = !Date.parse(string)
    const EMPTY_DATE = '0000-00-00T00:00:00.000Z'

    if (IS_NOT_FOLLOW_PATTERN) {
      console.error(`[error] Product.createdAt must follow iso date time(yyyy-mm-ddThh:mm:ss.zzzZ).`)
      return EMPTY_DATE
    } else if (IS_NOT_EVENT_DATE_LIKE) {
      console.error(`[error] Product.createdAt must follow iso date time(yyyy-mm-ddThh:mm:ss.zzzZ).`)
      return EMPTY_DATE
    }

    return string
  }

  static fromJson(json) {
    return new Product(json)
  }
}