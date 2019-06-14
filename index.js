const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan') // 命令行 log 显示
const mongoose = require('mongoose')

// JWT
const routes = require('./JWT/routes')
const config = require('./config')

let port = process.env.PORT || 8080

app.use(morgan('dev')) // 命令行中显示程序运行日志,便于 bug 调试
app.use(bodyParser.json()) // 解析 json body 传入值
app.use(bodyParser.urlencoded({ extended: false })) // 支持 x-www-form-urlencoded 请求体

routes(app)

mongoose.connect(config.database) // 连接数据库

app.listen(port, () => {
	console.log('listening on port : ' + port);
})
