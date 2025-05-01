import ArticleService from "./src/ArticleService.js"

const articleList = await ArticleService.getArticleList()
const testIndex = articleList[0].id
const article = await ArticleService.getArticle(testIndex)
console.log(`[GET] ${article.id} ${article.title} ${article.content}`)
const createdArticle = await ArticleService.createArticle('TITLE_CREATED', 'CONTENT_1')
console.log(`[POST] ${createdArticle.id} ${createdArticle.title} ${createdArticle.content}`)
const patchedArticle = await ArticleService.patchArticle(createdArticle.id, { title: 'TITLE_PATCHED' })
console.log(`[PATCH] ${patchedArticle.id} ${patchedArticle.title} ${patchedArticle.content}`)
const deletedId = await ArticleService.deleteArticle(patchedArticle.id)
console.log(`[DELETE] ${deletedId.id}`)
