const express = require('express')
const server = express()

server.use(express.static('./static'))

server.listen('0521', () => {
  console.log('port: 0521')
})
