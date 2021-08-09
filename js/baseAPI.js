// 注意：每次调用$>get()或$.post()或$.ajax()的时候会先调用ajaxPrefilter这个函数
// 这个函数中可以拿到ajax提供的配置对象

$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.header = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂在complate回调函数
    options.complate = function(res) {
        // 在回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
            // 强制清空 token
            localStorage.removeItem('token')
                // 强制跳转
            location.href = '../html/login.html'
        }
    }
})