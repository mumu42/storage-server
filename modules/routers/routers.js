// const VerifyToken = require('../common')
const express = require('express')
let router = express.Router()
const Admin = require('../base-handle/admin')

// function authority(token) {
//   if (token) {
//     VerifyToken(token)
//   }
// }

router.post('/login', Admin.login)
router.post('/admin/add', (req, res) => {
  // const token = req.headers.token
  Admin.addAdmin(req, res)
})

module.exports = router
