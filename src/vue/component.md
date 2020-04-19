---
title: '组件化总结'
sidebar: auto
collapsable: true
---

# 组件化总结
vue.js 有两大法宝，一个是数据驱动，另一个就是组件化，那么问题来了，什么叫做组件化，为什么要组件化？接下来我就针对这两个问题一一解答，所谓组件化，就是把页面拆分成多个组件，每个组件依赖的 CSS、JS、模板、图片等资源放在一起开发和维护。 因为组件是资源独立的，所以组件在系统内部可复用，组件和组件之间可以嵌套，如果项目比较复杂，可以极大简化代码量，并且对后期的需求变更和维护也更加友好。

## 组件的分类
一般来说，组件大致可以分为三类：

1. 页面级别的组件。
2. 业务上可复用的基础组件。
3. 与业务无关的独立组件。

### 页面级别的组件
页面级别的组件，通常是pages目录下的.vue组件，是组成整个项目的一个大的页面。一般不会有对外的接口。我们通常开发时，主要就是编写这种组件。如下所示：pages下面的Home.vue(主页)和About.vue(关于我们)等都是一个独立的页面，也是一个独立的组件。
```js
  pages
  ├─ About.vue
  └─ Home.vue
```

### 业务上可复用的基础组件
这一类组件通常是在业务中被各个页面复用的组件，这一类组件通常都写到components目录下，然后通过import在各个页面中使用。这一类组件通常是实现某个功能，比如外卖中各个页面都会使用到的评分系统。这个部分就可以实现评分功能，可以写成一个独立的业务组件。比如下面的components中的Star.vue就是一个业务组件。这一类组件的编写通常涉及到组件常用的props,slot和自定义事件等。
```js
  components
  └─ Star.vue
```

### 与业务无关的独立组件
这一类组件通常是与业务功能无关的独立组件。这类组件通常是作为基础组件，在各个业务组件或者页面组件中被使用。目前市面上比较流行的ElementUI和iview等中包含的组件都是独立组件。如果是自己定义的独立组件，比如富文本编辑器等，通常写在utils目录中。

## 如何进行组件化开发
用自定义组件之前必须注册。 Vue.js 提供了 2 种组件的注册方式，全局注册和局部注册。

1. 全局组成
在 vue.js 中我们可以使用 Vue.component(tagName, options) 进行全局注册，例如
```js
Vue.component('my-component', {
  // 选项
})
```

2. 局部注册
Vue.js 也同样支持局部注册，我们可以在一个组件内部使用 components 选项做组件的局部注册，例如：
```js
import HelloWorld from './components/HelloWorld'

export default {
  components: {
    HelloWorld
  }
}
```
区别：全局组件是挂载在 Vue.options.components 下，而局部组件是挂载在 vm.$options.components 下，这也是全局注册的组件能被任意使用的原因。

## 组件化开发必备知识
所谓工欲善其事，必先利其器，在正式开发一个组件之前，我们先要掌握一些必备的知识，这里我只会简单介绍一下，详情参考官网。

### name
组件的名称，必填
```js
<lx-niu/>
<lx-niu></lx-niu/>

name: 'lxNiu'
```

js 中使用驼峰式命令，HTML 使用kebab-case命名。

### props
组件属性，用于父子组件通信，可通过this.msg访问
```js
<div>{{msg}}</div>

props: {
  msg: {
    type: String,
    default: ''
  }
}

show: Boolean // 默认false

msg: [String, Boolean]  // 多种类型
```

### computed
处理data或者props中的属性，并返回一个新属性
```js
<div>{{newMsg}}</div>

computed: {
  newMsg() {
    return 'hello ' + this.msg
  }
},
```
注：因为props，data和computed在编译阶段都会作为vm的属性合并，所以不可重名

### render
用render函数描述template
```js
<lx-niu tag='button'>hello world</lx-niu>

<script type="text/javascript">
  export default {
    name: 'lxNiu',
    props: {
      tag: {
        type: String,
        default: 'div'
      },
    },
    // h: createElement
    render(h) {
      return h(this.tag,
        {class: 'demo'}, 
        this.$slots.default)
    }
  }
</script>
```
render 中的 h 其实就是 createElement，它接受三个参数，返回一个 vnode  
h 参数解释：  
args1: {string | Function | Object} 用于提供DOM的html内容  
args2: {Object} 设置DOM样式、属性、绑定事件之类  
args3: {array} 用于设置分发的内容

