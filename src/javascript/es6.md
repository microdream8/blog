---
title: 'ES6备忘录'
sidebar: auto
collapsable: true
---
# ES6备忘录

## class类

传统的javascript中只有对象，没有类的概念。它是基于原型的面向对象语言。原型对象特点就是将自身的属性共享给新对象。这样的写法相对于其它传统面向对象语言来讲，很有一种独树一帜的感脚！非常容易让人困惑！<br/>
如果要生成一个对象实例，需要先定义一个构造函数，然后通过new操作符来完成。构造函数示例：<br/>
```js
//函数名和实例化构造名相同且大写（非强制，但这么写有助于区分构造函数和普通函数）
function Person(name,age) {
    this.name = name;
    this.age=age;
}
Person.prototype.say = function(){
    return "我的名字叫" + this.name+"今年"+this.age+"岁了";
}
var obj=new Person("laotie",88);//通过构造函数创建对象，必须使用new 运算符
console.log(obj.say());//我的名字叫laotie今年88岁了
```
构造函数生成实例的执行过程：<br/>

```js
1.当使用了构造函数，并且new 构造函数(),后台会隐式执行new Object()创建对象;
2.将构造函数的作用域给新对象，（即new Object()创建出的对象），而函数体内的this就代表new Object()出来的对象。
3.执行构造函数的代码。
4.返回新对象（后台直接返回）;
```
ES6引入了Class（类）这个概念，通过class关键字可以定义类。该关键字的出现使得其在对象写法上更加清晰，更像是一种面向对象的语言。如果将之前的代码改为ES6的写法就会是这个样子：<br/>

```js
class Person{//定义了一个名字为Person的类
    constructor(name,age){//constructor是一个构造方法，用来接收参数
        this.name = name;//this代表的是实例对象
        this.age=age;
    }
    say(){//这是一个类的方法，注意千万不要加上function
        return "我的名字叫" + this.name+"今年"+this.age+"岁了";
    }
}
var obj=new Person("laotie",88);
console.log(obj.say());//我的名字叫laotie今年88岁了
```

::: warning 注意
1. 在类中声明方法的时候，千万不要给该方法加上function关键字
2. 方法之间不要用逗号分隔，否则会报错
:::

由下面代码可以看出类实质上就是一个函数。类自身指向的就是构造函数。所以可以认为ES6中的类其实就是构造函数的另外一种写法！<br/>

```js
console.log(typeof Person);//function
console.log(Person===Person.prototype.constructor);//true
```
以下代码说明构造函数的prototype属性，在ES6的类中依然存在着。
console.log(Person.prototype);//输出的结果是一个对象
实际上类的所有方法都定义在类的prototype属性上。代码证明下：<br/>
```js
Person.prototype.say=function(){//定义与类中相同名字的方法。成功实现了覆盖！
    return "我是来证明的，你叫" + this.name+"今年"+this.age+"岁了";
}
var obj=new Person("laotie",88);
console.log(obj.say());//我是来证明的，你叫laotie今年88岁了
```

可以通过Object.assign方法来为对象动态增加方法<br/>
```js
Object.assign(Person.prototype,{
    getName:function(){
        return this.name;
    },
    getAge:function(){
        return this.age;
    }
})
var obj=new Person("laotie",88);
console.log(obj.getName());//laotie
console.log(obj.getAge());//88
```
constructor方法是类的构造函数的默认方法，通过new命令生成对象实例时，自动调用该方法。<br/>
```js
class Box{
    constructor(){
        console.log("啦啦啦，今天天气好晴朗");//当实例化对象时该行代码会执行。
    }
}
var obj=new Box();
```
constructor方法如果没有显式定义，会隐式生成一个constructor方法。所以即使你没有添加构造函数，构造函数也是存在的。constructor方法默认返回实例对象this，但是也可以指定constructor方法返回一个全新的对象，让返回的实例对象不是该类的实例。<br/>
```js
class Desk{
    constructor(){
        this.xixi="我是一只小小小小鸟！哦";
    }
}
class Box{
    constructor(){
       return new Desk();// 这里没有用this哦，直接返回一个全新的对象
    }
}
var obj=new Box();
console.log(obj.xixi);//我是一只小小小小鸟！哦
```
<br/>
constructor中定义的属性可以称为实例属性（即定义在this对象上），constructor外声明的属性都是定义在原型上的，可以称为原型属性（即定义在class上)。hasOwnProperty()函数用于判断属性是否是实例属性。其结果是一个布尔值， true说明是实例属性，false说明不是实例属性。in操作符会在通过对象能够访问给定属性时返回true,无论该属性存在于实例中还是原型中。<br/>

