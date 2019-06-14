// 登录检测
module.exports = function sessionAuth (req, res, next) {
  let username = req.session && req.session.username
  if (!username) {
    res.status(401).send({ success: false, message: '[session] Auth 请先登录' })
    return
  }
  next()
}
