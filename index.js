const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const routers = require('./modules/routers/routers')

server.use(bodyParser)
server.use(express.static('./static'))
server.use(routers)

server.listen('0103', () => {
  console.log('port: 0103')
})
