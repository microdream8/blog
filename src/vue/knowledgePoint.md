---
title: '框架相关知识点'
sidebar: auto
collapsable: true
---

# 框架相关知识点

## MVVM
### 什么是MVVM
MVVM 是 Model-View-ViewModel 的缩写。mvvm 是一种设计思想。Model 层代表数据模型，也可以在 Model 中定义<b>数据修改和操作的业务逻辑</b>；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。

在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。
ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

### mvvm 和 mvc 区别
mvc 和 mvvm 其实区别并不大。都是一种设计思想。主要就是 mvc 中 Controller 演变成 mvvm 中的 viewModel。mvvm 主要解决了 mvc 中大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。和当 Model 频繁发生变化，开发者需要主动更新到 View 。

## vue原理相关
### vue 的优点
* 低耦合。视图（View）可以独立于 Model 变化和修改，一个 ViewModel 可以绑定到不同的"View"上，当 View 变化的时候 Model 可以不变，当 Model 变化的时候 View 也可以不变。
* 可重用性。你可以把一些视图逻辑放在一个 ViewModel 里面，让很多 view 重用这段视图逻辑。
* 独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计，使用 Expression Blend 可以很容易设计界面并生成 xml 代码。
* 可测试。界面素来是比较难于测试的，而现在测试可以针对 ViewModel 来写。

### vue的生命周期

beforeCreate是new Vue()之后触发的第一个钩子，在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问。

created在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数。可以做一些初始数据的获取，在当前阶段无法与Dom进行交互，如果非要想，可以通过vm.$nextTick来访问Dom。

beforeMount发生在挂载之前，在这之前template模板已导入渲染函数编译。而当前阶段虚拟Dom已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发updated。

mounted在挂载完成后发生，在当前阶段，真实的Dom挂载完毕，数据完成双向绑定，可以访问到Dom节点，使用$refs属性对Dom进行操作。

beforeUpdate发生在更新之前，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。

updated发生在更新完成之后，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

beforeDestroy发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。

destroyed发生在实例销毁之后，这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。


### vue的性能优化
#### 编码阶段
* 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
* v-if和v-for不能连用
* 如果需要使用v-for给每项元素绑定事件时使用事件代理
* SPA 页面采用keep-alive缓存组件
* 在更多的情况下，使用v-if替代v-show
* key保证唯一
* 使用路由懒加载、异步组件
* 防抖、节流
* 第三方模块按需导入
* 长列表滚动到可视区域动态加载
* 图片懒加载
#### SEO优化
* 预渲染
* 服务端渲染SSR
#### 打包优化
* 压缩代码
* Tree Shaking/Scope Hoisting
* 使用cdn加载第三方模块
* 多线程打包happypack
* splitChunks抽离公共文件
* sourceMap优化
#### 用户体验
* 骨架屏
* PWA


### vue2.x中如何监听数组变化
受现代 JavaScript 的限制 ，Vue 无法检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。但是 Vue 提供了 Vue.set (object, propertyName, value) / vm.$set (object, propertyName, value)  来实现为对象添加响应式属性，那框架本身是如何实现的呢？

我们查看对应的 Vue 源码：vue/src/core/instance/index.js

```js
export function set (target: Array<any> | Object, key: any, val: any): any {
  // target 为数组  
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
    target.length = Math.max(target.length, key)
    // 利用数组的splice变异方法触发响应式  
    target.splice(key, 1, val)
    return val
  }
  // key 已经存在，直接修改属性值  
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 对属性进行响应式处理
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```
我们阅读以上源码可知，vm.$set 的实现原理是：

如果目标是数组，直接使用数组的 splice 方法触发相应式；

如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用   defineReactive 方法进行响应式处理（ defineReactive 方法就是  Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）

