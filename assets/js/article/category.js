// 封装一个获取数据、渲染页面的函数
function render() {
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res.message);
            if (res.status === 0) {
                let html = template('tpl-list', res);
                $('tbody').html(html)
            }
        }
    })
}
// 渲染页面
render();


// 删除类别功能
// 使用contains方法 注册事件
$('body').on('click', 'button:contains("删除")', function () {
    // 获取当前id
    let id = $(this).data('id');
    // 利用弹出层layer.confirm询问
    layer.confirm('你真的要狠心删除吗?', function (index) {
        // 发送Ajax请求
        $.ajax({
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                // 无论成功or失败 ，给出弹框提示消息
                layer.msg(res.message);
                if (res.status === 0) {
                    render();
                }
            }
        })
        // 关掉弹层
        layer.close(index);
    });
})


// 添加类别功能
// 使用contains方法 绑定事件
var addIndex;
$('button:contains("添加")').click(function () {
    // 使用layer.open弹层
    addIndex = layer.open({
        type: 1,
        title: '添加类别',
        content: $('#tpl-add').html(),
        area: ['500px', '250px']
    });
})
// 利用事件委托给表单注册submit事件
$('body').on('submit', '.add-form', function (e) {
    e.preventDefault();
    // 使用serialize获取form表单name值
    let data = $(this).serialize();
    // 发送Ajax请求
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: data,
        success: function (res) {
            layer.msg(res.message)
            if (res.status === 0) {
                render();
                // 关闭弹层
                layer.close(addIndex);
            }
        }
    })
})

// 编辑类别功能
$('body').on('click', 'button:contains("编辑")', function () {
    // 使用layer.open弹层
    var editIndex = layer.open({
        type: 1,
        title: '编辑类别',
        content: $('#tpl-edit').html(),
        area: ['500px', '250px']
    });
    // 获取事件源的三个自定义属性
    var data = $(this).data();
    // 设置输入框的默认值
    $('input[name="name"]').val(data.name);
    $('input[name="alias"]').val(data.alias);
    $('input[name="id"]').val(data.id);
    // 利用事件委托给表单注册submit事件
    $('body').on('submit', '.edit-form', function (e) {
        // 阻止默认行为
        e.preventDefault();
        // 使用serializeArray获取当前name值
        let data = $(this).serializeArray();
        // 注意接口中id的i是大写
        data[2].name = 'Id';
        // 发送Ajax请求
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    render();
                    layer.close(editIndex);
                }
            }
        })
    })
})