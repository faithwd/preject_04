// npm init -y
// npm install express@4.17.1
// npm i cors@2.8.5  

// 导入express
const express = require('express')
    // 创建服务器的实例对象
const app = express()

// 导入并配置cors中间件,解决跨域问题
const cors = require('cors')
app.use(cors())
    // 配置解析表单数据的中间件,注意 这个中间件只能解析application/x-www-form-urlencode 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 导入并使用路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 启动服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
})