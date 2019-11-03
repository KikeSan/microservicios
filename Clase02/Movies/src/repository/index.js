import yenv from 'yenv'

const env = yenv()

const repository = db => {
  const collection = db.collection(env.DB.COLLECTION)

  const getAllMovies = async () => {
    const movies = await collection.find({}, { title: 1 }).toArray()

    return movies
  }

  const getMoviePremiers = async () => {
    const currencyDate = new Date()

    const query = {
      releaseYear: currencyDate.getFullYear(),
      releaseMonth: currencyDate.getMonth(),
      releaseDay: currencyDate.getDate(),
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
    : new Error('Connection is not supplied')
}

export { connect }
