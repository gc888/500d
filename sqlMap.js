// sql语句
const sqlMap = {
  // 登录注册类
  user: {
    search: 'SELECT * FROM `500d_pass` WHERE pass = ?',
    login: 'SELECT name from `500d` WHRER name = ?',
    reduce: 'UPDATE `500d_pass` SET num=num-1 WHERE pass = ? and num > 0',
    allNum: 'UPDATE `500d_data` SET downNum=downNum+1'
  }
}

module.exports = sqlMap
