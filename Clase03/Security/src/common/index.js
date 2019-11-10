import mongodb from 'mongodb'
import yenv from 'yenv'

const env = yenv()

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    const MongoClient = mongodb.MongoClient

    const uri = `mongodb://${env.DB.USER}:${env.DB.PWD}@${env.DB.HOST}:${env.DB.PORT}/${env.DB.NAME}?retryWrites=true&w=majority`

    const cliente = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    cliente.connect(err => {
      if (err) reject(err)
      else {
        const db = cliente.db(env.DB.NAME)

        resolve(db)
      }
    })
  })
}

export { initializeDatabase }
