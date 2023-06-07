import express from 'express'
import path from 'node:path'
import { getRootDir } from '../helpers/navigation'
import { products } from './admin'

const { Router } = express
const shopRoutes = Router()
shopRoutes.get('/', (req, res) => {
  console.log('=>(shop.ts:11) products', products)

  res.sendFile(path.join(getRootDir, 'views', 'shop.html'))
})

export { shopRoutes }
