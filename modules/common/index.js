const JwtUtil = require('../token/token')

module.exports.verifyToken = (token, data) => {
  return new Promise((resolve, reject) => {
    const jwt = new JwtUtil(token)
    jwt.verifyToken().then((res) => {
      resolve()
    }).catch(() => {
      const token = jwt.generateToken(data)
      resolve(token)
    })
  })
}

module.exports.getHeadersToken = (req) => {
  return new Promise((resolve, reject) => {
    const token = req.headers.token
    const id = req.headers.id
    if (token) {
      resolve({token, id})
    } else {
      const err = 'is error'
      reject(err)
    }
  })
}
