$(function() {

    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个叫做pwd校验框
        pass: [
            /^[\S]{6,12}$/
            // '密码必须6到12位，且不能出现空格'
        ],
        // 两次密码校验
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单事件
    $('#form_reg').on('submit', function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 1) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录');
                // 模拟人的点击行为
                $('#link_login').click();
            })
    })

    // 监听登录表单的提交
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            // 快速获取表单中数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 1) {
                    return layer.msg('登录失败');
                }
                // 将登录成功的token字符串保存到localStorage中
                layer.msg('登录成功');
                // 将登录成功后的值存到本地存储
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '../html/index.html';
            }
        })
    })
})