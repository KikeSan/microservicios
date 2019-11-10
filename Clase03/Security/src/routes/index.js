import express from 'express'
import { UserController } from '../controllers/users'
import { connect } from '../repository/index'

const router = express.Router()

const routes = db => {
  const repo = connect(db)

  const controller = new UserController(repo)

  router.post('/', controller.createUser)

  return router
}

export { routes }
