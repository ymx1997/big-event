// 在最前面加载 所需的layui 模块
let laypage = layui.laypage;
let form = layui.form;


// --------------获取文章列表并渲染--------------
let data = {
    pagenum: 1,
    pagesize: 2
}

function renderArticleList() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            let html = template('tpl-list', res)
            $('tbody').html(html)
            // ajax请求之后，调用renderPage，展示分页页码
            renderPage(res.total)
        }
    })
}
renderArticleList();



// ---------------分页--------------
// 封装一个展示页码的函数
function renderPage(t) {
    // 执行laypage实例
    laypage.render({
        elem: 'page', // 存放分页的容器  id值  注意不能加"#"
        count: t, // 数据总数，一般从服务端获得
        limit: data.pagesize, // 每页显示的条数
        limits: [2, 3, 5, 10], // 每页条数的选择项
        curr: data.pagenum, // 起始页 一般用于刷新类型的跳页以及HASH跳页
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], // 自定义排版
        jump: function (obj, first) {
            if (first === undefined) {
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                renderArticleList();
            }
        }
    })
}



// ----------------发送ajax请求，获取所有分类---------------
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        let html = template('tpl-category', res);
        $('select[name=category]').html(html);
        // 下拉框重新渲染，故要调用layui的更新渲染方法
        form.render('select');
    }
})



// -----------------筛选功能----------------------
$('.search').on('submit', function (e) {
    e.preventDefault();
    let page = $(this).serializeArray();
    // console.log(data);
    // 修改请求参数，发送ajax
    data.cate_id = page[0].value;
    data.state = page[1].value;
    // 重置pagenum
    data.pagenum = 1;
    renderArticleList();
})



// -----------------注册模板过滤器---------------
template.defaults.imports.dateFormat = function (str) {
    let date = new Date(str);
    // 获取年月日时分秒
    let y = date.getFullYear();
    let m = addZero(date.getMonth() + 1);
    let d = addZero(date.getDate());
    let h = addZero(date.getHours());
    let i = addZero(date.getMinutes());
    let s = addZero(date.getSeconds());
    return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
}

function addZero(n) {
    return n < 10 ? '0' + n : n;
}



// ------------------------删除文章-----------------------
// 利用事件委托机制，给删除按钮绑定点击事件
$('body').on('click', 'button:contains("删除")', function () {
    let id = $(this).data('id');
    // console.log(id);
    layer.confirm('您真的狠心删除此文章吗?', function (index) {
        $.ajax({
            url: '/my/article/delete/' + id,
            success: function (res) {
                // 无论成功与否给出提示
                layer.msg(res.message)
                if (res.status === 0) {
                    renderArticleList()
                }
            }
        })
        layer.close(index);
    });
})