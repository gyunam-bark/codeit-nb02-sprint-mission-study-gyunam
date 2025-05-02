import SprintUtility from "../util/SprintUtility.mjs"

export default class CreateArticleRequest {
  #title
  #content
  #image

  // requirements : title, content
  // options : image
  constructor(schemes = {}) {
    const { title, content, image } = schemes
    this.#title = this.#verifyTitle(title)
    this.#content = this.#verifyContent(content)
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

  #verifyTitle(title) {
    // check datatype
    const string = SprintUtility.from(title, 'string', '[ERROR] createArticleRequest : title must be a string.')

    // check requirements
    // min=1, max=50
    const MIN = 1
    const MAX = 50
    const stringLength = string.length

    if (stringLength < MIN) {
      throw Error(`[ERROR] createArticleRequest : title length at least ${MIN}.`)
    } else if (stringLength > 50) {
      throw Error(`[ERROR] createArticleRequest : title length must be smaller than ${MAX}.`)
    }

    return string
  }

  #verifyContent(content) {
    const string = SprintUtility.from(content, 'string', '[ERROR] createArticleRequest : content must be a string.')

    // check requirements
    // min=1
    const MIN = 1

    const stringLength = string.length

    if (stringLength < MIN) {
      throw Error(`[ERROR] createArticleRequest : content length at least ${MIN}.`)
    }

    return string
  }

  #verifyImage(image) {
    // check datatype
    const string = SprintUtility.from(image, 'string', `[ERROR] createArticleRequest : image must be a string`)

    // check requirements
    const PATTERN = /^https?:\/\/.+/
    const IS_NOT_FOLLOW_PATTERN = !PATTERN.test(string)

    if (IS_NOT_FOLLOW_PATTERN) {
      console.error(`[ERROR] Article.images.image must start with http://.. or https://...`)
      return null
    }

    return image
  }

  toQuery() {
    const query = {}

    query.title = this.#title
    query.content = this.#content

    if (this.#image !== null) {
      query.image = this.#image
    }

    return query
  }

  static fromJson(json) {
    return new CreateArticleRequest(json)
  }

}