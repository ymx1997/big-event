// 切换 登录 / 注册 盒子
$('#login a').click(function () {
    $('#login').hide().next().show()
})
$('#register a').click(function () {
    $('#login').show().next().hide()
})


// 注册功能
// 表单提交，阻止默认行为，收集用户名、密码，ajax提交给注册接口
$('#register form').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault();
    // 收集表单name值
    let data = $(this).serialize();
    // 发送ajax请求
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: data,
        success: function (res) {
            // 无论成功与否，都给出提示
            layer.msg(res.message);
            if (res.status === 0) {
                // 显示登录窗口，隐藏注册窗口
                $('#login').show().next().hide();
                // 情况注册表单输入框
                $('#register form')[0].reset();
            }
        }
    })
})


// 登录功能
$('#login form').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault();
    // 收集表单name值
    let data = $(this).serialize();
    // 发送ajax请求
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 把token添加到本地存储
                localStorage.setItem('token',res.token)
                // 跳转到index.html页面
                location.href = 'https://www.baidu.com';
            }
        }
    })
})