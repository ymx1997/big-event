// 使用layer.form给表单赋值
let form = layui.form;
function renderForm() {
    // 发送ajax请求
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            // 完成数据回填
            form.val('user',res.data)
        }
    })
}
renderForm()


// 表单提交时，用户信息要更新
$('form').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault();
    // 获取表单name值
    let data = $(this).serialize();
    // 发送ajax请求
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: data,
        success: function (res) {
            // 无论成功与否，给出提示
            layer.msg(res.message);
            if (res.status === 0) {
                window.parent.renderUser();
            }
        }
    })
})


// 重置表单
$('button:contains("重置")').click(function (e) {
    // 阻止默认行为
    e.preventDefault();
    // 渲染页面
    renderForm();
})