<b>class不存在变量提升</b>，所以需要先定义再使用。因为ES6不会把类的声明提升到代码头部，但是ES5就不一样,ES5存在变量提升,可以先使用，然后再定义。<br/>

### super关键字

super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。<br/>
第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。<br/>
```js
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```
上面代码中，子类B的构造函数之中的super()，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。<br/>

注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)。<br/>




## Set和WeakSet

### Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。<br/>
Set本身是一个构造函数，用来生成 Set 数据结构。<br/>
<br/>
一种去除数组重复成员的方法。
```js
// 去除数组的重复成员
[...new Set(array)]
```
<br/><br/>
上面的方法也可以用于，去除字符串里面的重复字符。
```js
[...new Set('ababbc')].join('')
// "abc"
```
Set 对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用。<br/>

向Set加入值得时候，不会发生类型转换，所以 5 和 "5" 是两个不同的值，Set 内部判断两个值是否不同，使用的算法叫做"Same-value-zeroequality"，类似于精确相等运算符"==="，主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。<br/>

#### Set 实例的属性和方法
* constructor：构造函数
* size: 元素数量
* add: 新增，相当于array里的push
* delete: 存在即删除集合中的value
* has: 判断集合中是否存在value
* clear: 清空集合

Set结构可以利用 Array.from 或者 扩展运算符 转化为数组<br/><br/>

遍历方法（遍历顺序为插入顺序）<br/>
* keys()： 返回一个包含集合中所有键的迭代器
* values()：返回一个包含集合中所有值的迭代器
* entries(): 返回一个包含Set对象中所有元素
* forEach(callback, thisArg): 用于对集合成员执行callbackFn操作，如果提供了thisArg参数，回调中的this会是这个参数，回调中this会是这个参数，没有返回值
```js
let set = new Set([1, 2, 3])
console.log(set.keys())             // SetIterator {1, 2, 3}
console.log(set.values())           // SetIterator {1, 2, 3}
console.log(set.entries())          // SerIterator {1, 2, 3}
for (let item of set.keys()) {
    console.log(item)               // 1    2   3
}
for (let item of set.entries()) {
    console.log(item)               // [1, 1]   [2, 2]  [3, 3]
}
set.forEach((value, key) => {
    console.log(`${key}:${val}`)    // 1:1   2:2  3:3    
})
```
<br/>
Set很容易实现交集(intersect)、并集(union)、差集(difference)<br/>

```js
let set1 = new Set([1, 2, 3])
let set2 = new Set([4, 3, 2])

let intersect = new Set([...set1].filter(value => set2.has(value)))
let union = new Set([...set1, ...set2])
let difference = new Set([...set1].filter(value => !set2.has(value)))

console.log(intersect)  // Set {2, 3}
console.log(union)      // Set {1, 2, 3, 4}
console.log(difference) // Set {1}
```

### WeakSet

WeakSet 对象允许你将弱引用对象储存在一个集合中<br/><br/>

WeakSet 与 Set 的区别：<br/>
1. WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
2. WeakSet 对象中储存的对象值都是被弱引用的，则这个对象将会被垃圾回收掉（不考虑该对象还存放于 WeakSet 中），所以 WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能被垃圾回收了，WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素


## Map和WeakMap

