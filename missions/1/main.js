import ArticleService from "./src/ArticleService.js"
import ProductService from "./src/ProductService.js"

console.log(`============================`)
console.log(`= ARTICLE TEST`)
console.log(`============================`)
// GET ARTICLE LIST
const articleList = await ArticleService.getArticleList()

// GET ARTICLE
const article = await ArticleService.getArticle(articleList[0].id)
console.log(`[GET] ${article.id} ${article.title} ${article.content}`)

// CREATE ARTICLE
const createdArticle = await ArticleService.createArticle({ title: 'CREATE_1', content: 'CONTENT_1' })
console.log(`[POST] ${createdArticle.id} ${createdArticle.title} ${createdArticle.content}`)

// PATCH ARTICLE
const patchedArticle = await ArticleService.patchArticle(createdArticle.id, { title: 'PATCH_1' })
console.log(`[PATCH] ${patchedArticle.id} ${patchedArticle.title} ${patchedArticle.content}`)

// DELETE ARTICLE
const deletedId = await ArticleService.deleteArticle(patchedArticle.id)
console.log(`[DELETE] ${deletedId.id}`)

console.log(`============================`)
console.log(`= PRODUCT TEST`)
console.log(`============================`)
// GET PRODUCT
const product = await ProductService.getProduct(20)
console.log(`[GET] ${product.id} ${product.name} ${product.description}`)