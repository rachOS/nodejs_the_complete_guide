import express from 'express'

const { Router } = express
const adminRoutes = Router()
adminRoutes.get('/add-product', (req, res) => {
  res.render('add-product')
})

const products: Array<{ title: string }> = []
adminRoutes.post('/add-product', ({ body: { title } }, res) => {
  products.push({ title })
  res.redirect('/')
})

export { adminRoutes, products }
