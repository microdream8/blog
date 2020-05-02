---
title: '大厂面试题分类'
sidebar: auto
collapsable: true
---

# 大厂面试题分类

## html5和css3相关
1. html语义化的理解
2. CSS选择器有哪些
3. 盒子模型，以及标准情况和IE下的区别
4. 如何实现高度自适应
5. 动画的了解
6. 清除浮动
7. 定位问题（绝对定位、相对定位等）
8. transform动画和直接使用left、top改变位置有什么优缺点
9. div垂直水平居中（flex、绝对定位）
10. 其他css方式设置垂直居中
11. 居中为什么要使用transform（为什么不使用marginLeft/Top）
12. 两个元素块，一左一右，中间相距10像素
13. 介绍flex布局
14. rem、flex的区别（root em）
15. em和px的区别
16. 上下固定，中间滚动布局如何实现
17. 移动端适配1px的问题
18. 如何实现H5手机端的适配
19. 介绍position属性包括CSS3新增
20. 介绍css3中position:sticky

## js相关
<!-- ### js基础
1. == 和 ===的区别，什么情况下用相等==
2. let、const以及var的区别
3. 浅拷贝和深拷贝的区别
4. 介绍箭头函数的this
5. 介绍class和ES5的类以及区别
6. 介绍箭头函数和普通函数的区别
7. for..in 和 object.keys的区别：
8. 介绍闭包，使用场景，介绍闭包以及闭包为什么没清除
9. 如何判断一个变量是不是数组
10. 变量a和b，如何交换
11. 事件委托
12. 标签生成的Dom结构是一个类数组
13. 类数组和数组的区别
14. dom的类数组如何转成数组
15. [1, 2, 3, 4, 5]变成[1, 2, 3, a, b, 5]
16. 取数组的最大值（ES5、ES6）
17. some、every、find、filter、map、forEach有什么区别
18. 上述数组随机取数，每次返回的值都不一样
19. 如何找0-5的随机数，95-99呢
20. 页面上有一个input，还有一个p标签，改变input后p标签就跟着变化，如何处理
21. 监听input的哪个事件，在什么时候触发
22. 手写数组去重函数
23. 手写数组扁平化函数
24. 如何去除url中的#号
25. 使用canvas绘图时如何组织成通用组件
26. formData和原生的ajax有什么区别
27. 介绍下表单提交，和formData有什么关系
28. 虚拟DOM主要做了什么
29. 虚拟DOM本身是什么（JS对象）
30. 介绍DOM树对比
31. 为什么虚拟DOM比真实DOM性能好
32. 介绍JS数据类型，基本数据类型和引用数据类型的区别
33. 数据类型分别存在哪里
34. 栈和堆具体怎么存储
35. 栈和堆的区别
36. 垃圾回收时栈和堆的区别
37. var a  = {name: "前端开发"}; var b = a; a = null那么b输出什么
38. var a = {b: 1}存放在哪里
39. var a = {b: {c: 1}}存放在哪里
40. 随机值存在一样的情况，如何避免
41. 循环绑定时的index是多少，为什么，怎么解决
42. 两道手写算法题
43. ES6使用的语法
44. 介绍ES6的功能，ES6新的特性
45. ES5和ES6有什么区别
46. JS执行过程中分为哪些阶段
47. 介绍下数字签名的原理
48. 前后端通信使用什么方案
49. 前端和后端怎么联调
50. loadsh深拷贝实现原理
51. ES6中let块作用域是怎么实现的
52. 前端开发中用到哪些设计模式
53. 介绍暂时性死区
54. 如何实现异步加载
55. JS变量类型分为几种，区别是什么 -->

<!-- ### 面向对象相关
1. 怎么实现this对象的深拷贝
2. 介绍this各种情况
3. 介绍this和原型
4. 词法作用域和this的区别
5. bind、call、apply的区别
6. JS的原型
7. 介绍下原型链（解决的是继承问题吗）
8. JS的继承方法,JS继承方案,平常是怎么做继承
9. 使用原型最大的好处
10. 介绍原型链
11. prototype和——proto——区别
12. _construct是什么
13. ES6中的map和原生的对象有什么区别
14. 变量作用域链
15. 单例、工厂、观察者项目中实际场景
16. 两个对象如何比较
17. new是怎么实现的 -->

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

<!-- ### 存储相关
1. cookie的引用为了解决什么问题
2. cookie和localStorage的区别
3. cookie放哪里，cookie能做的事情和存在的价值
4. cookie和token都存放在header里面，为什么只劫持前者
5. cookie和session有哪些方面的区别
6. 如何设计一个localStorage，保证数据的实效性
7. localStorage和cookie有什么区别
8. 介绍localstorage的API -->