注：vue编译顺序： template–> compile --> render --> vnode --> patch --> DOM

### slot
分发内容，有传入时显示，无传入 DOM 时显示默认，分为无名和具名两种，this.slots.default默认指向无名插槽，多个slot时用法this.slots.default 默认指向无名插槽，多个 slot 时用法 this.slots.default默认指向无名插槽，多个slot时用法this.slots.name
```js
<lx-niu>
  <div slot='header'>header</div>
  <div class="body" slot='body'>
    <input type="text">
  </div>
  <div slot='footer'>footer</div>

  <button class='btn'>button</button>
</lx-niu>

<template>
  <div>
    <slot name='header'></slot>
    <slot name='body'></slot>
    <slot name='footer'></slot>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'lxNiu',
    mounted() {
      this.$slots.header // 包含了slot="foo"的内容
      this.$slots.default // 得到一个vnode，没有被包含在具名插槽中的节点，这里是button
    }
  }
</script>
```

### class
定义子组件的类名
```html
// 父组件
<lx-niu round type='big'/>

// 子组件
<div :class="[
  type ? 'lx-niu__' + type : '',
  {'is-round': round},
]">控制</div>

//真实DOM
<div class='lx-niu__big is-round'>hello</div>
```

### style
向子组件传递样式
```html
// 父组件
<lx-niu :bodyStyle='{color: "red"}'/>


// 子组件
<template>
  <div :style='bodyStyle'>hello world</div>
</template>

<script>
  export default {
    name: 'lxNiu',
    props: {
      bodyStyle: {},
    },
  }
</script>
```

### $attrs
v-bind="$attrs" 将除class和style外的属性添加到父组件上，如定义input：
```html
<input v-bind="$attrs">
```

### v-once
组件只渲染一次，后面即使数据发生变化也不会重新渲染，比如例子中val不会变成456
```html
<template>
  <div>
    <button @click="show = !show">button</button>
    <button @click="val = '456'">button</button>
    <div v-once v-if="show">
      <span>{{val}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      show: false,
      val: '123'
    }
  },
};
</script>
```

### mixins
```html
// mixin.js
export default {
  data() {
    return{
       msg: 'hello world'
    }
  },
  methods: {
    clickBtn() {
      console.log(this.msg)
    }
  },
}

// index.vue
<button @click="clickBtn">button</button>

import actionMixin from "./mixin.js";
export default {
  methods: {},
  mixins: [actionMixin]
}
```

## 实例演示
比如我们要注册一个 lx-button 这样一个组件

index.vue
```html
<template>
  <button>lxButton</button>
</template>

<script>
export default {
  name: 'lxButton'
}
</script>
```

index.js
```js
import lxButton from './src/index'

lxButton.install = (Vue) => {
  Vue.component(lxButton.name, lxButton)
}

export default lxButton
```

其中 install 是 Vue.js 提供了一个公开方法，这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。

MyPlugin.install = function (Vue, options){}

## watch-弹窗实现原理
```html
<button @click="dialogVisible = true">显示</button>
<lx-niu :visible.sync="dialogVisible"></lx-niu>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      }
    },
    watch: {
      dialogVisible(val) {
        console.log('father change', val)
      }
    }
  }
</script>
```

定义组件
```html
<template>
  <div v-show="visible">
    <button @click="hide">关闭</button>
  </div>
</template>

<script>
  export default {
    name: 'lxNiu',
    props: {
      visible: Boolean
    },
    watch: {
      visible(val) {
        console.log('child change:', val)
      }
    },
    methods: {
      hide() {
        this.$emit('update:visible', false);
      }
    },
  }
</script>
```

点击父组件中的显示按钮，改变传入子组件中的值，点击子组件中的关闭，改变父组件中值。

注：@click=“dialogVisible = true” 点击时将dialogVisible的值改为true  
注：:visible.sync: 双向数据绑定，配合update:visible使用，实现子组件修改父组件中的值







