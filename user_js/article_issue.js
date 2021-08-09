$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initCate();
    // initEditor();
    // 加载文章类别的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章列表分类失败')
                }
                // 调用模板引擎，渲染下拉菜单
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render();
            }
        })
    }

    // 初始化裁剪区
    var $image = $('#image')
    const options = {
            // 纵横化
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 创建裁剪区域
    $image.cropper(options);

    // 为选择封面的按钮，绑定点击事件处理函数
    $('#btnChoose').on('click', function(e) {
            $('#coverFile').click('change', function(e) {
                // 获取文件列表数组
                var files = e.target.files
                    // 判断用户是否选择了文件
                if (files.length === 0) {
                    return
                }
                // 根据文件，创建对应的url地址
                var newImg = URL.createObjectURL(files[0])
                    // 为裁剪区域重新设置图片
                $image
                    .cropper('destroy') //销毁旧的裁剪区域
                    .attr('src', newImg) //重新设置图片路径
                    .cropper(options) //重新初始化裁剪区域
            })
        })
        // 定义文章的发布状态
    var art_state = '已发布'
        // 为存为草稿按钮，绑定点击事件处理函数
    $('#btnSave').on('click', function() {
            art_state = '草稿'
        })
        // 为表单绑定submit提交事件
    $('#form-pub').on('submit', function(e) {
        // 阻止表单的默认行为
        e.preventDefault()
            // 基于form表单，快速创建一个FormData 对象
        var fd = new FormData($(this)[0])
            // 将文章的发布状态，存到fd中
        fd.append('state', art_state)
            // 将封面裁剪过后的图片，输出为一个文件对象
        $image.cropper('getCroppedCanvas', {
                width: 400,
                height: 200
            })
            .toBlob(function(blob) {
                // 将Canvas画布上的内容，转化为文件对象
                // 得到文件对象之后，进行后续操作
                // 将文件对象，存储到fd中
                fd.append('cover_img', blob)
                    // 发起Ajax请求
                pubArticle(fd)
            })
    })

    // 定义一个发布文章的方法
    function pubArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是formData格式的数据
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败')
                }
                layer.msg('发布文章成功')
                    // 发布文章成功后，跳转到文章列表页面
                location.href = '../user_html/article_list.html'
            }
        })
    }
})