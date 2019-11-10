import express from 'express'
import http from 'http'
import yenv from 'yenv'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import { routes } from '../routes'

const app = express()
const env = yenv()

const initializeServer = db => {
  return new Promise((resolve, reject) => {
    const httpServer = http.createServer(app)

    app.use(helmet())
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(routes(db))

    httpServer
      .listen(env.PORT)
      .on('listening', () => resolve())
      .on('error', error => reject(error))
  })
}

export { initializeServer }
