const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const morgan = require('morgan') // 命令行 log 显示

const routes = require('./routes')
const config = require('../config')

let port = process.env.PORT || 8080

let options = {
  secret: config.secret,
  resave: true, // 强制更新 session
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    // maxAge: null,
  }
}

app.use(session(options))
app.use(morgan('dev'))
app.use(bodyParser.json()) // 解析 json body 传入值
app.use(bodyParser.urlencoded({ extended: false })) // 支持 x-www-form-urlencoded 请求体

routes(app)

app.listen(port, () => {
  console.log('listening on port : ' + port);
})
