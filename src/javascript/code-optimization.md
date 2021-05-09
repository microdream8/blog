<!--
 * @Author: gexiaolei
 * @Date: 2020-07-25 15:32:17
 * @LastEditTime: 2020-07-29 13:51:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
--> 
---
title: '代码小优化'
sidebar: auto
collapsable: true
---
# 代码小优化

## js相关优化

### 多条件或型判断
```js
function verifyIdentity(identityId) {
  if (identityId == 1 || identityId == 2 || identityId == 3 || identityId == 4) {
    return '你的身份合法，请通行！'
  } else {
    return '你的身份不合法'
  }
}
// 改为
function verifyIdentity(identityId) {
  if ([1, 2, 3, 4].includes(identityId)) {
    return '你的身份合法，请通行！'
  } else {
    return '你的身份不合法'
  }
}
```

### for 循环
在 JavaScript 中，我们可以使用 for()， while()， for(in)，for(of)几种循环，事实上，这三种循环中 for(in) 的效率极差，因为他需要查询散列键，所以应该尽量少用。
for 循环是最传统的语句，它以变量 i 作为索引，以跟踪访问的位置，对数组进行操作。
```js
var arr = ['a', 'b', 'c']
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]) //结果依次a,b,c
}
```

以上的方法有一个问题：就是当数组的长度到达百万级时，arr.length 就要计算一百万次，这是相当耗性能的。所以可以采用以下方法就行改良。

```js
var arr = ['a', 'b', 'c']
for (var i = 0, length = arr.length; i < length; i++) {
  console.log(arr[i]) //结果依次a,b,c
}
```

此时 arr.length 只需要计算一次，优化了性能。

for-in 一般用来来遍历对象的属性的，不过属性需要 enumerable（可枚举）才能被读取到。同时 for-in 也可以遍历数组，遍历数组的时候遍历的是数组的下标值。
```js
var obj = { 0: 'a', 1: 'b', 2: 'c' }
for (var key in obj) {
  console.log(key) //结果为依次为0，1，2
}

var arr = ['a', 'b', 'c']
for (var key in a) {
  console.log(key) //结果为依次为0，1，2
}
```
for-of 语句看着有点像 for-in 语句，但是和 for-of 语句不同的是它不可以循环对象，只能循环数组。
```js
var arr = ['a', 'b', 'c']
for (var value of arr) {
  console.log(value) // 结果依次为a,b,c
}
```
for-of 比 for-in 循环遍历数组更好。for-of 只要具有 Iterator 接口的数据结构，都可以使用它迭代成员。它直接读取的是键值。for-in 需要穷举对象的所有属性，包括自定义的添加的属性也能遍历到。且 for-in 的 key 是 String 类型，有转换过程，开销比较大。
所以在开发过程中循环数组尽量避免使用 for-in。

## vue相关
### 优雅更新props

如果你只是想单纯的更新 prop，没有其他的操作。那么 sync 修饰符能够让这一切都变得特别简单。

parent.vue:
```html
<child :title.sync="title"></child>
```

child.vue:
```js
export defalut {
  props: {
    title: String  
  },
  methods: {
    changeTitle(){
        this.$emit('update:title', 'hello')
    }
  }
}
```

只需要在绑定属性上添加 .sync，在子组件内部就可以触发 update:属性名 来更新 prop。可以看到这种手段确实简洁且优雅，这让父组件的代码中减少一个“没必要的函数”。

### 过滤器复用
过滤器被用于一些常见的文本格式化，被添加在表达式的尾部，由“管道”符号指示。
```html
<div>{{ text | capitalize }}</div>
```

```js
export default {
  data() {
    return {
      text: 'hello'
    }  
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
```

试想一个场景，不仅模板内用到这个函数，在 method 里也需要同样功能的函数。但过滤器无法通过 this 直接引用，难道要在 methods 再定义一个同样的函数吗？

要知道，选项配置都会被存储在实例的 $options 中，所以只需要获取 this.$options.filters 就可以拿到实例中的过滤器。

```js
export default {
  methods: {
    getDetail() {
      this.$api.getDetail({
        id: this.id
      }).then(res => {
        let capitalize = this.$options.filters.capitalize
        this.title = capitalize(res.data.title)
      })
    }
  }
}
```

除了能获取到实例的过滤器外，还能获取到全局的过滤器，因为 this.$options.filters 会顺着 __proto__ 向上查找，全局过滤器就存在原型中。

### watch高阶使用
#### 立即执行
watch 是在监听属性改变时才会触发，有些时候，我们希望在组件创建后 watch 能够立即执行

可能想到的的方法就是在 create 生命周期中调用一次，但这样的写法不优雅，或许我们可以使用这样的方法

```js
export default {
  data() {
    return {
      name: 'Joe'
    }
  },
  watch: {
    name: {
      handler: 'sayName',
      immediate: true
    }
  },
  methods: {
    sayName() {
      console.log(this.name)
    }
  }
}
```

