$(function() {
    // 调用getInfo获取用户基本信息
    getInfo();

    var layer = layui.layer;
    $('#logout').on('click', function() {
        layer.confirm('你确定退出登录？', {
            icon: 3,
            title: '提示'
        }, function(index) {
            // 1.清空本地存储token
            localStorage.removeItem('token')
                // 2.重新跳转到登录页面
            location.href = '../html/login.html';
            // 关闭弹出框
            layer.close(index);
        })
    })
})

//获取用户基本信息
function getInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar 渲染头像
            renderAvatar(res.data);
        },
        // 不论成功失败，最终都会调用 complete回调函数
    })
}
// 渲染用户头像
function renderAvatar(data) {
    // 1.获取用户名称 昵称 登录名
    var name = data.nickname || data.username
        // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 文本头像
        $('.layui-nav-img').hide()
            // [0]可以获取字符串第一个
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show();
    }
}