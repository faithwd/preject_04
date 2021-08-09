$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initArt();
    // 获取文章分类列表
    function initArt() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章列表分类失败')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
            }
        })
    }
    // 为添加类别按钮绑定事件
    var indexAdd = null;
    $('#btnAddCate').on('click', function() {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式为form-add表单绑定 submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArt()
                layer.msg('新增分类成功')
                    // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }

        })
    })

    // 修改文章分类 通过代理的形式为form 表单事件
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改图书分类信息层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }

        })
    })

    // 通过代理的形式为编辑按钮绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 1) {
                    return layer.msg('更新数据分类失败')
                }
                layer.msg('更新文章数据成功')
                layer.close(indexEdit)
                initArt();
            }
        })
    })

    // 通过代理的形式为删除按钮绑定事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功')
                    layer.close(index)
                    initArt();
                }
            })
        })
    })
})