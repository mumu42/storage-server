const sql = require('mysql')
const con = sql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'hgz'
})

module.exports.select = (params) => {
  return new Promise((resolve, reject) => {
    let sqlStr = `select ${params.values} from ${params.table}`
    params.conditions && (sqlStr += ` where ${params.conditions} ${params.limit ? 'limit ' + params.limit : ''}`)
    con.query(sqlStr, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports.insert = (params) => {
  return new Promise((resolve, reject) => {
    const sqlStr = `insert into ${params.table}(${params.keys}) values(${params.num})`
    con.query(sqlStr, [ ...params.values ], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports.update = (params) => {
  return new Promise((resolve, reject) => {
    const sqlStr = `update ${params.table} set ${params.values} where ${params.conditions}`
    con.query(sqlStr, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports.delete = (params) => {
  return new Promise((resolve, reject) => {
    const sqlStr = `delete from ${params.table} where ${params.conditions}`
    con.query(sqlStr, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
