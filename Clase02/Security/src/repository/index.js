import yenv from 'yenv'
import bcrypt from 'bcrypt'
import { createToken } from '../utils/token'

const env = yenv()

const repository = db => {
  const collection = db.collection(env.DB.COLLECTION)

  const getUsers = async () => {
    const users = await collection.find()
    return users
  }
  const createUser = async (name, email, password) => {
    const newPassword = await bcrypt.hash(password, 10)
    const user = new collection({ name, email, newPassword })
    await user.save()
    return true
  }
  const updateUser = async (id, name) => {
    await collection.findOneAndUpdate({ id }, { name })
    return true
  }
  const getUser = async id => {
    const user = collection.findOne({ id })
    return true
  }
  const deleteUser = async id => {
    await collection.findOneAndRemove({ id })
    return true
  }
  const login = async (email, password) => {
    const user = collection.findOne({ email })

    if (user) {
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        const token = createToken(user.id, user.name)
        return { token }
      }
      return false
    } else {
      return false
    }
  }

  const validateToken = async token => {
    const payload = await validateToken(token)

    return payload
  }

  const generateApiKey = async () => {
    return true
  }
  const validateApiKey = async () => {}

  const disconnect = () => {
    db.close()
  }

  return {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
    validateApiKey,
    validateToken,
    generateApiKey,
  }
}

const connect = connection => {
  return connection
    ? repository(connection)
    : new Error('Connection is not supplied')
}

export { connect }