### Map

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。<br/>
为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。<br/><br/>

Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。<br/>
Objects 和 Maps 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 Maps 使用。不过 Maps 和 Objects 有一些重要的区别，在下列情况里使用 Map 会是更好的选择：<br/>

* 一个Object的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值，包括函数、对象、基本类型。
* Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。
* 你可以通过 size 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数只能手动计算。
* Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代。
* Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。虽然 ES5 开始可以用 map = Object.create* (null) 来创建一个没有原型的对象，但是这种用法不太常见。
* Map 在涉及频繁增删键值对的场景下会有些性能优势。


```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

集合 与 字典 的区别：<br/>
* 共同点：集合、字典 可以储存不重复的值
* 不同点：集合 是以[value, value]的形式储存元素，字典 是以[key, value]的形式储存


#### Map 的属性及方法

属性:<br/>
* constructor: 构造函数
* size: 返回字典中所包含的元素个数
<br/><br/>
操作方法：
* set(key, value)：向字典中添加新元素
* get(key)：通过键查找特定的数值并返回
* has(key)：判断字典中是否存在键key
* delete(key)：通过键 key 从字典中移除对应的数据
* clear()：将这个字典中的所有元素删除
<br/><br/>
遍历方法：
* Keys()：将字典中包含的所有键名以迭代器形式返回
* values()：将字典中包含的所有数值以迭代器形式返回
* entries()：返回所有成员的迭代器
* forEach()：遍历字典的所有成员


```js
const map = new Map([
    ['a', 1],
    ['b', 2]
])
console.log(map.values())   // MapIterator {1, 2}
console.log(map.entries())  // MapIterator {"a" => 1, "b" => "2"}
console.log(map.keys())     // MapIterator {"a", "b"}
```

#### 与其他数据结构的相互转换

<b>Map 转 Array</b>
```js
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log([...map])                    // [[1, 1], [2, 2], [3, 3]]
```

<b>Array 转 Map</b>
```js
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log(map)                         // Map {1 => 1, 2 => 2, 3 => 3}
```


<b>Map 转 Object</b>
因为 Object 的键名都为字符串，而Map 的键名为对象，所以转换的时候会把非字符串键名转换为字符串键名。<br/>
```js
function mapToObj(map) {
let obj = Object.create(null)
for (let [key, value] of map) {
    obj[key] = value
}
    return obj
}
const map = new Map().set('name', 'An').set('des', 'JS')
mapToObj(map)                               // {name: "An", des: "JS"}
```


<b>Object 转 Map</b>
```js
function objToMap(obj) {
    let map = new Map()
    for (let key of Object.keys(obj)) {
        map.set(key, obj[key])
    }
    return map
}

objToMap({'name': 'An', 'des': 'JS'})       // Map {"name" => "An", "des" => "JS"}
```


<b>Map 转 JSON</b>
```js
function mapToJson(map) {
    return JSON.stringify([...map])
}

let map = new Map().set('name', 'An').set('des', 'JS')
mapToJson(map)                              // [["name","An"],["des","JS"]]
```


<b>JSON 转 Map</b>

```js
function jsonToStrMap(jsonStr) {
  return objToMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"name": "An", "des": "JS"}') // Map {"name" => "An", "des" => "JS"}
```

### WeakMap

WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意。<br/><br/>

注意: WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。<br/><br/>

WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的key则变成无效的），所以，WeakMap 的 key 是不可枚举的。<br/>

### 总结 Set WeakSet Map WeakMap

Set<br/>
* 成员唯一、无序且不重复
* [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
* 可以遍历，方法有：add、delete、has

WeakSet<br/>

* 成员都是对象
* 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
* 不能遍历，方法有add、delete、has

<br/>
Map<br/>

* 本质上是键值对的集合，类似集合
* 可以遍历，方法很多可以跟各种数据格式转换

WeakMap<br/>

* 只接受对象作为键名（null除外），不接受其他类型的值作为键名
* 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
* 不能遍历，方法有get、set、has、delete