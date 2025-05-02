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

    this.#articleId = this.#verifyId(Number(articleId))

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
    const number = SprintUtility.from(id, 'number', '[error] PatchArticleRequest : /articles/{articleId} must be a number.')

    // check requirements
    // min=1
    const MIN = 1
    if (number < MIN) {
      throw Error(`[error] PatchArticleRequest : /articles/{articleId} must be at least ${MIN}.`)
    }

    return number
  }

  #verifyTitle(title) {
    // check datatype
    const string = SprintUtility.from(title, 'string', '[error] PatchArticleRequest : title must be a string.')

    // check requirements
    // min=1, max=50
    const MIN = 1
    const MAX = 50
    const stringLength = string.length

    if (stringLength < MIN) {
      throw Error(`[error] PatchArticleRequest : title length at least ${MIN}.`)
    } else if (stringLength > 50) {
      throw Error(`[error] PatchArticleRequest : title length must be smaller than ${MAX}.`)
    }

    return string
  }

  #verifyContent(content) {
    const string = SprintUtility.from(content, 'string', '[error] PatchArticleRequest : content must be a string.')

    // check requirements
    // min=1
    const MIN = 1
    const stringLength = string.length

    if (stringLength < MIN) {
      throw Error(`[error] PatchArticleRequest : content length at least ${MIN}.`)
    }

    return string
  }

  #verifyImage(image) {
    // check datatype
    const string = SprintUtility.from(image, ['string', 'null'], `[error] PatchArticleRequest : image must be a string`)

    // check requirements
    const PATTERN = /^https?:\/\/.+/
    const IS_NOT_FOLLOW_PATTERN = !PATTERN.test(string)
    const EMPTY_URL = 'https://'

    if (IS_NOT_FOLLOW_PATTERN) {
      console.error(`[error] PatchArticleRequest : image must start with http:// or https://.`)
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

  toJson() {
    return {
      articleId: this.#articleId,
      title: this.#title,
      content: this.#content,
      image: this.#image
    }
  }
}