```js
// Vue.set(item[0], 'description', finalStr);  // （arr/obj, name, newvalue) 数组或对象可以具体到某一项

// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

### computed 和 watch的区别和运用场景

<b>computed：</b> 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；

<b>watch：</b> 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

<b>运用场景：</b>

* 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
* 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

```js
exercise: {
  handler(newV, oldV) {
    
  },
  immediate: true,
  deep: true,
},
'exercise.exerciseMeta.exerciseId': {
  handler(newV, oldV) {
    
  },
  immediate: true,
  deep: true,
}
```

### computed 的实现原理

computed 本质是一个惰性求值的观察者。

computed 内部实现了一个惰性的 watcher,也就是 computed watcher,computed watcher 不会立刻求值,同时持有一个 dep 实例。

其内部通过 this.dirty 属性标记计算属性是否需要重新求值。

当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher,

computed watcher 通过 this.dep.subs.length 判断有没有订阅者,

有的话,会重新计算,然后对比新旧值,如果变化了,会重新渲染。 (Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。)

没有的话,仅仅把 this.dirty = true。 (当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)


###  组件中 data 为什么是一个函数
因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

### v-model的原理
我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

* text 和 textarea 元素使用 value 属性和 input 事件；
* checkbox 和 radio 使用 checked 属性和 change 事件；
* select 字段将 value 作为 prop 并将 change 作为事件。

### vue双向数据绑定的原理

vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤：
1. 需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
2. compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:1、在自身实例化时往属性订阅器(dep)里面添加自己2、自身必须有一个update()方法3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
4. MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

### Proxy与Object.defineProperty的优劣对比

Proxy的优势如下:

* Proxy可以直接监听对象而非属性
* Proxy可以直接监听数组的变化
* Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的
* Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改
* Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

Object.defineProperty的优势如下:

* 兼容性好,支持IE9


### vue中的key到底有什么用

key是为Vue中的vnode标记的唯一id,通过这个key,我们的diff操作可以更准确、更快速

diff算法的过程中,先会进行新旧节点的首尾交叉对比,当无法匹配的时候会用新节点的key与旧节点进行比对,然后超出差异.

diff程可以概括为：oldCh和newCh各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，变量会往中间靠，一旦StartIdx>EndIdx表明oldCh和newCh至少有一个已经遍历完了，就会结束比较,这四种比较方式就是首、尾、旧尾新头、旧头新尾.

* 准确: 如果不加key,那么vue会选择复用节点(Vue的就地更新策略),导致之前节点的状态被保留下来,会产生一系列的bug.
* 快速: key的唯一性可以被Map数据结构充分利用,相比于遍历查找的时间复杂度O(n),Map的时间复杂度仅仅为O(1).

### Vue从初始化页面->修改数据->刷新页面UI过程

当Vue进入初始化阶段时，一方面<b>Vue会遍历data中的属性</b>，并用Object.defineProperty将它转化成getter/setterd的形式，实现数据劫持；另一方面，<b>Vue的指令编译器Compiler</b>对元素节点的各个指令进行解析，初始化视图，并订阅Watcher来更新视图，此时Watcher会将自己<b>添加到消息订阅器Dep中</b>，此时初始化完毕。
当数据发生变化时，触发Observer中setter方法，<b>立即调用Dep.notify()</b>，Dep这个数组开始遍历所有的订阅者，并<b>调用其update方法</b>，Vue内部再通过diff算法，patch相应的更新完成对订阅者视图的改变。

### 组件中写name选项有什么作用
1. 项目使用keep-alive时，可搭配组件的name进行缓存过滤。
2. DOM做递归组件时需要调用自身name
3. vue-devtools调试工具里显示的组件名称是由vue中组件name决定的

### Vue3.0的了解
大致有三个点，第一个是关于提出的新API setup()函数，第二个说了对于Typescript的支持，最后说了关于替换Object.defineProperty为 Proxy 的支持。详细说了下关于Proxy代替带来的性能上的提升，因为传统的原型链拦截的方法，无法检测对象及数组的一些更新操作，但使用Proxy又带来了浏览器兼容问题。

### vue-cli 替我们做了那些工作
vue-cli是基于 Vue.js 进行快速开发的完整系统，也可以理解成是很多 npm 包的集合。

vue-cli完成的功能：

* .vue 文件 --> .js 文件
* ES6 语法 --> ES5 语法
* Sass,Less,Stylus --> CSS
* 对 jpg,png,font 等静态资源的处理
* 热更新
* 定义环境变量，区分 dev 和 production 模式

### mixin
Mixins 使我们能够为 Vue 组件编写可插拔和可重用的功能。如果你希望在多个组件之间重用一组组件选项，例如生命周期 hook、方法等，则可以将其编写为 mixin，并在组件中简单地引用它。然后将 mixin 的内容合并到组件中。如果你要在 mixin 中定义生命周期 hook，那么它在执行时将优先于组件自己的 hook 。

- [详细浏览 ] (https://juejin.im/post/5e1eb1dff265da3e354ea2d0)

## 路由相关

### 路由懒加载
Vue项目总实现路由按需加载（懒加载）的三种方式：

1. vue异步组件
2. es6提案的import()
3. webpack的require.ensure()

```js
// 一、Vue异步组件技术：
	{
		path: '/home',
		name: 'Home',
		component: resolve => reqire(['path路径'], resolve)
	}
