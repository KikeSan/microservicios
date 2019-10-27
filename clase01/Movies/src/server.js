import { initializeServer } from './bin/app'
import yenv from 'yenv'
import { catchAsyn } from './utils'

const env = yenv()

const begin = async () => {
  await initializeServer(null)
  console.log(`Server on running. Port: ${env.PORT}`)
}

catchAsyn(begin)
