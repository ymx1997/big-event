// 加载layui 所需layui模块
let form = layui.form;

// ----------------------- 获取分类渲染到下拉框 -----------------------
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        let str = template('tpl-category', res);
        $('select[name=cate_id]').html(str);
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
$('button:contains("选择封面")').on('click', function () {
    $('#file').trigger('click');
})

// 图片切换时，更换剪裁区图片
$('#file').on('change', function () {
    // 找到文件对象
    var fileObj = this.files[0];

    // 创建url
    var url = URL.createObjectURL(fileObj);

    // 更换图片
    theImg.cropper('destroy').attr('src', url).cropper(options);
})

// ------------------- 完成添加功能 -----------------------
// 利用事件委托机制，给form表单绑定提交事件
$('form').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault();
    // 收集表单数据 FormDate格式
    let fd = new FormData(this);
    // 替换FormData对象里面的一项
    fd.set('content', tinyMCE.activeEditor.getContent())
    // 剪裁图片
    let canvas = theImg.cropper('getCroppedCanvas', {
        width: 400,
        height: 200
    });
    // 把图片转成blob形式
    canvas.toBlob(function (blob) {
        // 形参blbo就是转换后的结果
        // 把文件追加到fd中
        fd.append('cover_img', blob)
        // 遍历fd对象，检查fd对象中是否包括了接口要求的5个参数
        // fd.forEach((value, key) => {
        //     console.log(key, value)
        // })
        // ----------- ajax提交接口，完成添加 ------------
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            // 提交formdata数据，必须加下面两个选项
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message);
                if (res.status === 0) {
                    location.href = '/article/articleList.html';
                }
            }
        });
    })
})