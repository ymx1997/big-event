// ----------------------初始化剪裁区-------------------

// 获取裁剪区域DOM元素
let theImg = $('#image')

// 配置选项
const option = {
    // 纵横比
    aspectRation: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 创建裁剪区域
theImg.cropper(option)


// ----------------------上传图片功能---------------------
// 点击上传按钮，触发隐藏的 file类型的input 点击事件
$('button:contains("上传")').click(function () {
    $('#file').click()
})

// 更换图片，重置剪裁区
// 文件域内容发生改变时，更换裁剪区域图片
$('#file').change(function () {
    // 找到文件对象
    // console.dir(this);
    var fileObj = this.files[0];
    // 为选择的图片生成一个临时url
    var url = URL.createObjectURL(fileObj)
    // console.log(url);
    // 更换图片的src属性 (销毁剪裁区 - 更换src属性 - 重建剪裁区)
    theImg.cropper('destroy').attr('src', url).cropper(option)
})


// 点击确定 实现裁剪 把图片转成base64 格式 ajax提交字符串，完成修改功能
$('button:contains("确定")').click(function () {
    // 调用插件方法，剪裁图片，剪裁后得到一张canvas格式图片
    var canvas = theImg.cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    });
    // 把canvas图片转成base64格式，得到超长字符串
    var base64 = canvas.toDataURL('image/png');
    // console.log(base64);
    // ajax提交字符串，完成修改
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: { avatar: base64 },
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 重新渲染父页面头像
                window.parent.renderUser();
            }
        }
    })
})
