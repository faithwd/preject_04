// 导入express
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应模块
const user_hander = require('../router_hander/user')

//  注册新用户
router.post('/reguser', user_hander.regUser)

// 登录用户
router.post('/login', user_hander.login)


// 挂载
module.exports = router