// 二、es6提案的import()
	const Home = () => import('path路径')
// 三、webpack提供的require.ensure()
	{
		path: '/home',
		name: 'Home',
		component: r => require.ensure([],() =>  r(require('path路径')), 'demo')
	}
```

### 有哪几种导航钩子

1. 全局导航钩子：一般用来判断权限，以及页面丢失时需要执行的操作；
beforeEach（）每次路由进入之前执行的函数。

afterEach（）每次路由进入之后执行的函数。

beforeResolve（）2.5新增


2. 单个路由（实例钩子）：某个指定路由跳转时需要执行的逻辑。
beforeEnter（）

beforeLeave（）


3. 组件路由钩子：
beforeRouteEnter（）

beforeRouteLeave（）

beforeRouteUpdate（）

### route 和 router

* route是“路由信息对象”，包括path,params,hash,query,fullPath,matched,name等路由信息参数。
* router是“路由实例对象”，包括了路由的跳转方法(push、go)，钩子函数等。


### 编程式导航

```html
// 声明式
<router-link :to="...">
```
```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```



### vue路由有几种模式
1. hash模式
即地址栏URL中的#符号，它的特点在于：hash 虽然出现URL中，但不会被包含在HTTP请求中，对后端完全没有影响，不需要后台进行配置，因此改变hash不会重新加载页面。

2. history模式
利用了HTML5 History Interface 中新增的pushState() 和replaceState() 方法（需要特定浏览器支持）。history模式改变了路由地址，因为需要后台配置地址。


## axios相关
### 特点
1. axios是一个基于promise的HTTP库，支持promise的所有API；
2. 它可以拦截,请求和响应； 
3. 它可以转换请求数据和响应数据，并对响应回来的内容自动转换为json类型的数据；
4. 它安全性更高，客户端支持防御XSRF；

### axios相应拦截配置

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```


## vuex相关
### vuex 是什么？怎么使用？哪种功能场景使用它
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

（1）Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
（2）改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。
主要包括以下几个模块：

* State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
* Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
* Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
* Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
* Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

### Vuex的双向绑定
Vuex的双向绑定通过调用 new Vue实现，然后通过 Vue.mixin 注入到Vue组件的生命周期中，再通过劫持state.get将数据放入组件中

### 为什么要用vuex

1. 传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
2. 我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

