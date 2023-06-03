import * as https from 'node:http'
import { userRoutes } from './routes'

const server = https.createServer(userRoutes)

server.listen(3000)
