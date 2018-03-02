const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../sqlMap')
// 数据库查询
const pool = mysql.createPool(models.mysql)

router.post('/login', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err
    } else {
      // 判断密码是否为空
      let params = req.body
      let searchPass = $sql.user.search
      if (params.pass.length !== 0) {
        // 查询密码是否已经使用
        connection.query(searchPass, [params.pass], (err, result) => {
          if (err) {
            throw err
          } else {
            if (result.length !== 0) {
              req.session.name = params.pass
              res.json({
                status: 1,
                result: result,
                msg: '登录成功!'
              })
            } else {
              // 没有此账号注册
              res.json({
                status: -1,
                result: '',
                msg: '账号不存在!'
              })
            }
          }
        })
      } else {
        res.json({
          status: -1,
          result: '',
          msg: '密码不能为空!'
        })
      }
      connection.release()
    }
  })
})

module.exports = router
