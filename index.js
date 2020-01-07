const express = require('express')
const server = express()

server.use(express.static('./static'))

server.listen('0103', () => {
  console.log('port: 0103')
})
