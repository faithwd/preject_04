$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    // 定义查询参数对象，请求参数的时候
    // 需要将请求对象提交到服务器
    var q = {
        pagenum: 1, //页码值默认请求第一页的数据
        pagesize: 2, //每页显示几条数据默认2条
        cate_id: '', //图书分类的id
        state: '' //图书
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date);
        var y = padzero(dt.getFullYear())
        var m = padzero(dt.getMonth() + 1)
        var d = padzero(dt.getDay())

        var hh = padzero(dt.getHours())
        var mm = padzero(dt.getMinutes())
        var ss = padzero(dt.getSeconds())

        return y + '-' + m + '-' + d + '  ' + hh + ':' + mm + ':' + ss;
    }

    // 定义补0的函数
    function padzero(n) {
        return n > 9 ? n : '0' + n;
    }

    initTable();
    initCate();

    // 初始化图书数据
    function initTable() {
        $.ajax({
            method: 'GET',
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 1) {
                    return layer.msg('获取文章列表失败');
                }
                // 使用模板引擎渲染页面数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                // 调用渲染分页的方法
                renderPages(res.total);
            }
        })
    }

    // 初始化图书分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                    // 属性选择器
                $('[name=cate_id]').html(htmlStr)
                    // 调用render方法显示出可选项 通知layui重新渲染
                form.render()
            }
        })
    }

    // 为筛选表单绑定submit事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            // 为查询参数对象q中对应的属性赋值
        q.cate_id = cate_id;
        q.state = state;
        // 根据最新的筛选条件，重新渲染表格数据
        initTable();
    })

    // 定义分页列表的方法
    function renderPages(total) {
        // 调用laypage.render()方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', //分页容器的id
            count: total, //总数据条数
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum, //设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候发生的jump回调
            // 触发jump回调函数有两种方式：
            //  1.点击页码的时候，会触发jump回调函数
            //  2.只要调用了laypage.render()方法，就会触发jump回调
            jump: function(obj, first) {
                console.log(first);
                console.log(obj.curr);
                q.pagenum = obj.curr;
                // 根据最新的q获取对相应的数据列表，并渲染表格

                // 把最新的条目数赋值 到q这个查询参数对象的pagesize属性中
                q.pagesize = obj.limit
                if (!first) {
                    initTable();
                }
            }
        })
    }

    // 代理方式
    $('tbody').on('click', '.btn-del', function() {
        // 获取删除按钮的个数
        var len = $('.btn-del').length;
        // 弹出层
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            // 获取文章的id
            var id = $(this).attr('data-id')
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功');
                    // 当数据删除完成后，需要判断当前这一页，是否还有剩余的数据
                    // 如果没有剩余数据，则让页码值减去1之后
                    // 如果len的值等于1，证明删除完毕之后，页面上就没有任何数据
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                    }
                    // 再重新调用initTable方法
                    initTable();
                }
            })
            layer.close(index);
        })

    })
})