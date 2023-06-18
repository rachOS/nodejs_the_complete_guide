import express from 'express'

const { Router } = express
const notFoundRoute = Router()
notFoundRoute.use((req, res) => {
  res.status(404).render('404')
})

export { notFoundRoute }
