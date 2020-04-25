---
title: '大厂面试题分类'
sidebar: auto
collapsable: true
---

# 大厂面试题分类

## js相关
### 异步相关
1. 介绍各种异步方案，JS怎么实现异步
2. JS异步解决方案的发展历程以及优缺点
3. 介绍promise及内部实现
4. 介绍下Promise的用途和性质
5. Promise有几个状态，Promise的三种状态
6. 介绍Promise的特性，优缺点,promise的精髓，以及优缺点
7. 介绍Promise，异常捕获
8. 介绍Promise和then
9. promise如何实现then处理
10. a，b两个按钮，点击aba，返回顺序可能是baa，如何保证是aba（Promise.then）
11. Promise有没有解决异步的问题（promise链是真正强大的地方）
12. Promise和Callback有什么区别
13. 如何设计Promise.all()
14. Promise.all实现原理
15. promise async await 等异步的实现
16. 使用Async会注意哪些东西
17. Promise和Async处理失败的时候有什么区别
18. Async里面有多个await请求，可以怎么优化（请求是否有依赖）
19. Promise 和 async/await 和 callback的区别
20. Async/Await怎么实现
21. 对async、await的理解，内部原理
22. 异步请求，低版本fetch如何低版本适配
23. 异步整个执行周期
24. promise里面和then里面执行有什么区别
25. Promise构造函数是同步还是异步执行，then呢
26. Promise和setTimeout的区别（Event Loop）
27. setInterval需要注意的点
28. 定时器为什么是不精确的
29. setTimeout(1)和setTimeout(2)之间的区别
30. Promise和setTimeout执行先后的区别
31. 介绍宏任务和微任务，JS为什么要区分微任务和宏任务

### 跨域相关
1. 对跨域的了解
2. 介绍下浏览器跨域
3. 介绍同源策略
4. 怎么去解决跨域问题
5. 跨域怎么解决，有没有使用过Apache等方案
6. 表单可以跨域吗
7. ajax如何处理跨域
8. Ajax发生跨域要设置什么（前端）
9. jsonp方案需要服务端怎么配合
10. jsonp为什么不支持post方法
11. CORS如何设置
12. 加上CORS之后从发起到请求正式成功的过程
13. xsrf跨域攻击的安全性问题怎么防范

## 数据接口预算法
### 数据结构相关
1. 项目中如何应用数据结构
2. 项目中树的使用场景以及了解
3. 如何判断链表是否有环
4. 介绍二叉搜索树的特点
5. 如何设计状态树

