// 表单验证
// 1) 长度6~12位，不能有空格 （两个新密码都要用）
// 2) 新密码不能和原密码相同
// 3) 两次新密码必须一致

// 加载layui的form模块
let form = layui.form
// 自定义验证规则
form.verify({
    // 长度6-12位 不能有空格
    len: [/^\S{6,12}$/, '密码长度必须是6~12且不能有空格'],
    // 新密码不能和原密码相同
    diff: function (val) {
        // 形参表示使用该验证规则的输入框的值，新密码使用这个验证规则，所以val表示填写的新密码
        // 获取原密码
        var oldPwd = $('input[name=oldPwd]').val()
        if (val === oldPwd) {
            return '新密码不能同于原密码'
        }
    },
    // 两次新密码必须一致
    same: function (val) {
        // val 表示填写的确认新密码
        // 获取新密码
        var newPwd = $('input[name=newPwd]').val()
        if (val !== newPwd) {
            return '两次填写的密码不一致哟！'
        }
    }
})

// 给form表单注册提交事件
$('form').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault();
    // 获取表单name值
    var data = $(this).serialize();
    // console.log(data);   一定检查name属性值
    $.ajax({
        url: '/my/updatepwd',
        type: 'POST',
        data: data,
        success: function (res) {
            // 无论成功与否，给出提示
            layer.msg(res.message);
            if (res.status === 0) {
                // 修改成功，情况输入框
                $('form')[0].reset();  // DOM方法reset表示重置表单
                localStorage.removeItem('token');
                window.parent.location.href = '/login.html';
            }
        }
    })

})