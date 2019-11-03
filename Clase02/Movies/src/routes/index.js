import express from 'express'
import { MoviesController } from '../controllers/movies'
import { connect } from '../repository/index'

const router = express.Router()

const routes = db => {
  const repo = connect(db)

  const controller = new MoviesController(repo)

  router.get('/movies', controller.getAllMovies)
  router.get('/movies/premiers', controller.getMoviesPremieres)
  router.get('/movies/:id', controller.getMovieById)

  return router
}

export { routes }
