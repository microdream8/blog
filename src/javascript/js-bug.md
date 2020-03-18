---
title: 'js曾经的坑'
sidebar: auto
collapsable: true
---
# js曾经的坑

## textarea随内容高度自动伸缩
```html
<textarea placeholder="请输入内容" rows="3" class="textarea">
```
```css
.textarea {
    margin: 8px 0 2px;
    padding: 8px 10px 33px;
    width: 100%;
    line-height: 1.4;
    background: #F5F5F5;
    border: 1px solid rgb(0, 123, 214);
    border-radius: 4px;
    resize:none;
    outline: none;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
```
在mounted和updated里
```js
$('父元素').on("input",".textarea",function(e) {
  _this.inputCode(this)
})
inputCode(el,rightLine) {
    let _this = this
    var setStyle = function(el) {
    el.style.height = 'auto';
    // el.style.height = el.scrollHeight + 'px';
    el.style.height = (el.scrollHeight + 2) + 'px';   //加上边框 2
    }
    var delayedResize = function(el) {
    window.setTimeout(function() {
        setStyle(el)
    },0);
    }
    if (el.addEventListener) {
    el.addEventListener('input',function() {
        setStyle(el)
    },false);
    setStyle(el)
    } else if (el.attachEvent) {
    el.attachEvent('onpropertychange',function() {
        setStyle(el)
    });
    setStyle(el)
    }
    if (window.VBArray && window.addEventListener) { //IE9
    el.attachEvent("onkeydown",function() {
        var key = window.event.keyCode;
        if (key == 8 || key == 46) delayedResize(el);           
    });
    el.attachEvent("oncut",function() {
        delayedResize(el);
    }); //处理粘贴
    }
}
```

## 动态触发虚拟键盘
```html
<div @touchstart.stop.prevent="touchDirectionFun" @touchend.stop.prevent="endDirectionFun" btn="up" class="fx-btn top-btn"></div>
```
```js
touchDirectionFun(e) { // 触发方向键(开始-keydown)
    if (!this.running && this.workType !== 'TURTLE')
        { return; }
    const $btn = $(e.srcElement).attr('btn');
    if ($btn === 'up') {
        $(e.srcElement).addClass('top-btn-active');
        this.fireKeyEvent($('canvas')[this.canvasIdx], 'keydown', 38);
    } else if ($btn === 'left') {
        $(e.srcElement).addClass('left-btn-active');
        this.fireKeyEvent($('canvas')[this.canvasIdx], 'keydown', 37);
    } else if ($btn === 'right') {
        $(e.srcElement).addClass('right-btn-active');
        this.fireKeyEvent($('canvas')[this.canvasIdx], 'keydown', 39);
    } else if ($btn === 'down') {
        $(e.srcElement).addClass('down-btn-active');
        this.fireKeyEvent($('canvas')[this.canvasIdx], 'keydown', 40);
    } else {
        console.log('按钮获取出错！');
    }
}

endDirectionFun(e) {  // 触发方向键（结束-keyup）
    if (!this.running && this.workType !== 'TURTLE')
    { return; }
    const $btn = $(e.srcElement).attr('btn');
    if ($btn === 'up') {
        $(e.srcElement).removeClass('top-btn-active');
        this.fireKeyEvent($('canvas')[this.canvasIdx], 'keyup', 38);
    } else if ($btn === 'left') {
        $(e.srcElement).removeClass('left-btn-active');
        this.fireKeyEvent($('canvas')[this.canvasIdx], 'keyup', 37);
    } else if ($btn === 'right') {
        $(e.srcElement).removeClass('right-btn-active');
        this.fireKeyEvent($('canvas')[this.canvasIdx], 'keyup', 39);
    } else if ($btn === 'down') {
        $(e.srcElement).removeClass('down-btn-active');
        this.fireKeyEvent($('canvas')[this.canvasIdx], 'keyup', 40);
    }
}

// 动态派发
fireKeyEvent(el, evtType, keyCode) {
    try {
        var doc = el.ownerDocument,
            win = doc.defaultView || doc.parentWindow,
            evtObj;
    } catch (error) {
        return;
    }
    if (doc.createEvent) {
        if (win.KeyEvent) {
            evtObj = doc.createEvent('KeyEvents');
            evtObj.initKeyEvent(evtType, true, true, win, false, false, false, false, keyCode, 0);
        }
        else {
            evtObj = doc.createEvent('UIEvents');
            Object.defineProperty(evtObj, 'keyCode', {
                get() { return this.keyCodeVal; },
            });
            Object.defineProperty(evtObj, 'which', {
                get() { return this.keyCodeVal; },
            });
            evtObj.initUIEvent(evtType, true, true, win, 1);
            evtObj.keyCodeVal = keyCode;
            if (evtObj.keyCode !== keyCode) {
                // console.log("keyCode " + evtObj.keyCode + " 和 (" + evtObj.which + ") 不匹配");
            }
        }
        el.dispatchEvent(evtObj);
    } else if (doc.createEventObject) {
        evtObj = doc.createEventObject();
        evtObj.keyCode = keyCode;
        el.fireEvent(`on${evtType}`, evtObj);
    }
}
```

## 监听滚动
```js
handleScroll() {  //监听滚动事件  
    let scrollObj = document.getElementById('allwrapper'); // 滚动区域  trylisten allwrapper
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset; // div 到头部的距离
    let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
    let screenHeight = window.screen.availHeight
    // this.datas = scrollTop+' , '+scrollHeight+' , '+screenHeight
    if(scrollTop * 1 + screenHeight * 1 >= scrollHeight)
    this.childrenShow = true
    else
    this.childrenShow = false
}
```

## 鼠标移动事件剖析
1. mouseover与mouseenter
* 不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。
* 只有在鼠标指针从元素外穿入被选元素（到元素内）时，才会触发 mouseenter 事件。

2. mouseout与mouseleave
* 不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。
* 只有在鼠标指针从元素内穿出被选元素（到元素外）时，才会触发 mouseleave 事件。
- [参考来源] (https://www.cnblogs.com/bkylee/p/5970236.html)

