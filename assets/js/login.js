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
        url: '/api/reguser',
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
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 把token添加到本地存储
                localStorage.setItem('token', res.token)
                // 跳转到index.html页面
                location.href = '/index.html';
            }
        }
    })
})


// 自定义验证规则
let form = layui.form;
form.verify({
    length: [/^\S{6,12}$/, '密码长度为6~12位，不能有空格哟！'],
    same: function (val) {
        var pwd = $('.pwd').val();
        if(pwd !== val) {
            return '两次输入的密码不一致哟！'
        }
    }
})