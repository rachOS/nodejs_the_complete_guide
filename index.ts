import bodyParser from 'body-parser'
import express from 'express'
import path from 'node:path'

import {router} from './routes/router'
import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-R", "src/views", "dist/" );

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '.', "dist")))

app.use(router)

const port = 3000
app.listen(port, () => console.log('listen on port', port))
