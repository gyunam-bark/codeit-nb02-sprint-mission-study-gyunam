import SprintUtility from "./SprintUtility.mjs"

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
    const string = SprintUtility.from(title, 'string', '[error] createArticleRequest : title must be a string.')

    // check requirements
    // min=1, max=50
    const stringLength = string.length

    if (!stringLength) {
      throw Error(`[error] createArticleRequest : title length at least 1.`)
    } else if (stringLength > 50) {
      throw Error(`[error] createArticleRequest : title length must be smaller than 50.`)
    }

    return string
  }

  #verifyContent(content) {
    const string = SprintUtility.from(content, 'string', '[error] createArticleRequest : content must be a string.')

    // check requirements
    // min=1, max=50
    const stringLength = string.length

    if (!stringLength) {
      throw Error(`[error] createArticleRequest : content length at least 1.`)
    }

    return string
  }

  #verifyImage(image) {
    // check datatype
    const string = SprintUtility.from(image, ['string'], `[error] createArticleRequest : image must be a string`)

    // check requirements
    const pattern = /^https?:\/\/.+/
    if (!pattern.test(string)) {
      console.error(`[error] createArticleRequest : image must start with http:// or https://.`)
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

  toJson() {
    return {
      title: this.#title,
      content: this.#content,
      image: this.#image
    }
  }

}