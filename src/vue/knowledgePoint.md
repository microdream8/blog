---
title: '框架相关知识点'
sidebar: auto
collapsable: true
---

# 框架相关知识点

## 虚拟dom的概念

### dom本质
浏览器的概念，用js对象来表示页面上的元素，并提供了操作dom对象的API

### DOM树的概念
一个网页的呈现过程：<br/>
1、浏览器请求服务器获取页面HTML代码<br/>
2、浏览器在内存中，解析dom结构，并在浏览器内存中渲染出一颗dom树。<br/>
3、浏览器把dom树，呈现在页面上。<br/>

### 虚拟dom
指的是用js对象的形式，来模拟页面上Dom嵌套关系。（以js对象的形式存在的）<br/>
例如：
```html
<div id="name" title= "name">
ccccc 
<p>dhhhh</p>
</div>
```
文本也属于子节点<br/>
模拟dom为：<br/>
```js
var div = {
  tagName: 'div',
  attrs:{
    id: "name" ，
    title: "name"   
},
childrens: [
  'ccccc',
    {
      tagName: 'p',
      attrs:{},
      childrens: [
          'dhhhh',
      ]
    }
]
}
```

### dom和虚拟dom的区别
dom：浏览器中提供的概念，用JS对象表示页面上的元素，并提供了操作元素的api。<br/>
虚拟dom：框架中的概念，是开发框架的程序猿手动用js对象来模拟dom元素和嵌套关系。<br/>
本质： 用就是对象来模拟dom元素和嵌套关系<br/>
目的： 实现页面元素的高效更新。<br/>

### Diff算法
tree diff:新旧两棵dom树，dom层逐级对比完毕，则所有需要被按需更新的元素，必然能够找到。<br/>
component diff:在进行tree diff的时候，每一层中组件级别的对比，叫做component diff,<br/>
如果对比前后组件类型相同，则暂时认为此组件不需要被更新；<br/>
如果对比前后组件类型不同，则需要移除旧组件，创建新组件，并追加到页面上。<br/>
element diff 在进行组件对比的时候，如果两个组件类型相同，则需要进行元素级别的对比。<br/>
<br/>
详细参考：<br/>
https://www.jianshu.com/p/5a5d3195b70c<br/>








1. 数组对象更新
```js
Vue.set(item[0], 'description', finalStr);  // （arr/obj, name, newvalue) 数组或对象可以具体到某一项
```
