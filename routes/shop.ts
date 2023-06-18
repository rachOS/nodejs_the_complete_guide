import express from 'express'
import { products } from './admin'

const { Router } = express
const shopRoutes = Router()
shopRoutes.get('/', (req, res) => {
  console.log('=>(shop.ts:11) products', products)

  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    errorMessage: 'No products yet',
  })
})

export { shopRoutes }
