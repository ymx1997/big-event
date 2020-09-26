// 切换 登录 / 注册 盒子
$('#login a').click(function () {
    $('#login').hide().next().show()
})
$('#register a').click(function () {
    $('#login').show().next().hide()
})