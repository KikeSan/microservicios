import express from 'express'
import http from 'http'
import yenv from 'yenv'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'

const app = express()
const env = yenv()

const initializeServer = db => {
  return new Promise((resolve, reject) => {
    const httpServer = http.createServer(app)

    app.use(helmet())
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    httpServer
      .listen(env.PORT)
      .on('listening', () => resolve())
      .on('error', error => reject(error))
  })
}

export { initializeServer }
