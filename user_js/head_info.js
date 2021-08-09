$(function() {
    var $image = $('#img');
    var layer = layui.layer;
    // 选项配置
    const options = {
            // 纵横化
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 创建裁剪区域
    $image.cropper(options);

    // 上传按钮绑定点击事件
    $('#btnChoose').on('click', function() {
            $('#file').click()
        })
        //  为文件选择框绑定change事件
    $('#file').on('change', function(e) {
            var fileList = e.target.files
            if (fileList.length === 0) {
                return layer.msg('请选择照片！');
            }

            // 拿到用户选择的文件
            var file = e.target.files[0]
                // 将文件转化为路径
            var imgUrl = URL.createObjectURL(file);
            // 重新初始化裁剪区域
            $image.cropper('destroy') //销毁旧得裁剪区域
                .attr('src', imgUrl) //重新设置路径
                .cropper(options) //重新初始化裁剪区域
        })
        // 为确定按钮，绑定事件
    $('#btnUpload').on('click', function() {
        // 要拿到用户裁剪之后的头像
        var data = $image.cropper('getCroppedCanvas', {
                // 创建一个一个Canvas
                width: 100,
                height: 100
            })
            .toDataURL('image/png') //将Canvas画布上的内容，转化为base64格式的字符串
            // 调用接口，把头像传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: data
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                    // 调用父页面的方法
                window.parent.getInfo();
            }
        })
    })
})