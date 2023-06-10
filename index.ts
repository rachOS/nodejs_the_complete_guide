import bodyParser from 'body-parser'
import express from 'express'
import path from 'node:path'

import { router } from './routes/router'

const app = express()

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(router)

app.listen(3000)
