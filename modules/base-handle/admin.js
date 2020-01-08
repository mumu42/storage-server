const Module = require('../sql/module')

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
  const {nickname, password} = req.body
  Module.select({
    table: 'admin',
    values: '*',
    conditions: `nickname=${nickname} and password=${password}`
  }).then((result) => {
    // todo
    // getToken
    console.log(result, 'login')
    return res.json({code: 200, msg: '登录成功'})
  }).catch((err) => {
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
