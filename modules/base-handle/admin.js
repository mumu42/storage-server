const Module = require('../sql/module')

// 添加管理员
module.exports.addAdmin = (req, res) => {
  const {nickname, password, isAdmin} = req.body
  selectAdmin(`nickname='${nickname}'`).then((result) => {
    if (result.length > 0) {
      return res.json({
        code: 400,
        msg: '该昵称已经存在，请重新设置~'
      })
    } else {
      Module.insert({
        table: 'admin',
        keys: 'nickname,password,isAdmin',
        num: '?,?,?',
        values: [nickname, password, isAdmin]
      }).then((results) => {
        return res.json({code: 200, result: results})
      }).catch(err => {
        return res.json({code: 400, msg: err})
      })
    }
  }).catch(err => {
    return res.json({code: 400, msg: err})
  })
}

// 登录
module.exports.login = (req, res) => {
  const {nickname, password} = req.body
  selectAdmin(`nickname='${nickname}' and password='${password}'`).then((result) => {
    return res.json({
      code: 200,
      result: {
        msg: '登录成功~',
        detail: result[0]
      }
    })
  }).catch((err) => {
    return res.json({code: 400, msg: err})
  })
}

// 管理员列表
module.exports.getList = (req, res) => {
  Module.select({
    table: 'admin',
    values: 'id,nickname,isDisable'
  }).then(result => {
    return res.json({
      code: 200,
      result
    })
  }).catch((err) => {
    return res.json({
      code: 400,
      msg: err
    })
  })
}

// 更改密码
module.exports.updateAdmin = (req, res) => {

}

function selectAdmin (conditions) {
  return new Promise((resolve, reject) => {
    Module.select({
      table: 'admin',
      values: '*',
      conditions
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
