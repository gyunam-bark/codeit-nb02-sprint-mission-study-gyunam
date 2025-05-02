import ArticleService from "./src/ArticleService.js"
import ProductService from "./src/ProductService.js"

console.log(`============================`)
console.log(`= ARTICLE TEST`)
console.log(`============================`)

// GET ARTICLE LIST
const articleList = await ArticleService.getArticleList()
console.log(`[GET] total article list length : ${articleList.length}`)

// GET ARTICLE
const specificArticle = await ArticleService.getArticle(articleList[0].id)
console.log(`[GET] ${specificArticle.id} ${specificArticle.title} ${specificArticle.content}`)

// CREATE ARTICLE
const createdArticle = await ArticleService.createArticle('CREATE_1', 'CONTENT_1', {})
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

// GET PRODUCT LIST
const productList = await ProductService.getProductList()
console.log(`[GET] total product list length : ${productList.length}`)

// GET PRODUCT
const specificProduct = await ProductService.getProduct(productList[0].id)
console.log(`[GET] ${specificProduct.id} ${specificProduct.name} ${specificProduct.description}`)

// CREATE PRODUCT
const createdProduct = await ProductService.createProduct('황태', '귀여운 고양이', 100, ['고양이'], ['https://t'])
console.log(`[POST] ${createdProduct.id} ${createdProduct.name} ${createdProduct.description}`)

// PATCH PRODUCT
const patchedProduct = await ProductService.patchProduct(createdProduct.id, { name: "건담", description: "더 귀여운 고양이" })
console.log(`[PATCH] ${patchedProduct.id} ${patchedProduct.name} ${patchedProduct.description}`)

// DELETE PRODUCT
const deletedProduct = await ProductService.deleteProduct(patchedProduct.id)
console.log(`[DELETE] ${deletedProduct.id}`)
