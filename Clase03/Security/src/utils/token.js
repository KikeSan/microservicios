const jwt = require('jwt-simple')
const moment = require('moment')
const yenv = require('yenv')
const env = yenv()

const keyWordSecret = env.KEYWORD_SECRET

const createToken = (_id, name) => {
  const payload = {
    _id,
    name,
    iat: moment().unix(),
    exp: moment()
      .add(env.TIME_TOKEN_EXPIRE, 'minutes')
      .unix(),
  }

  const token = jwt.encode(payload, keyWordSecret)

  return token
}

const validateToken = token => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, keyWordSecret)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

export { createToken, validateToken }
