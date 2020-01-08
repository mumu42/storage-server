const express = require('express')
let router = express.Router()
const Admin = require('../base-handle/admin')

router.post('/login', Admin.login)
router.post('/admin/add', Admin.addAdmin)

module.exports = router
