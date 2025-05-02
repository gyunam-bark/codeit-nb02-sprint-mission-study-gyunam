import SprintUtility from "../util/SprintUtility.mjs";

export default class PatchArticleRequest {
  #articleId
  #title
  #content
  #image

  // requirements : articleId
  // options : title, content, image
  constructor(schemes = {}) {
    const { articleId, title, content, image } = schemes

    this.#articleId = this.#verifyId(articleId)

    this.#title = title !== undefined ? this.#verifyTitle(title) : null
    this.#content = content !== undefined ? this.#verifyContent(content) : null
    this.#image = image !== undefined ? this.#verifyImage(image) : null
  }

  get title() {
    return this.#title
  }

  get content() {
    return this.#content
  }

  get image() {
    return this.#image
  }

  #verifyId(id) {
    // check datatype
    const number = SprintUtility.from(id, 'number', '[ERROR] PatchArticleRequest : /articles/{articleId} must be a number.')

    // check requirements
    // min=1
    const MIN = 1
    const IS_INTEGER = Number.isInteger(number)
    if (number < MIN) {
      throw Error(`[ERROR] PatchArticleRequest : /articles/{articleId} must be at least ${MIN}.`)
    } else if (IS_INTEGER === false) {
      throw Error(`[ERROR] PatchArticleRequest : /articles/{articleId} must be a integer.`)
    }

    return number
  }

  #verifyTitle(title) {
    // check datatype
    const string = SprintUtility.from(title, 'string', '[ERROR] PatchArticleRequest : title must be a string.')

    // check requirements
    // min=1, max=50
    const MIN = 1
    const MAX = 50
    const stringLength = string.length

    if (stringLength < MIN) {
      throw Error(`[ERROR] PatchArticleRequest : title length at least ${MIN}.`)
    } else if (stringLength > 50) {
      throw Error(`[ERROR] PatchArticleRequest : title length must be smaller than ${MAX}.`)
    }

    return string
  }

  #verifyContent(content) {
    const string = SprintUtility.from(content, 'string', '[ERROR] PatchArticleRequest : content must be a string.')

    // check requirements
    // min=1
    const MIN = 1
    const stringLength = string.length

    if (stringLength < MIN) {
      throw Error(`[ERROR] PatchArticleRequest : content length at least ${MIN}.`)
    }

    return string
  }

  #verifyImage(image) {
    // check datatype
    const string = SprintUtility.from(image, ['string', 'null'], `[ERROR] PatchArticleRequest : image must be a string`)

    // check requirements
    // start with http:// or https:// and at lest 1 character
    const PATTERN = /^https?:\/\/.+/
    const IS_NOT_FOLLOW_PATTERN = !PATTERN.test(string)

    if (IS_NOT_FOLLOW_PATTERN) {
      console.error(`[ERROR] PatchArticleRequest : image must start with http://... or https://...`)
      return null
    }

    return image
  }

  toParameter() {
    return `/${this.#articleId}`
  }

  toQuery() {
    const query = {}

    if (this.#title !== null) {
      query.title = this.#title
    }

    if (this.#content !== null) {
      query.content = this.#content
    }

    if (this.#image !== null) {
      query.image = this.#image
    }

    return query
  }

  static fromJson(json) {
    return new PatchArticleRequest(json)
  }
}