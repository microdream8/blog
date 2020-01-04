---
title: 'VUE小知识点'
sidebar: auto
collapsable: true
---
<b>最近开发以vue框架为主，遇到了好多知识盲区，总结如下</b>
1. 数组对象更新
```js
Vue.set(item[0], 'description', finalStr);  // （arr/obj, name, newvalue) 数组或对象可以具体到某一项
```