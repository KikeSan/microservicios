export class MoviesController {
  repo

  constructor(repo) {
    this.repo = repo
    this.getAllMovies = this.getAllMovies.bind(this)
    this.getMoviesPremieres = this.getMoviesPremieres.bind(this)
    this.getMovieById = this.getMovieById.bind(this)
  }

  async getAllMovies(req, res) {
    const movies = await this.repo.getAllMovies()

    res.json(movies)
  }

  async getMoviesPremieres(req, res) {
    const movies = await this.repo.getMoviesPremieres()

    res.json(movies)
  }

  async getMovieById(req, res) {
    const movie = await this.repo.getMovieById(req.params.id)

    res.json(movie)
  }
}
