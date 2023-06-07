import express from 'express'
import path from 'node:path'
import { getRootDir } from '../helpers/navigation'

const { Router } = express
const adminRoutes = Router()
adminRoutes.get('/add-product', (req, res) => {
  res.sendFile(path.join(getRootDir, 'views', 'add-product.html'))
})

const products: Array<{ title: string }> = []
adminRoutes.post('/add-product', ({ body: { title } }, res) => {
  products.push({ title })
  res.redirect('/')
})

export { adminRoutes, products }
