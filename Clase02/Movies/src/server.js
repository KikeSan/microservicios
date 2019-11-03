import { initializeServer } from './bin/app'
import yenv from 'yenv'
import { catchAsyn } from './utils'
import { initializeDatabase } from './common'

const env = yenv()
let db

const begin = async () => {
  db = await initializeDatabase()
  console.log('Database on running')

  if (db) {
    await initializeServer(db)
    console.log(`Server on running. Port: ${env.PORT}`)
  }
}

catchAsyn(begin)
