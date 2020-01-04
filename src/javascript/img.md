---
title: '图片常见问题总结'
sidebar: auto
collapsable: true
---
# js实现图片资源转化成base64的各种场景

网络上有很多片介绍通过js将图片转换成base64的文章，之所以再写这篇文章的原因时发现没有找到系统的介绍的文章，有的介绍如何实现本地项目的图片转码，有的介绍如何实现网络资源的图片转化，但是系统介绍的少之又少，所以我就在这里将各种场景系统的介绍一下：<br/>
<b>场景一：将用户本地上传的资源转化，即用户通过浏览器点击文件上传时，将图片资源转化成base64：</b>
```html
<input type="file" id="image" />
```
```js
var reader = new FileReader();
var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
var file = $("#image")[0].files[0];
var imgUrlBase64;
if (file) {
    //将文件以Data URL形式读入页面  
    imgUrlBase64 = reader.readAsDataURL(file);
    reader.onload = function (e) {
        //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
        if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
            alert( '上传失败，请上传不大于2M的图片！');
            return;
        }else{
            //执行上传操作
            alert(reader.result);
        }
    }
}  
```

<b>场景二：将本项目中的图片资源转化成base64,（我还没有用到过此场景，感觉场景二也可以通过场景三来实现）</b>
```js
function(){
    var url = "static/img/js1.jpg";//这是站内的一张图片资源，采用的相对路径
    convertImgToBase64(url, function(base64Img){
    //转化后的base64
    alert(base64Img);
    });             
}
//实现将项目的图片转化成base64
function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
　　ctx = canvas.getContext('2d'),
　　img = new Image;
　　img.crossOrigin = 'Anonymous';
　　img.onload = function(){
    　　canvas.height = img.height;
    　　canvas.width = img.width;
    　　ctx.drawImage(img,0,0);
    　　var dataURL = canvas.toDataURL(outputFormat || 'image/png');
    　　callback.call(this, dataURL);
    　　canvas = null; 
    };
　　img.src = url;
}
```

<b>将网络图片资源转化为base64，（感觉场景二中的资源换成绝对路径即可使用在场景三中）</b>
```js
function(){
　　 //这是网上的一张图片链接
　　 var url = "http://p1.pstatp.com/large/435d000085555bd8de10";
    getBase64(url)
        .then(function(base64) {
            console.log(base64);  // 处理成功打印在控制台
        }, function(err){
            console.log(err);  // 打印异常信息
        });                        
}
//传入图片路径，返回base64
function getBase64(img){
    function getBase64Image(img, width, height) {  // width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : img.width;
        canvas.height = height ? height : img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        return dataURL;
    }
    var image = new Image();
    image.crossOrigin = '';
    image.src = img;
    var deferred = $.Deferred();
    if(img) {
        image.onload = function (){
        deferred.resolve(getBase64Image(image));  // 将base64传给done上传处理
        }
        return deferred.promise();  // 问题要让onload完成后再return sessionStorage['imgTest']
    }
}
```

至此，便将图片base64转码的三种场景介绍完毕了，下面是基于以上的一下拓展：<br/>
拓展一：后台需要以纯字符串的形式上传（即去掉data:image/png;base64，截取字符串即可）
```js
reader.result.substring(reader.result.indexOf(",") + 1)
```
拓展二：判断base64资源大小，超过2M不让上传
```js
var AllowImgFileSize = 2100000;    //上传图片最大值(单位字节)（ 2 M = 2097152 B ）
if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
    alert( '上传失败，请上传不大于2M的图片！');
    return;
}
```
其中reader.result即是base64转码后的结果。以上便是对网络上的一些资源的整理。


# 解决图片跨域问题
问题来源：途牛海报请求后端的课程图片和头像若是正常的url,会产生跨域，造成生成的canvas不显示对应的图片；当后台传递base64时，造成图片传输数据过大，产生报警的问题。遂开始对所有与图片有关问题的总结具体如下：<br/>
途牛海报解决方案：<br/>
htmlCanvas: 先整体生成html结构，再生成canvas，所以不需要动态创建img标签。<br/>
(1) 创建可跨域的图片标签动态引入src路径: 
```html
<img crossOrigin=”anonymous” :src=”url” alt=”” />
```
(2) 测试时还是不可以，查阅资料得知因为浏览器实用本地缓存，需要禁止浏览器缓存。故将1修改为：
```html
<img crossOrigin=”anonymous” :src=”url+’?’+new Date().getTime()” alt=”” />
```
::: warning 注意
1. allowTaint: true 和 useCORS: true 都是解决跨域问题的方式，不同的是使用allowTaint 会对canvas造成污染，导致无法使用canvas.toDataURL 方法，所以这里不能使用allowTaint: true<br/>
2. 在跨域的图片里设置 crossOrigin="anonymous" 并且需要给imageUrl加上随机数
3. canvas.toDataURL('image/jpg') 是将canvas转成base64图片格式
4. 跨域图片绘制 ：img.setAttribute必须放到 img.src前面去
:::

