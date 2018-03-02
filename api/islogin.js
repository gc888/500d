const express = require('express')
const models = require('../db')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../sqlMap')
// 数据库查询
const pool = mysql.createPool(models.mysql)

router.post('/islogin', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err
    } else {
      if (req.session.name !== '') {
        let searchPass = $sql.user.search
        connection.query(searchPass, [req.session.name], (err, result) => {
          if (err) {
            throw err
          } else {
            if (result.length !== 0) {
              res.json({
                status: 1,
                result: result,
                msg: '已登录'
              })
            } else {
              res.json({
                status: -1,
                result: '',
                msg: '未登录'
              })
            }
          }
        })
      } else {
        res.json({
          status: -1,
          result: '',
          msg: '未登录'
        })
      }
    }
  })
})

module.exports = router
