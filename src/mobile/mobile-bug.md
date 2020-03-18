---
title: '移动端的那些坑'
sidebar: auto
collapsable: true
---

# 移动端那些坑
<b>最近开发移动端比较多，遇到好多坑，总结如下</b>

## CSS3 相关
### button 背景色在ios中的兼容性，颜色发白

```html
<input type='button'>
```
解决办法：在全局样式中加入以下代码：

```css
input[type=button], input[type=submit], input[type=file]
button { cursor: pointer; -webkit-appearance: none; }
```

### ios端按钮和输入框自带圆角问题
```css
-webkit-appearance : none ; /* 解决ios上按钮的圆角问题 */
border-radius: 0; /* 解决ios上输入框圆角问题 */
```

### swiper轮播图（4.x版本）时遇到的问题
1. 设置slider容器能够同时显示的slides数量：可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量
2. slide能够根据惯性滑动：设置freeMode为true
3. 设定初始化时激活slide的索引：设置initialSlide的值，默认为0
4. 当slider容器中同时显示多个slides时，让激活的slides居中：设置centeredSlides为true
5. 分页器样式设置：设置pagination对象的type属性，当type值为bullets时，会以圆点显示；当type值为fraction时，则会以分式形式显示（形如：1/3、2/3、3/3等）；当type为progressBar时，则会以进度条形式显示，即切换slide时，上方会显示进度条
6. swiper默认显示三个，中间显示全部，两边显示部分：设置如下：<br/>
　　　 　spaceBetween: 10 // 表示每个slide间的间隔 <br/>
　　　 　slidesPerView：1.2 // 设置slider容器同时显示slides的数量。<br/>
　　　　 centeredSlides：true // 让中间显示的slides居中
7. swiper动态加载数据轮播滑动异常，也无法自动轮播（自动轮播的前提是要设置autoplay:true）：需要设置observer:true来启动动态检查器，这样就可以自动自动轮播了，也能手动操作了，然而新的问题来了，手动滑动后，离开滑块，无法继续自动轮播，需要设置autoplay:{disableOnInteraction:false}现在就可以正常轮播了。如果想要循环轮播，则添加loop:true（此时新的bug出现了，就是轮播的时候跳过了第一张跟最后一张，目前还未解决）。

### h5页面点击元素会出现灰色背景
```css
body {-webkit-tap-highlight-color: rgba(255, 255, 255, 0);}
```

### 无法滑动
发现页面在ios上能正常上下滑动，而安卓上不行，pc端也不能滑动，但是通过鼠标滚动是可行的，这时候有可能是css文件中加入了touch-action:none导致的，这句代码作用是阻止页面滚动，将它去掉就好了。坑爹的，困扰我好久了。

### ios上双击强制缩放问题：
```css
*{touch-action: manipulation}   // 该方法还能移除整个文档的触发延迟，对于IE10，需要使用-ms-touch-action
```

### vue图片懒加载（vue-lazeload）,不能动态切换图片（如，切换tab时，图片无法动态改变）
```css
<img v-lazy="imgUrl" :key="imgUrl">  // 为每个img标签添加一个key属性。
```

### 使用translate导致元素内字体模糊
原因：translate中的参数为非整数。常见于translateX(百分比)、translateY(百分比), translate(百分比,百分比)。

解决办法：因为translate中参数百分比其实是相对于操作元素本身的宽或高的百分比，所以可以调整所要操作的元素的宽或高，已达到百分比后的值是整数，这样就能解决元素内字体模糊的问题

### 长时间按住页面出现闪退
```css
Element {
    -webkit-touch-callout: none;
}
```

### 动画定义3D启用硬件加速
```css
Element {
    -webkit-transform:translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
```

### transition闪屏
```css
    -webkit-transform-style: preserve-3d;  // 设置内嵌的元素在 3D 空间如何呈现：保留3D
    -webkit-backface-visibility: hidden;  // 设置进行转换的元素的背面在面对用户时是否可见：隐藏
```

### 圆角bug(某些Android手机圆角失效)
```css
background-clip: padding-box;
```

### select 下拉选择设置右对齐
设置如下：
```css
select option {
    direction: rtl;
}
```

