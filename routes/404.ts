import express from 'express'
import path from 'node:path'
import { getRootDir } from '../helpers/navigation'

const { Router } = express
const notFoundRoute = Router()
notFoundRoute.use((req, res) => {
  res.status(404).sendFile(path.join(getRootDir, 'views', '404.html'))
})

export { notFoundRoute }
