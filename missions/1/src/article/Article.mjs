import ArticleSchemeRequirements from "./ArticleSchemeRequirements.mjs"

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
    this.#id = ArticleSchemeRequirements.checkIdRequirements(id)
    this.#title = ArticleSchemeRequirements.checkTitleRequirements(title)
    this.#content = ArticleSchemeRequirements.checkContentRequirements(content)
    this.#image = ArticleSchemeRequirements.checkImageRequirements(image)
    this.#writer = ArticleSchemeRequirements.checkWriterRequirements(writer)
    this.#likeCount = ArticleSchemeRequirements.checkLikeCountRequirements(likeCount)
    this.#createdAt = ArticleSchemeRequirements.checkCreatedAtRequirements(createdAt)
    this.#updatedAt = ArticleSchemeRequirements.checkUpdatedAtRequirements(updatedAt)
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

  static fromJson(json) {
    return new Article(json)
  }
}