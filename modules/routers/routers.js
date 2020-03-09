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
router.post('/getAdmins', (req, res) => {
  authority(req).then(() => {
    Admin.getList(req, res)
  }).catch(() => {
    return res.json({
      code: 403,
      result: {
        msg: '无效的token'
      }
    })
  })
})
router.post('/getAdmin', (req, res) => {
  authority(req).then(() => {
    Admin.getAdminById(req, res)
  }).catch(() => {
    return res.json({
      code: 403,
      result: {
        msg: '无效的token'
      }
    })
  })
})

router.get('/admin/export', (req, res) => {
  authority(req).then(() => {
    Admin.adminExport(req, res)
  }).catch(() => {
    return res.json({
      code: 403,
      result: {
        msg: '无效的token'
      }
    })
  })
})

router.post('/getToken', Token.getToken)

module.exports = router
