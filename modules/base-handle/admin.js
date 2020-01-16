const { verifyToken } = require('../common')
const Module = require('../sql/module')
// const JwtUtil = require('../token/token')

// 添加管理员
module.exports.addAdmin = (req, res) => {
  const {nickname, password} = req.body
  Module.insert({
    table: 'admin',
    keys: 'nickname, password',
    num: '?,?',
    values: [nickname, password]
  }).then((result) => {
    return res.json({code: 200, msg: result})
  }).catch(err => {
    return res.json({code: 400, msg: err})
  })
}

// 登录
module.exports.login = (req, res) => {
  console.log('login')
  const {nickname, password} = req.body
  Module.select({
    table: 'admin',
    values: '*',
    conditions: `nickname='${nickname}' and password='${password}'`
  }).then((result) => {
    // const id = result[0].id
    // const jwt = new JwtUtil(id)
    // const token = jwt.generateToken()
    verifyToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJleHAiOjE1NzkwNzE3NTIsImlhdCI6MTU3OTA2OTk1Mn0.QMnJ_Kpur6h6faiPxIO7OO5KTlaJaXgG2JLk__ix4mb5UWq5LmS51lhkXgPZa10R2vvL7F1wUB9SkHTMzZf5Bo_QS7Q1L8gWkgudSnooDC5UkGl_HizynF9l1R1bWqNAGg32vKGLDSc8A9ZHg6voc-YZfN-5xl7_IoEk3RZ1fAU')
    // return res.json({
    //   code: 200,
    //   result: {
    //     msg: '登录成功~',
    //     token,
    //     id
    //   }
    // })
    return res.json({code: 200, result: {}})
  }).catch((err) => {
    console.log(err, 'err')
    return res.json({code: 400, msg: err})
  })
}

// 删除管理员
module.exports.deleteAdmin = (req, res) => {
  Module.delete({}).then(() => {

  }).catch(err => {
    console.log(err)
  })
}

// 更改密码
module.exports.updateAdmin = (req, res) => {

}
