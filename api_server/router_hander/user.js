// 注册新用户的处理函数
exports.regUser = function(req, res) {
    res.send('reguser ok')
}

// 登录用户的处理函数
exports.login = function(req, res) {
    res.send('login ok')
}

// 通过exports向外暴露出去