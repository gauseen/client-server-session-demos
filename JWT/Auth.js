const JWT = require('jsonwebtoken')
const config = require('../config')

module.exports = function JWTAuth (req, res, next) {
  let authorization = token = req.headers['authorization']

  if (!authorization) return res.status(401).send({ success: false, message: '[JWT] 无效的 authorization 头信息' })

  JWT.verify(token, config.secret, (err, decoded) => { // 用户认证
    if (err) {
      res.status(500).send({ success: false, message: 'token invalid' })
    } else {
      console.log('decoded: ', decoded)
      // 在 req 上添加 username, 以便于传到下一个中间件取出 username 来查询数据库
      req.username = decoded.username
      next()
    }
  })
}