### 通过transform进行skew变形，rotate旋转会造成出现锯齿现象
可以设置如下：
```css
-webkit-transform: rotate(-4deg) skew(10deg) translateZ(0);
transform: rotate(-4deg) skew(10deg) translateZ(0);
outline: 1px solid rgba(255,255,255,0)
```

### 如何用css去掉a标签点击时的背景色
方法如下：

1. 取消a标签在移动端点击时的蓝色：
```css
-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
-webkit-user-select: none;
-moz-user-focus: none;
-moz-user-select: none;
```
2. 使用图片作为a标签的点击按钮时，当触发touchstart的时候，往往会有一个灰色的背景：
```css
a, a:hover, a:active, a:visited, a:link, a:focus {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    background: none;
    text-decoration: none;
}
```
3. 改变选中内容的背景颜色：
```css
::selection {
    background: #FFF;
    color: #333;
}
::-moz-selection {
    background: #FFF;
    color: #333;
}
::-webkit-selection {
    background: #FFF;
    color: #333;
}
```
4. 去除ios input框点击时的灰色背景：
```css
-webkit-tap-highlight-color: rgba(0,0,0,0);
```

### 文本溢出
1. 单行文本溢出省略号(设置宽度限制)
```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

2. 多行文本溢出省略号
```css
display:-webkit-box;
/*! autoprefixer: off */       //解决编译打包不成功的问题
-webkit-box-orient:vertical;
/* autoprefixer: on */       //解决编译打包不成功的问题
-webkit-line-clamp: 3;
overflow:hidden;
```

### 非闭合标签没有:after,:before伪类

### 移动端1px
```css
.border-1px(@color) {
    position: relative;
    &::after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        border-bottom: 1px solid @color;
        box-sizing: border-box;
        content: '';
    }
}
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
    .border-1px {
        &::after {
            -webkit-transform: scaleY(0.7);
            transform: scaleY(0.7);
        }
    }
}
@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2) {
    .border-1px {
        &::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        }
    }
}
```

 ### 关闭textarea等可编辑器的拼写错误（底部出现红色波浪线）
 spellcheck="true"

 ### 动画
 1. 
 ```css
animation: fb-in .35s;
@keyframes fb-in {
    0% {
        bottom: 120px;
    }
    100% {
        bottom: 209px;
    }
}
 ```
 2. 
 ```css
 <transition name="bg-fade"></transition>
.bg-fade-enter-active,.bg-fade-leave-active {  //detail-fade
    transition:all .4s ease;
}
.bg-fade-leave-active {
    opacity: 0;
}
.bg-fade-enter,.bg-fade-leave-to {
    opacity: 0;
}
 ```
3. 解决动画卡顿及抖动问题
 ```css
-webkit-backface-visibility: hidden;  //隐藏被旋转的 div 元素的背面;如果在旋转元素不希望看到其背面时，该属性很有用。
-webkit-transform-style: preserve-3d;  //使被转换的子元素保留其 3D 转换;子元素将保留其 3D 位置。
animation-fill-mode: forwards;
/* //讲解： animation-fill-mode : none | forwards | backwards | both;   不改变默认行为。当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。向前和向后填充模式都被应用。 */
 ```

 ### -webkit-tap-highlight-color
这个属性只用于iOS (iPhone和iPad)。当你点击一个链接或者通过Javascript定义的可点击元素的时候，它就会出现一个半透明的灰色背景。要重设这个表现，你可以设置-webkit-tap-highlight-color为任何颜色。
想要禁用这个高亮，设置颜色的alpha值为0即可。

示例：设置高亮色为50%透明的红色:

-webkit-tap-highlight-color: rgba(255,0,0,0.5);

### css3中-webkit-text-size-adjust
1. 当样式表里font-size<12px时，中文版chrome浏览器里字体显示仍为12px，这时可以用 html{-webkit-text-size-adjust:none;}
2. -webkit-text-size-adjust放在body上会导致页面缩放失效
3. body会继承定义在html的样式
4. 用-webkit-text-size-adjust不要定义成可继承的或全局的


## html 相关

### 顶部状态栏背景色
```css
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```
::: warning 注意
除非你先使用apple-mobile-web-app-capable指定全屏模式，否则这个meta标签不会起任何作用。<br/>
如果content设置为default，则状态栏正常显示。如果设置为blank，则状态栏会有一个黑色的背景。如果设置为blank-translucent，则状态栏显示为黑色半透明。<br/>
如果设置为default或blank，则页面显示在状态栏的下方，即状态栏占据上方部分，页面占据下方部分，二者没有遮挡对方或被遮挡。<br/>
如果设置为blank<br/>
默认值是default。
:::

### 设置缓存
```html
<meta http-equiv="Cache-Control" content="no-cache" />
```
手机页面通常在第一次加载后会进行缓存，然后每次刷新会使用缓存而不是去重新向服务器发送请求。如果不希望使用缓存可以设置no-cache。

### IOS键盘字母输入，默认首字母大写
```html
<input type="text" autocapitalize="off" />
```

### 启动画面
```html
<link rel="apple-touch-startup-image" href="start.png"/>
```
iOS下页面启动加载时显示的画面图片，避免加载时的白屏。

可以通过madia来指定不同的大小：
```html
<!--iPhone-->
<link href="apple-touch-startup-image-320x460.png" media="(device-width: 320px)" rel="apple-touch-startup-image" />