#### 深度监听
在监听对象时，对象内部的属性被改变时无法触发 watch ，我们可以为其设置深度监听

```js
export default {
  data: {
    studen: {
      name: 'Joe',
      skill: {
        run: {
          speed: 'fast'
        }
      }
    }
  },
  watch: {
    studen: {
      handler: 'sayName',
      deep: true
    }
  },
  methods: {
    sayName() {
      console.log(this.studen)
    }
  }
}
```

### 事件参数$event
$event 是事件对象的特殊变量，在一些场景能给我们实现复杂功能提供更多可用的参数

#### 原生事件
在原生事件中表现和默认的事件对象相同
```html
<template>
  <div>
    <input type="text" @input="inputHandler('hello', $event)" />
  </div>
</template>
```

```js
export default {
  methods: {
    inputHandler(msg, e) {
      console.log(e.target.value)
    }
  }
}
```

#### 自定义事件
在自定义事件中表现为捕获从子组件抛出的值

my-item.vue:
```js
export default {
  methods: {
    customEvent() {
      this.$emit('custom-event', 'some value')
    }
  }
}
```

App.vue
```html
<template>
  <div>
    <my-item v-for="(item, index) in list" @custom-event="customEvent(index, $event)">
      </my-list>
  </div>
</template>
```

```js
export default {
    methods: {
        customEvent(index, e) {
            console.log(e) // 'some value'
        }
    }
}
```

### 自定义组件双向绑定
组件 model 选项:

允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。

input 默认作为双向绑定的更新事件，通过 $emit 可以更新绑定的值

```html
<my-switch v-model="val"></my-switch>
```

```js
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switchChange(val) {
      this.$emit('input', val)
    }
  }
}
```

修改组件的 model 选项，自定义绑定的变量和事件
```html
<my-switch v-model="num" value="some value"></my-switch>
```

```js
export default {
  model: {
    prop: 'num',
    event: 'update'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    }
  },
  methods: {
    numChange() {
      this.$emit('update', this.num++)
    }
  }
}
```

### hook 二次封装
处理组件内定时器的步骤。通常我们一般都是这样操作的：
```js
<script>
  export default {
    mounted() {
      this.timer = setInterval(() => { ... }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  };
</script>
```

但是其实更好的做法是：
```js
<script>
  export default {
    mounted() {
      const timer = setInterval(() => { ... }, 1000);
      this.$once('hook:beforeDestroy', () => clearInterval(timer);)
    }
  };
</script>
```

设想一个场景

如果我们需要在数据渲染到页面的之前让页面 loading。mounted 之后停止 loading。beforeUpdata 时开始 loading。updatad 之后停止 loading。
最简单的方法就是改写组件的生命周期函数，使其在 mounted/beforeUpdata /updatad 时通知父组件显示或者隐藏 loading。
这样做显示不好，因为侵入了自组件的逻辑，增加的逻辑也和组件本身的功能好不关联。最好的办法就是使用 v-on="hook:xxx" 的方式：
```html
<v-chart
    @hook:mounted="loading = false"
    @hook:beforeUpdated="loading = true"
    @hook:updated="loading = false"
    :data="data"
/>
```

这样，就实现了对子组件生命周期的监听。对任意的组件都有效果，包括引入的第三方组件。


### 利用 object.freeze 提升性能
Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。
freeze() 返回和传入的参数相同的对象。

比方我们需要渲染一个非常大的数组对象，例如用户列表，对象列表，文章列表等等。
```js
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = users;
  }
};
```

vue 会将 data 对象中的所有的属性加入到 vue 的响应式系统中，当这些属性的值发生改变时，视图将会产生 响应，若对象的体积比较大，会消耗很多浏览器解析时间。

所以我们可以通过减少数据的响应式转换来提供前端的性能。

```js
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  }
};
```

### vue中的$props、$attrs和$listeners(可用来二次封装组件)
$props：当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象属性的访问。

假如有个input输入框。我们有很多的原生属性，比如：name、placeholder、disabled等等。我们如果都定义在props显示接收，未免太过繁琐。所以官网出现了：v-bind="$props"这样的操作。
如果父组件传递很多的原生属性，那么我们在子组件中直接可以：

```html
<!-- good -->
<input v-bind="$props">
 
<!-- bad -->
<!-- 而不是下面这样，如果很多的属性就特别繁琐 -->
<input :name="name" :placeholder="placeholder" :disabled="disabled">
```

我们可以利用以下方式$attrs 将原生属性直接传递给子组件,这是Vue在2.4.0新增的属性,包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

```html
<input
   v-bind="$attrs"
   :value="value"
   @focus=$emit('focus', $event)"
   @input="$emit('input', $event.target.value)"
>
```

$listeners：包含了父作用域中的 (不含 .native修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

如果子组件不在父组件的根目录下，则可以将所有事件侦听器从父组件传递到子组件，如下所示：

```html
<template>
<div>
  ...
<childComponent v-on="$listeners" />...
</div>
</template>
```
