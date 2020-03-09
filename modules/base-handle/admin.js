const Module = require('../sql/module')
const fs = require('fs')
const mime = require('mime')
const path = require('path')

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

module.exports.getAdminById = (req, res) => {
  const { id } = req.body
  Module.select({
    table: 'admin',
    values: 'id,nickname,isDisable,isAdmin',
    conditions: `id='${id}'`
  }).then(result => {
    return res.json({
      code: 200,
      result: result[0]
    })
  }).catch(err => {
    return res.json({
      code: 400,
      msg: err
    })
  })
}

// 更改密码
module.exports.updateAdmin = (req, res) => {
}

// 下载附件
module.exports.adminExport = (req, res) => {
  Module.select({
    table: 'admin',
    values: 'id,nickname,isDisable'
  }).then(result => {
    const filename = `admin-${Date.now()}`
    Module.exportList(result, ['ID', '昵称', '是否禁用'], filename).then(() => {
      const filePath = `./static/files/${filename}.xlsx`
      console.log(path.basename(filePath), 'path path')
      fs.stat(filePath, (err, stat) => {
        if (err) {
          return res.json({
            code: 400,
            msg: err
          })
        }
        let stream = fs.createReadStream(filePath)
        res.setHeader('Content-Type', mime.getType(filePath))
        res.setHeader('Content-Length', stat.size)
        res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`)
        stream.pipe(res)
        res.json({
          code: 200,
          msg: '成功~'
        })
      })
    }).catch(err => {
      res.json({
        code: 400,
        msg: err
      })
    })
  }).catch(err => {
    res.json({
      code: 400,
      msg: err
    })
  })
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