## node相关
1. 介绍koa2
2. koa-body原理
3. 使用的koa中间件
4. 常用的中间件
5. 使用过的koa2中间件
6. koa2中间件原理
7. 介绍自己写过的中间件
8. 有没有涉及到Cluster
9. koa原理，为什么要用koa(express和koa对比
10. 介绍pm2
11. master挂了的话pm2怎么处理
12. 如何和MySQL进行通信
13. koa中response.send、response.rounded、response.json发生了什么事，浏览器为什么能识别到它是一个json结构或是html
14. koa-bodyparser怎么来解析request
15. knex连接数据库响应回调
16. node接口转发有无做什么优化
17. node起服务如何保证稳定性，平缓降级，重启等
18. node文件查找优先级
19. 进程和线程的区别（一个node实例就是一个进程，node是单线程，通过事件循环来实现异步）

## http相关
1. 介绍HTTPS
2. 介绍http2.0
3. HTTP和HTTPS的区别
4. HTTPS怎么建立安全通道
5. HTTPS的加密过程
6. 介绍SSL和TLS
7. 介绍service worker
8. 介绍DNS解析
9. 网络的五层模型
10. http1.1时如何复用tcp连接
11. tcp3次握手
12. tcp属于哪一层（1 物理层 -> 2 数据链路层 -> 3 网络层(ip)-> 4 传输层(tcp) -> 5 应用层(http)）
13. 从输入URL到页面加载全过程
14. http缓存控制
15. 缓存相关的HTTP请求头
16. 介绍下HTTP状态码
17. 403、301、302、304是什么
18. Http报文的请求会有几个部分
19. 常见Http请求头
20. 通过什么做到并发请求
21. Access-Control-Allow-Origin在服务端哪里配置
22. 服务端渲染SSR
23. csrf跨站攻击怎么解决

## react相关
1. React声明周期及自己的理解
2. 如何配置React-Router
3. 路由的动态加载模块
4. 介绍Redux数据流的流程
5. Redux如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理
6. 使用过的Redux中间件
7. 介绍redux，主要解决什么问题
8. 介绍react优化
9. React组件中怎么做事件代理
10. React组件事件代理的原理
11. React怎么做数据的检查和变化
12. redux请求中间件如何处理并发
13. react-router怎么实现路由切换
14. react-router里的标签和标签有什么区别
15. React层面的性能优化
16. Redux中异步的请求怎么处理
17. Redux中间件是什么东西，接受几个参数（两端的柯里化函数）
18. state是怎么注入到组件的，从reducer到组件经历了什么样的过程
19. 如何做RN在安卓和IOS端的适配
20. RN为什么能在原生中绘制成原生组件（bundle.js）
21. Redux在状态管理方面解决了React本身不能解决的问题
22. Redux有没有做过封装
23. react生命周期，常用的生命周期
24. 写react有哪些细节可以优化
25. React的事件机制（绑定一个事件到一个组件上）
26. React/Redux中哪些功能用到了哪些设计模式
27. React子父组件之间如何传值
28. 介绍下React高阶组件，和普通组件有什么区别
29. 一个对象数组，每个子对象包含一个id和name，React如何渲染出全部的name
30. 在哪个生命周期里写
31. 其中有几个name不存在，通过异步接口获取，如何做
32. 介绍Fiber
33. shouldComponentUpdate是为了解决什么问题
34. react中的key的作用
35. native提供了什么能力给RN
36. React中Dom结构发生变化后内部经历了哪些变化
37. React挂载的时候有3个组件，textComponent、composeComponent、domComponent，区别和关系，Dom结构发生变化时怎么区分data的变化，怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理
38. redux的设计思想
39. 接入redux的过程
40. react异步渲染的概念,介绍Time Slicing 和 Suspense
41. react性能优化
42. react生命周期
43. React使用过的一些组件
44. 介绍Immuable
45. 介绍下redux整个流程原理
46. React声明周期
47. Redux状态管理器和变量挂载到window中有什么区别
48. React数据流
49. 对React看法，有没有遇到一些坑
50. react设计思路
51. redux状态树的管理
52. react常见的通信方式
53. redux整体的工作流程
54. redux和全局对象之间的区别
55. Redux数据回溯设计思路
56. react性能优化
57. 介绍pureComponet
58. props和state的区别
59. 介绍react context
60. React15/16.x的区别
61. 重新渲染render会做些什么
62. 哪些方法会触发react重新渲染
63. state和props触发更新的生命周期分别有什么区别
64. setState是同步还是异步
65. 对无状态组件的理解
66. 介绍Redux工作流程
67. 对react看法，它的优缺点
68. 使用过程中遇到的问题，如何解决的
69. react的理念是什么（拿函数式编程来做页面渲染）
70. 介绍redux接入流程
71. rudux和全局管理有什么区别（数据可控、数据响应）
72. RN和原生通信
73. RN有没有做热加载
74. RN遇到的兼容性问题
75. RN如何实现一个原生的组件
76. RN混原生和原生混RN有什么不同
77. RN的原理，为什么可以同时在安卓和IOS端运行
78. RN如何调用原生的一些功能
79. 介绍RN的缺点
80. React中setState后发生了什么
81. setState为什么默认是异步
82. setState什么时候是同步的
83. React的生命周期
84. componentWillReceiveProps的触发条件是什么
85. React16.3对生命周期的改变
86. 介绍下React的Filber架构
87. 画Filber渲染树
88. 介绍React高阶组件
89. 父子组件之间如何通信
90. Redux怎么实现属性传递，介绍下原理
91. React-Router版本号
92. pureComponent和FunctionComponent区别