store.commit('increment')
console.log(store.state.count) // -> 1
```

### vue-loader
vue-loader是webpack的加载器模块，它是我们可以用.vue文件格式编写单文件组建。单文件组建有三部分，即模板、脚本和样式。vue-loader模块允许webpack使用单独的加载器模块（例如SASS或SCSS加载器）提取和处理每个部分。该设置使我们可以使用.vue文件无缝编写程序。

vue-loaer模块还允许把静态资源视为模块依赖性，并允许使用webpack加载器进行处理。而且还允许在开发过程中进行热重装。

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

### 虚拟DOM的优劣如何
#### 优点
* 保证性能下限: 虚拟DOM可以经过diff找出最小差异,然后批量进行patch,这种操作虽然比不上手动优化,但是比起粗暴的DOM操作性能要好很多,因此虚拟DOM可以保证性能下限
* 无需手动操作DOM: 虚拟DOM的diff和patch都是在一次更新中自动进行的,我们无需手动操作DOM,极大提高开发效率
* 跨平台: 虚拟DOM本质上是JavaScript对象,而DOM与平台强相关,相比之下虚拟DOM可以进行更方便地跨平台操作,例如服务器渲染、移动端开发等等

#### 缺点
* 无法进行极致优化: 在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化,比如VScode采用直接手动操作DOM的方式进行极端的性能优化

- [详细参考](https://www.jianshu.com/p/5a5d3195b70c)

## vue中使用v-for时为什么不能用index作为key
结论：<br/>
更新DOM的时候会出现性能问题<br/>
会发生一些状态bug<br/>
React 中的 key 也是如此<br/><br/>
<b>为什么要用key？</b><br/>
Vue 和 React 都实现了一套虚拟DOM，使我们可以不直接操作DOM元素，只操作数据便可以重新渲染页面。而隐藏在背后的原理便是其高效的Diff算法。<br/>
Vue 和 React 的虚拟DOM的Diff算法大致相同，其核心是基于两个简单的假设：<br/>
1. 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构。<br/>
2. 同一层级的一组节点，他们可以通过唯一的id进行区分。<br/>
基于以上这两点假设，使得虚拟DOM的Diff算法的复杂度从O(n^3)降到了O(n)。<br/><br/>

当页面的数据发生变化时，Diff算法只会比较同一层级的节点：<br/>
如果节点类型不同，直接干掉前面的节点，再创建并插入新的节点。<br/>
如果节点类型相同，则会重新设置该节点的属性，从而实现节点的更新。<br/>
总而言之，key的作用主要是为了高效的更新虚拟DOM 。另外vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。<br/>

- [参考来源 ] (https://blog.csdn.net/aihuanhuan110/article/details/98223011)


## 单页应用与多页应用
单页应用：一个项目中只有一个完整的html页面，其他的都是部分的html片段组成。页面跳转只是局部刷新，不会重新加载全部资源。片段之间的切换快，比较容易实现转场动画。<br/>
<img src="../imgs/js/yuanxinglian.jpeg" style="width: 80%;" /><br/>

## 前端路由hash、history原理及简单的实践下
路由是根据不同的url地址来显示不同的页面或内容的功能，这个概念很早是由后端提出的。<br/>
那么既然有后端路由，那为什么还需要我们前端路由呢？后端路由有一个很大的缺点就是每次路由切换的时候都需要去刷新页面，然后发出ajax请求，然后将请求数据返回回来，那么这样每次路由切换都要刷新页面对于用户体验来说就不好了。因此为了提升用户体验，我们前端路由就这样产生了。它就可以解决浏览器不会重新刷新了。<br/>
### hash模式
hash路由模式是这样的：http://xxx.abc.com/#/xx。 有带#号，后面就是hash值的变化。改变后面的hash值，它不会向服务器发出请求，因此也就不会刷新页面。并且每次hash值发生改变的时候，会触发hashchange事件。因此我们可以通过监听该事件，来知道hash值发生了哪些变化。比如我们可以如下简单的监听：<br/>
```js
function hashAndUpdate () {
   // todo 匹配 hash 做 dom 更新操作
}

window.addEventListener('hashchange', hashAndUpdate);
```
### history模式
HTML5的History API为浏览器的全局history对象增加了该扩展方法。它是一个浏览器的一个接口，在window对象中提供了onpopstate事件来监听历史栈的改变，只要历史栈有信息发生改变的话，就会触发该事件。提供了如下事件：<br/>
```js
window.addEventListener('popstate', function(e) {
  console.log(e)
});
```
参考来源：https://www.cnblogs.com/tugenhua0707/p/10859214.html<br/>

## 多个组件之间如何拆分各自的state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，如何思考这块
状态提升，找到容器组件和展示组件，保证唯一数据源和单向数据<br/>
对于组件的拆分还要做到高内聚低耦合<br/>



