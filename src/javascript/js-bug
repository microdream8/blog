---
title: 'js曾经的坑'
sidebar: auto
collapsable: true
---
# js曾经的坑
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


