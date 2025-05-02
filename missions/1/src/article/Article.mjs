import SprintUtility from "../util/SprintUtility.mjs"

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
    const MIN = 1
    if (number < MIN) {
      console.error(`[error] Article.id must be at least ${MIN}.`)
      return MIN
    }

    return number
  }

  #verifyTitle(title) {
    // check datatype
    const string = SprintUtility.from(title, 'string', '[error] Article.title must be a string.')

    // check requirements
    // min=1, max=50
    const stringLength = string.length
    const MIN = 1
    const MAX = 50
    const SPACE_STRING = ' '

    if (stringLength < MIN) {
      console.error(`[error] Article.title length at least ${MIN}.`)
      return SPACE_STRING
    } else if (stringLength > MAX) {
      console.error(`[error] Article.title length must be smaller than ${MAX}.`)
      return string.slice(MIN - 1, MAX)
    }

    return string
  }

  #verifyContent(content) {
    // check datatype
    const string = SprintUtility.from(content, 'string', '[error] Article.content must be a string.')

    // check requirements
    // min=1
    const stringLength = string.length
    const MIN = 1
    const SPACE_STRING = ' '
    if (stringLength < MIN) {
      console.error(`[error] Article.content length must be at leat ${MIN}.`)
      return SPACE_STRING
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
    const MIN = 0
    const IS_NOT_INTEGER = !Number.isInteger(likeCount)

    if (number < MIN) {
      console.error(`[error] Article.likeCount must be positive.`)
      return MIN
    } else if (IS_NOT_INTEGER) {
      console.error(`[error] Article.likeCount must be integer.`)
      return MIN
    }

    return number
  }

  #verifyCreatedAt(createdAt) {
    // check datatype
    const string = SprintUtility.from(createdAt, 'string', '[error] Article.createdAt must be a string.')

    // check requirements
    // date-time
    const PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    const IS_NOT_FOLLOW_PATTERN = !PATTERN.test(string)
    const IS_NOT_EVENT_DATE_LIKE = !Date.parse(string)
    const EMPTY_DATE = '0000-00-00T00:00:00.000Z'

    if (IS_NOT_FOLLOW_PATTERN) {
      console.error(`[error] Article.updatedAt must follow iso date time(yyyy-mm-ddThh:mm:ss.zzzZ).`)
      return EMPTY_DATE
    } else if (IS_NOT_EVENT_DATE_LIKE) {
      console.error(`[error] Article.updatedAt must follow iso date time(yyyy-mm-ddThh:mm:ss.zzzZ).`)
      return EMPTY_DATE
    } else {
      console.error(`[error] Article.updatedAt must be $date-$time.`)
    }

    return string
  }

  #verifyUpdatedAt(updatedAt) {
    // check datatype
    const string = SprintUtility.from(updatedAt, 'string', '[error] Article.updatedAt must be a string.')

    // check requirements
    // date-time
    const PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    const IS_NOT_FOLLOW_PATTERN = !PATTERN.test(string)
    const IS_NOT_EVENT_DATE_LIKE = !Date.parse(string)
    const EMPTY_DATE = '0000-00-00T00:00:00.000Z'

    if (IS_NOT_FOLLOW_PATTERN) {
      console.error(`[error] Article.updatedAt must follow iso date time(yyyy-mm-ddThh:mm:ss.zzzZ).`)
      return EMPTY_DATE
    } else if (IS_NOT_EVENT_DATE_LIKE) {
      console.error(`[error] Article.updatedAt must follow iso date time(yyyy-mm-ddThh:mm:ss.zzzZ).`)
      return EMPTY_DATE
    } else {
      console.error(`[error] Article.updatedAt must be $date-$time.`)
    }

    return string
  }

  #verifyImage(image) {
    // check datatype
    const string = SprintUtility.from(image, ['string', 'null'], `[error] Article.image must be a string.`)

    // can be null
    if (string === null) {
      return 'null'
    }

    // check requirements
    // start with http:// or https:// and at lest 1 character
    const PATTERN = /^https?:\/\/.+/
    const IS_NOT_FOLLOW_PATTERN = !PATTERN.test(string)
    const EMPTY_URL = 'https://'

    if (IS_NOT_FOLLOW_PATTERN) {
      console.error(`[error] Article.image must start with http://... or https://...`)
      return EMPTY_URL
    }

    return image
  }

  static fromJson(json) {
    return new Article(json)
  }
}