# 图片上传常见问题
大体流程如下：<br/>
(1). 通过change事件去捕获文件等资源
(2). 判断是否上传成功（file中是否有该资源）
(3). 判断上传的图片类型是否正确
(4). 图片资源大小判断
(5). 特别处理：本人在开发中遇到IOS上上传的图片旋转90度展示，所以对IOS进行特殊处理；Android不变
(6). 图片资源提交到后台

```html
<input class="file-btn" type="file" @change="uploadImg" ref="inputimg" accept="image/*" />
```

<b>上传前的一系列判断</b>
```js
uploadImg(e) {
    const file = e.target.files.length ? e.target.files[0] : '';
    if (!file) {  // 是否上传成功
        console.log('图片上传失败，请重新上传！');
        try {
            this.$refs.inputimg.value = '';  // 防止出现异常，内容设置为空
        } catch (error) {}
        return;
    }
    if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(e.target.value)) {  // 图片格式校验
        console.log('请上传正确的图片格式！');
        try {
            this.$refs.inputimg.value = '';
        } catch (error) {}
        return;
    }
    if (file.size / 1024 / 1024 > 10) {  // 图片大小校验
        console.log('图片不能大于10M，请重新上传！');
        try {
            this.$refs.inputimg.value = '';
        } catch (error) {}
        return;
    }
    if (!navigator.userAgent.toLowerCase().match(/android/i)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this._dealWithImg(file, e.target.result); // 针对苹果手机图片躺着(旋转90度)问题
        };
    } else { // 安卓平台
        this.postUploadImg(file);
    }
}
```

<b>进行图片上传的代码</b>
```js
postUploadImg(file) { // 向后台提交上传的图片
    const data = new FormData();
    data.append('wechatId', this.wechatId);
    data.append('dirId', this.userCode);
    data.append('img', file);
    axios({
        method: 'post',
        url: '/cloud/ai/img/upload',
        data,
    }).then((res) => {});
}
```

<b>特殊处理IOS中图片展示时的旋转90度问题</b>
```js
_dealWithImg(file, res) {
    const defaultImage = {
        width: 1000,
        height: 1000,
        quality: 0.8, // 压缩图片的质量
        orientation: '', // 获取照片方向角属性，用户旋转控制
    };
    const img = new Image();
    img.src = res;
    const initSize = img.src.length;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        defaultImage.width = img.width;
        defaultImage.height = img.height;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        EXIF.getData(file, () => { // IMG_FILE为图像数据
            EXIF.getAllTags(this);
            this.Orientation = EXIF.getTag(file, 'Orientation');
            switch (this.Orientation) {
                case 2:
                    ctx.translate(img.width, 0);
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    break;
                case 3:
                    ctx.rotate(180 * Math.PI / 180);
                    ctx.drawImage(img, -img.width, -img.height, img.width, img.height);
                    break;
                case 4:
                    ctx.translate(img.width, 0);
                    ctx.scale(-1, 1);
                    ctx.rotate(180 * Math.PI / 180);
                    ctx.drawImage(img, -img.width, -img.height, img.width, img.height);
                    break;
                case 5:
                    ctx.translate(img.width, 0);
                    ctx.scale(-1, 1);
                    ctx.rotate(90 * Math.PI / 180);
                    ctx.drawImage(img, 0, -img.width, img.height, img.width);
                    break;
                case 6:
                    canvas.width = img.height;
                    canvas.height = img.width;
                    ctx.rotate(90 * Math.PI / 180);
                    ctx.drawImage(img, 0, 0, img.width, -img.height);
                    break;
                case 7:
                    ctx.translate(img.width, 0);
                    ctx.scale(-1, 1);
                    ctx.rotate(270 * Math.PI / 180);
                    ctx.drawImage(img, -img.height, 0, img.height, img.width);
                    break;
                case 8:
                    ctx.rotate(270 * Math.PI / 180);
                    ctx.drawImage(img, -img.height, 0, img.height, img.width);
                    break;
                default:
                    ctx.drawImage(img, 0, 0, img.width, img.height);
            }
            const imgUrl = canvas.toDataURL(file.type, defaultImage.quality); // // 压缩之后的base64 图片地址
            const data = new FormData();
            const newFile = this.dataURLtoFile(imgUrl, file.name);
            data.append('head', newFile);
            // TODO 上传图片文件
            this.postUploadImg(newFile);
        });
    };
},
```
::: warning 注意
注意： import EXIF from 'exif-js';
:::




# 获取网络图片尺寸

```js
fileHandle(file) {
    const img = new Image();
    img.src = file;
    img.onerror = () => {
        console.log(`${file} 图片加载失败，请检查url是否正确`);
        return false;
    };
    if (img.complete) {
        console.log("显示图片尺寸", img.width, img.height);
    } else {
        img.onload = () => {
            console.log("显示图片尺寸", img.width, img.height);
            img.onload = null;// 避免重复加载
        };
    }
}
```

