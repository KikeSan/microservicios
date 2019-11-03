import express from 'express'
import { moviesController } from './controllers/moviesController'
import { connect } from '../repository/index'

const router = express.Router()
const routes = db => {
  const repo = connect(db)

  const controller = new moviesController(repo)

  router.get('/movies', controller.getAllMovies)
  router.get('/movies/premiers', controller.getmoviesPremiers)
  router.get('/movies/:id', controller.getMoviesById)

  return router
}

export { routes }
