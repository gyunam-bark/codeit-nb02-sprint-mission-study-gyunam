import ElectronicProduct from "./ElectronicProduct.mjs"

export const PRODUCT_FILTER = {
  '전자제품': (json) => new ElectronicProduct(json)
}

export default PRODUCT_FILTER