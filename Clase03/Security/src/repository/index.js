import yenv from 'yenv'
import bcrypt from 'bcrypt'
import { createToken, validateToken } from '../utils/token'
const ObjectId = require('mongodb').ObjectID

const env = yenv()

const repository = db => {
  const collection = db.collection(env.DB.COLLECTION)

  const getUsers = async () => {
    const users = await collection.find().toArray()

    return users
  }
  const createUser = async (name, email, password) => {
    const newPassword = await bcrypt.hash(password, 10)

    const user = new collection({ name, email, newPassword })
    await user.save()

    return true
  }
  const updateUser = async (_id, name) => {
    await collection.updateOne({ _id: ObjectId(_id) }, { $set: { name } })

    return true
  }
  const getUser = async id => {
    const user = collection.findOne({ _id: ObjectId(id) })

    return user
  }
  const deleteUser = async id => {
    await collection.deleteOne({ _id: ObjectId(id) })

    return true
  }
  const login = async (email, password) => {
    const user = collection.findOne({ email })

    if (user) {
      const match = await bcrypt.compare(password, user.password)

      if (match) {
        const token = createToken(user._id, user.name)
        return { token }
      } else {
        return false
      }
    } else {
      return false
    }
  }
  const validateInfoToken = async token => {
    const payload = await validateToken(token)

    return payload
  }
  const generateApiKey = async () => {
    return true
  }
  const validateApiKey = async apiKey => {
    return true
  }

  const disconnect = () => {
    db.close()
  }

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    validateApiKey,
    validateInfoToken,
    generateApiKey,
    disconnect,
  }
}

const connect = connection => {
  return connection
    ? repository(connection)
    : new Error('Connection is not supplied')
}

export { connect }
