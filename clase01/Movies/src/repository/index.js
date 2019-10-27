import yenv from 'yenv'

const env = yenv()

const repository = db => {
  const collection = db.collection(env.DB.COLLECTION)

  const getAllMovies = async () => {
    const movies = await collection.find({}, { title: 1 }).toArray()

    return movies
  }

  const getMoviePremiers = async () => {
    const currencyDay = new Date()
    const query = {
      releaseYear: currencyDay.getFullYear(),
      releaseMonth: currencyDay.getMonth(),
      releaseDay: currencyDay.getDate(),
    }

    const movies = await collection.find(query).toArray()

    return movies
  }

  const getMovieById = async _id => {
    const movie = await collection.findOne({ _id })

    return movie
  }

  const disconnect = () => {
    db.close()
  }

  return { getAllMovies, getMoviePremiers, getMovieById, disconnect }
}

const connect = connection => {
  return connection
    ? repository(connection)
    : new Error('[Err] - Connection is not supplied')
}

export { connect }
