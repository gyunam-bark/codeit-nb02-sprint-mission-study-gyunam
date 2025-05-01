import SprintUtility from "./SprintUtility.mjs"

export default class Article {
  #id
  #title
  #content
  #writer
  #image
  #likeCount
  #createdAt
  #updatedAt

  constructor({ id = 0, title = '', content = '', writer = '', likeCount = 0, createdAt = '', updatedAt = '', image = '' }) {
    this.#id = this.#verifyId(id)
    this.#title = this.#verifyTitle(title)
    this.#content = this.#verifyContent(content)
    this.#writer = this.#verifyWriter(writer)
    this.#likeCount = this.#verifyLike(likeCount)
    this.#createdAt = this.#verifyCreatedAt(createdAt)
    this.#updatedAt = this.#verifyUpdatedAt(updatedAt)
    this.#image = this.#verifyImage(image)
  }

  get id() {
    return this.#id
  }

  get title() {
    return this.#title
  }

  get content() {
    return this.#content
  }

  get writer() {
    return this.#writer
  }

  get likeCount() {
    return this.#likeCount
  }

  get createdAt() {
    return this.#createdAt
  }

  get updatedAt() {
    return this.#updatedAt
  }

  get image() {
    return this.#image
  }

  like() {
    this.#likeCount += 1
  }

  #verifyId(id) {
    // check datatype
    const number = SprintUtility.from(id, 'number', '[error] Article.id must be a number.')

    // check requirements
    // min=1
    if (number < 1) {
      console.error(`[error] Article.id length must be at least 1.`)
      return 1
    }

    return number
  }

  #verifyTitle(title) {
    // check datatype
    const string = SprintUtility.from(title, 'string', '[error] Article.title must be a string.')

    // check requirements
    // min=1, max=50
    const stringLength = string.length

    if (!stringLength) {
      console.error(`[error] Article.title length at least 1.`)
      return ''
    } else if (stringLength > 50) {
      console.error(`[error] Article.title length must be smaller than 50.`)
      return string.slice(0, 50)
    }

    return string
  }

  #verifyContent(content) {
    // check datatype
    const string = SprintUtility.from(content, 'string', '[error] Article.content must be a string.')

    // check requirements
    // min=1
    const stringLength = string.length
    if (!stringLength) {
      console.error(`[error] Article.content length must be at leat 1.`)
    }

    return string
  }

  #verifyWriter(writer) {
    // check datatype
    const string = SprintUtility.from(writer, ['string', 'null'], '[error] Article.writer must be a string.')

    // check requirements
    // none

    return string
  }

  #verifyLike(likeCount) {
    // check datatype
    const number = SprintUtility.from(likeCount, 'number', '[error] Article.likeCount must be a number.')

    // check requirements
    // none
    if (number < 0) {
      console.error(`[error] Article.likeCount must be positive.`)
      return 0
    } else if (!Number.isInteger(likeCount)) {
      console.error(`[error] Article.likeCount must be integer.`)
      return 0
    }

    return number
  }

  #verifyCreatedAt(createdAt) {
    // check datatype
    const string = SprintUtility.from(createdAt, 'string', '[error] Article.createdAt must be a string.')

    // check requirements
    // date-time
    const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    if (!pattern.test(string)) {
      console.error(`[error] Article.updatedAt must follow iso date time(yyyy-mm-ddThh:mm:ss.zzzZ).`)
    } else if (!Date.parse(createdAt)) {
      console.error(`[error] Article.updatedAt must follow iso date time(yyyy-mm-ddThh:mm:ss.zzzZ).`)
    } else {
      console.error(`[error] Article.updatedAt must be $date-$time.`)
      return '0000-00-00T00:00:00.000Z'
    }

    return string
  }

  #verifyUpdatedAt(updatedAt) {
    // check datatype
    const string = SprintUtility.from(updatedAt, 'string', '[error] Article.updatedAt must be a string.')

    // check requirements
    // date-time
    const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    if (!pattern.test(string)) {
      console.error(`[error] Article.updatedAt must follow iso date time(yyyy-mm-ddThh:mm:ss.zzzZ).`)
    } else if (!Date.parse(updatedAt)) {
      console.error(`[error] Article.updatedAt must follow iso date time(yyyy-mm-ddThh:mm:ss.zzzZ).`)
    } else {
      console.error(`[error] Article.updatedAt must be $date-$time.`)
      return '0000-00-00T00:00:00.000Z'
    }

    return string
  }

  #verifyImage(image) {
    // check datatype
    const string = SprintUtility.from(image, ['string', 'null'], `[error] Article.image must be a string.`)

    if (string === null) {
      return 'null'
    }

    // check requirements
    const pattern = /^https?:\/\/.+/
    if (!pattern.test(string)) {
      console.error(`[error] Article.image must start with http:// or https://.`)
    }

    return image
  }

  static fromJson(json) {
    return new Article(json)
  }
}