### 其它
1. 文件上传如何做断点续传
2. 搜索请求如何处理（防抖）
3. 搜索请求中文如何请求
4. 介绍事件代理以及优缺点
5. 防抖和节流的区别
6. get和post有什么区别
7. 介绍下事件代理，主要解决什么问题
8. 服务端怎么做统一的状态处理
9. 浏览器事件流向

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

## webpack打包优化相关
1. webpack介绍
2. webpack做了什么
3. webpack生命周期
4. webpack和gulp的优缺点
5. webpack打包的整个过程
6. import { Button } from 'antd'，打包的时候只打包button，分模块加载，是怎么做到的
7. 使用import时，webpack对node_modules里的依赖会做什么
8. webpack整个生命周期，loader和plugin有什么区别
9. 如何实现分模块打包（多入口）
10. webpack如何配sass，需要配哪些loader
11. 配css需要哪些loader
12. 一般怎么组织CSS（Webpack）
13. 常用的plugins
14. 使用过webpack里面哪些plugin和loader
15. 如何配置把js、css、html单独打包成一个文件
16. 使用webpack构建时有无做一些自定义操作
17. pm2怎么做进程管理，进程挂掉怎么处理
18. 不用pm2怎么做进程管理
19. webpack里面的插件是怎么实现的
20. dev-server是怎么跑起来
21. 打包时Hash码是怎么生成的

## 项目优化项目
1. 抽取公共文件是怎么配置的
2. 前端项目优化（1js css；2 图片；3 缓存预加载； 4 SSR； 5 多域名加载；6 负载均衡）
3. 前端性能优化（JS原生和React）
4. 用户体验做过什么优化
5. 网站SEO怎么处理
6. 如何做工程上的优化
7. 整个前端性能提升大致分几类
8. 遇到性能问题一般在哪个生命周期里解决
9. 怎么做性能优化（异步加载组件...）
10. 并发请求资源数上限（6个）
11. base64为什么能提升性能，缺点
12. 介绍webp这个图片文件格式

## 模式及排序相关
1. 介绍观察者模式
2. 介绍中介者模式
3. 观察者和订阅-发布的区别，各自用在哪里
4. 观察者模式里面使用的数据结构(不具备顺序 ，是一个list)
5. 介绍排序算法和快排原理
6. 介绍冒泡排序，选择排序，冒泡排序如何优化
7. 介绍快速排序
8. JS是什么范式语言(面向对象还是函数式编程)
9. 介绍下DFS深度优先
10. 介绍纯函数


## 其它未分类
1. 介绍垃圾回收
2. JS里垃圾回收机制是什么，常用的是哪种，怎么处理的
3. 添加原生事件不移除为什么会内存泄露
4. 还有哪些地方会内存泄露
5. 如何对相对路径引用进行优化
6. 介绍路由的history
7. 前端怎么控制管理路由
8. 使用路由时出现问题如何解决
9. 多个组件之间如何拆分各自的state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，如何思考这块
10. 项目中如何处理安全问题
11. 算法：前K个最大的元素
12. 柯里化函数两端的参数具体是什么东西
13. 介绍AST（Abstract Syntax Tree）抽象语法树
14. 安卓Activity之间数据是怎么传递的
15. 安卓4.0到6.0过程中WebView对js兼容性的变化
16. WebView和原生是如何通信
17. 中间件是怎么拿到store和action，然后怎么处理
18. key主要是解决哪一类的问题，为什么不建议用索引index（重绘）
19. 介绍defineProperty方法，什么时候需要用到
20. 介绍高阶组件
21. sum(2, 3)实现sum(2)(3)的效果
22. 遇到的复杂业务场景
23. 工作收获
24. 介绍css，xsrf
25. 介绍Function Component
26. 如何处理异常捕获
27. 项目如何管理模块
28. 如何判断是button
29. 页面上有1万个button如何绑定事件
30. 页面上生成一万个button，并且绑定事件，如何做（JS原生操作DOM）
31. 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少
32. 对应的生命周期做什么事
33. 小程序里面开页面最多多少
34. Emit事件怎么发，需要引入什么
35. 如何解决props层级过深的问题
36. 前端怎么做单元测试
37. 介绍JSX
38. 为什么3大框架出现以后就出现很多native（RN）框架（虚拟DOM）
39. 介绍MVP怎么组织
40. npm2和npm3+有什么区别
41. 对PWA有什么了解
42. 对安全有什么了解
43. RESTful常用的Method
44. 绑定connect的过程
45. connect原理
46. 16.X声明周期的改变
47. 16.X中props改变后在哪个生命周期中处理










