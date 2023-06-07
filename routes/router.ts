import express from 'express'
import { shopRoutes } from './shop'
import { adminRoutes } from './admin'
import { notFoundRoute } from './404'

const { Router } = express
const router = Router()

router.use(shopRoutes)
router.use('/admin', adminRoutes)
router.use(notFoundRoute)

export { router }