<!-- iPhone Retina -->
<link href="apple-touch-startup-image-640x920.png" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />

<!-- iPhone 5 -->
<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="apple-touch-startup-image-640x1096.png">

<!-- iPad portrait -->
<link href="apple-touch-startup-image-768x1004.png" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image" />

<!-- iPad landscape -->
<link href="apple-touch-startup-image-748x1024.png" media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image" />

<!-- iPad Retina portrait -->
<link href="apple-touch-startup-image-1536x2008.png" media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />

<!-- iPad Retina landscape -->
<link href="apple-touch-startup-image-1496x2048.png"media="(device-width: 1536px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)"rel="apple-touch-startup-image" />
```

### 浏览器私有及其它meta
以下属性在项目中没有应用过，可以写一个demo测试以下！<br/>
```html
<!-- QQ浏览器私有 -->
<!-- 全屏模式 -->
<meta name="x5-fullscreen" content="true">

<!-- 强制竖屏 -->
<meta name="x5-orientation" content="portrait">

<!-- 强制横屏 -->
<meta name="x5-orientation" content="landscape">

<!-- 应用模式 -->
<meta name="x5-page-mode" content="app">

<!-- UC浏览器私有 -->
<!-- 全屏模式 -->
<meta name="full-screen" content="yes">

<!-- 强制竖屏 -->
<meta name="screen-orientation" content="portrait">

<!-- 强制横屏 -->
<meta name="screen-orientation" content="landscape">

