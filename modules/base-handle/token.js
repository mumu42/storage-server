const JwtUtil = require('../token/token')

module.exports.getToken = (req, res) => {
  const {id} = req.body
  const jwt = new JwtUtil(id)
  const token = jwt.generateToken()
  return res.json({
    code: 200,
    result: {
      msg: '登录成功~',
      token,
      id
    }
  })
}
