const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStrore = require('connect-redis')(session)
const app = express()
// 各种接口开始
const login = require('./api/regedit')
const down = require('./api/v2_500d')
const islogin = require('./api/islogin')

// 接口结束
// redis 连接配置
var options = {
  'host': '127.0.0.1',
  'port': 6379,
  'pass': '123456',
  'db': 0,
  'ttl': 10000000,
  'logErrors': true
}
app.use(session({
  name: 'node',
  secret: 'yioMe', // 用来对session id相关的cookie进行签名
  //store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  store: new RedisStrore(options),
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false, // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 有效期，单位是毫秒
  }
}))

// 数据接收处理
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/api/', login)
app.use('/api/', down)
app.use('/api/', islogin)
app.use('/',express.static('dist'))
app.listen(3000,() => {
  console.log('开启服务器成功!')
})
