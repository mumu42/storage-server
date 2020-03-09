const sql = require('mysql')
const xlsx = require('node-xlsx')
const fs = require('fs')
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

// 将数据库数据导出生成excel表
module.exports.exportList = (list, header, fileName) => {
  return new Promise((resolve, reject) => {
    let data = [header]
    for (let i = 0; i < list.length; i++) {
      let arr = []
      let value = list[i]
      for (let key in value) {
        arr.push(value[key])
      }
      data.push(arr)
    }
    let buffer = xlsx.build([{
      name: fileName.split('-')[0],
      data
    }])
    const filepath = `./static/files/${fileName}.xlsx`
    fs.writeFile(filepath, buffer, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}
