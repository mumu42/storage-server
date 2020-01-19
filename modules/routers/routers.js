const Commons = require('../common')
const express = require('express')
let router = express.Router()
const Admin = require('../base-handle/admin')
const Token = require('../base-handle/token')

// 验证token
function authority (req) {
  return new Promise((resolve, reject) => {
    Commons.getHeadersToken(req).then(res => {
      Commons.verifyToken(res.token, res.id).then(() => {
        resolve()
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

router.post('/login', Admin.login)
router.post('/admin/add', (req, res) => {
  authority(req).then(() => {
    Admin.addAdmin(req, res)
  }).catch(() => {
    return res.json({code: 403, result: {msg: '无效的token'}})
  })
})
router.post('/getAdmins', Admin.getList)

router.post('/getToken', Token.getToken)

module.exports = router
