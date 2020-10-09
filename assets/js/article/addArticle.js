// 加载layui 所需layui模块
let form = layui.form;

// ----------------------- 获取分类渲染到下拉框 -----------------------
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        let str = template('tpl-category', res);
        $('select[name=category]').html(str);
        // 模板引擎处理完后，重新渲染select
        form.render('select');
    }
})

// 初始化富文本编辑器
initEditor();

// ------------------------ 处理封面图片 ----------------------------
// 初始化剪裁框
// 初始化图片裁剪器
var theImg = $('#image')
// 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}
// 初始化裁剪区域
theImg.cropper(options);

// 点击'选择封面'可选择图片
$('button:contains("选择封面")').click(function(){
    $('#file').click();
})

// 图片切换时，更换剪裁区图片
$('#file').change(function(){
    // 找到文件对象
    var fileObj = this.files[0];

    // 创建url
    var url = URL.createObjectURL(fileObj);

    // 更换图片
    theImg.cropper('destroy').attr('src', url).cropper(options);
})