<!-- 应用模式 -->
<meta name="browsermode" content="application">
```
其它,针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓

```html
<meta name="HandheldFriendly" content="true">
```
微软的老式浏览器

```html
<meta name="MobileOptimized" content="320">
```
windows phone 点击无高光

```html
<meta name="msapplication-tap-highlight" content="no">
```

## js 相关

### 首次不触发
在vue中使用jquery weui中的地区选择器时，通过点击事件来初始化地区选择器，第一次点击无效，第二次点击才触发

解决办法：在mounted生命周期中执行初始化事件，在onClose事件中调用另外一个函数以获取选择器选择的值。这样在其他地方就可以使用这个值了。

### vue中点击事件阻止冒泡
@click.stop

### clipboard.js的使用
按钮触发：按钮我用的是div，pc端能正常使用，ios上失效（安卓不清楚，没测过）。折腾好久，最后尝试将div换成button按钮后，pc、ios均正常

### vue遮罩层阻止默认滚动事件（适用于遮罩层本身没有滚动事件的，否则本身的滚动事件也会被阻止）
@touchmove.prevent

### App嵌入h5页面（使用vue）

问题：如果App端需要在页面跳转时拦截到跳转路径，使用vue的路由跳转方法时，App端是拦截不到的，因为vue是单页面应用，根本不存在页面的跳转。

解决方案：使用window.location.href方法跳转（注：如果当前页面使用window.location.href跳转，且路径中带有查询参数，在跳转后的页面中仍然可以使用this.$route.query来获取查询参数）

### h5网站input 设置为type=number的问题
h5网页input 的type设置为number一般会产生三个问题，一个问题是maxlength属性不好用了。另外一个是form提交的时候，默认给取整了。三是部分安卓手机出现样式问题。

问题一解决，我目前用的是js。如下

```html
<input type="number" oninput="checkTextLength(this ,10)">
```
```js
function checkTextLength(obj, length) {
    if(obj.value.length > length)  {    
       obj.value = obj.value.substr(0, length);
    }
}
```

问题二，是因为form提交默认做了表单验证，step默认是1,要设置step属性，假如保留2位小数，写法如下：
```html
<input type="number" step="0.01" />
```
关于step，我在这里做简单的介绍，input 中type=number，一般会自动生成一个上下箭头，点击上箭头默认增加一个step，点击下箭头默认会减少一个step。number中默认step是1。也就是step=0.01,可以允许输入2位小数，并且点击上下箭头分别增加0.01和减少0.01。

假如step和min一起使用，那么数值必须在min和max之间。

看下面的例子：
```html
<input type="number" step="3.1" min="1" />
```
输入框可以输入哪些数字？

首先，最小值是1，那么可以输入1.0，第二个是可以输入（1+3.1）那就是4.1,以此类推，每次点击上下箭头都会增加或者减少3.1，输入其他数字无效。这就是step的简单介绍。

问题三，去除input默认样式
```css
input[type=number] {
    -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;   
    margin: 0; 
}
```

### 移动端点透问题
案例如下：
```html
<div id="haorooms">点头事件测试</div>
<a href="#">www.xxx.com</a>
```
div是绝对定位的蒙层,并且z-index高于a。而a标签是页面中的一个链接，我们给div绑定tap事件：<br/>
```js
$('#haorooms').on('tap',function(){
    $('#haorooms').hide();
});
```
我们点击蒙层时 div正常消失，但是当我们在a标签上点击蒙层时，发现a链接被触发，这就是所谓的点透事件。

原因：

touchstart 早于 touchend 早于click。 亦即click的触发是有延迟的，这个时间大概在300ms左右，也就是说我们tap触发之后蒙层隐藏， 此时 click还没有触发，300ms之后由于蒙层隐藏，我们的click触发到了下面的a链接上。

解决：
1. 尽量都使用touch事件来替换click事件。例如用touchend事件(推荐)
2. 用fastclick
3. 用preventDefault阻止a标签的click
4. 延迟一定的时间(300ms+)来处理事件 （不推荐）
5. 以上一般都能解决，实在不行就换成click事件

下面介绍一下touchend事件，如下：
```js
$("#haorooms").on("touchend", function (event) {
    event.preventDefault();
});
```

### 关于 iOS 系统中，中文输入法输入英文时，字母之间可能会出现一个六分之一空格
可以通过正则去掉
```js
this.value = this.value.replace(/\u2006/g, '');
```

### 移动端 HTML5 audio autoplay 失效问题
这个不是 BUG，由于自动播放网页中的音频或视频，会给用户带来一些困扰或者不必要的流量消耗，所以苹果系统和安卓系统通常都会禁止自动播放和使用 JS 的触发播放，必须由用户来触发才可以播放。

解决方法思路：先通过用户 touchstart 触碰，触发播放并暂停（音频开始加载，后面用 JS 再操作就没问题了）。

解决代码：
```js
document.addEventListener('touchstart', function () {
    document.getElementsByTagName('audio')[0].play();
    document.getElementsByTagName('audio')[0].pause();
});
```

### js 监听ios手机键盘弹起和收起的事件
```js
document.body.addEventListener('focusin', () =>{  // 软键盘弹起事件 
    console.log("键盘弹起");
 
})
document.body.addEventListener('focusout', () =>{  // 软键盘关闭事件 
    console.log("键盘收起");
})
```

### 禁止缩放
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1,user-scalable=no">
```
兼容IOS
```html
window.onload = function () {
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
        event.preventDefault();
        }
    });
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
        event.preventDefault();
        }
        lastTouchEnd = now;
    },false);
    document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
    });
}
```


