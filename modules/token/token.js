const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

class Jwt {
  constructor (data) {
    this.data = data
  }

  // 生成token
  generateToken () {
    const data = this.data
    const created = Math.floor(Date.now() / 1000)
    const cert = fs.readFileSync(path.join(__dirname, '../../static/pem/private_key.pem'))
    const token = jwt.sign({
      data,
      exp: created + 60 * 30
    }, cert, {algorithm: 'RS256'})

    return token
  }

  // 验证token
  verifyToken () {
    return new Promise((resolve, reject) => {
      const token = this.data
      const cert = fs.readFileSync(path.join(__dirname, '../../static/pem/public_key.pem'))
      let res
      try {
        let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {}
        let {exp = 0} = result
        let current = Math.floor(Date.now() / 1000)
        if (current <= exp) {
          res = result.data || {}
        }
        resolve(res)
      } catch (err) {
        // res = err
        reject(err)
      }
    })
  }
}

module.exports = Jwt
