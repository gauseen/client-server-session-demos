const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const JWTAuth = require('../Auth')

// 模拟存储数据库
const Store = require('../../store')
const store = new Store()

const router = express.Router()

// 注册
router.post('/signup', (req, res) => {
  let username = req.body.username
  let password = req.body.password

  if (!username || !password) {
    res.json({success: false, message: '请输入账号密码'})
    return
  }

  // 模拟保存用户信息（用户名为 key, 其他详细信息为 value）
  let userInfo = {
    username: username,
    password: password,
  }
  store.save(username, userInfo)
  res.send({success: true, message: '注册成功'})
})

// 登录
router.post('/signin', (req, res) => {{
  let username = req.body.username
  let password = req.body.password

  if (!username || !password) {
    res.json({success: false, message: '请输入您的账号密码'})
    return
  }
  if (!store.find(username)) {
    res.json({success: false, message: '请先注册再登录'})
    return
  }

  // 模拟对比密码是否匹配
  if (password !== store.find(username).password) {
    res.json({success: false, message: '密码错误'})
    return
  }

  // 签名生成 token
  let payload = {
    username: username,
  }
  let token = jwt.sign(payload, config.secret, {
    expiresIn: 10080 // token 有效期
  })
  res.send({success: true, token: token, message: `${username} 登录成功`})
}})


router.get('/user/info', JWTAuth, (req, res) => {
  let username = req.username
  // 拿用户名查找详细信息
  let userInfo = store.find(username)
  res.send({success: true, message: '用户详情获取成功', data: userInfo})
})

module.exports = router
