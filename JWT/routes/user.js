const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const UserModel = require('../models/user')
const JWTAuth = require('../Auth')

const router = express.Router()

router.post('/signup', (req, res) => {
	if (!req.body.name || !req.body.password) {
		res.json({success: false, message: '请输入您的账号密码'})
		return
	}
	let newUser = new UserModel({
		name: req.body.name,
		password: req.body.password
	})
	// 保存用户信息
	newUser.save(err => {
		if (err) return res.json({success: false, message: '注册失败'})
	})
	res.send({success: true, message: '成功创建新用户'})
})

router.post('/signin', (req, res) => {{
	UserModel.findOne({
		name: req.body.name
	}, (err, user) => {
		if (err) throw err

		if (user && req.body.password === user.password) {
			let token = jwt.sign({name: user.name}, config.secret, {
				expiresIn: 10080
			})
			user.token = token

			res.json({
				success: true,
				message: '登录成功123',
				token: token,
				name: user.name
			})
		} else {
			res.json({
				success: false,
				message: '无效的用户名或密码'
			})
		}
	})
}})

router.get('/getUserInfo', JWTAuth, (req, res) => {
	res.send(`${req.name} 成功获取用户信息`)
})

module.exports = router
