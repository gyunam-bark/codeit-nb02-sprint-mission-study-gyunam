import ArticleService from "./src/ArticleService.js"
import CreateArticleRequest from "./src/CreateArticleRequest.mjs"
import DeleteArticleRequest from "./src/DeleteArticleRequest.mjs"
import GetArticleListRequest from "./src/GetArticleListRequest.mjs"
import GetArticleRequest from "./src/GetArticleRequest.mjs"


// GET ARTICLE LIST
const getArticleListRequest = new GetArticleListRequest()
const articleList = await ArticleService.getArticleList(getArticleListRequest)

// GET ARTICLE
const testIndex = articleList[0].id
const getArticleRequest = new GetArticleRequest({ articleId: testIndex })
const article = await ArticleService.getArticle(getArticleRequest)
console.log(`[GET] ${article.id} ${article.title} ${article.content}`)

// CREATE ARTICLE
const createArticleRequest = new CreateArticleRequest({ title: 'TEST_1', content: 'CONTENT_1' })
const createdArticle = await ArticleService.createArticle(createArticleRequest)
console.log(`[POST] ${createdArticle.id} ${createdArticle.title} ${createdArticle.content}`)

// PATCH ARTICLE
const patchedArticle = await ArticleService.patchArticle(createdArticle.id, { title: 'TITLE_PATCHED' })
console.log(`[PATCH] ${patchedArticle.id} ${patchedArticle.title} ${patchedArticle.content}`)

// DELETE ARTICLE
const deleteArticleRequest = new DeleteArticleRequest({ articleId: patchedArticle.id })
const deletedId = await ArticleService.deleteArticle(deleteArticleRequest)
console.log(`[DELETE] ${deletedId.id}`)
