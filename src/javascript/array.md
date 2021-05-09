<!--
 * @Author: gexiaolei
 * @Date: 2020-06-20 15:36:17
 * @LastEditTime: 2020-06-20 16:59:51
 * @LastEditors: Please set LastEditors
 * @Description: 数组总结
--> 

---
title: '数组总结'
sidebar: auto
collapsable: true
---
# 数组总结

## 数组判断

## ES6

### 复制
```js
const a1 = [1, 2]
const a2 = [...a1]
// 注：浅拷贝方法
```

### 合并
```js
const arr1 = ['1', '2'];
const arr2 = ['c', {a:1} ];
[...arr1, ...arr2]
// 注：浅拷贝方法
```

### 将字符串转化为数组
```js
[...'xuxi']
```

## 常见操作
### Array.of()
Array.of方法用于将一组值，转换为数组。Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
```js
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(2) // [2]
Array.of(21, 2) // [21, 2]
```

### 数组实例的 includes()
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值。该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
```js
[1, 4, 3].includes(3)     // true
[1, 2, 4].includes(3)     // false
[1, 5, NaN, 6].includes(NaN) // true
```

### 数组去重
```js
const arr = [1, 1, 2, 2, 3, 4, 5, 5]
const newArr = [...new Set(arr)]
```

### 数组取交集
```js
const a = [0, 1, 2, 3, 4, 5]
const b = [3, 4, 5, 6, 7, 8]
const duplicatedValues = [...new Set(a)].filter(item => b.includes(item))
duplicatedValues // [3, 4, 5]
```

### 数组取差集
```js
const a = [0, 1, 2, 3, 4, 5]
const b = [3, 4, 5, 6, 7, 8]
const diffValues = [...new Set([...a, ...b])].filter(item => !b.includes(item) || !a.includes(item)) // [0, 1, 2, 6, 7, 8]
```

### 数组摊平
```js
const obj = {a: '群主', b: '男群友', c: '女裙友', d: '未知性别'}
const getName = function (item) { return item.includes('群')}
// 方法1
const flatArr = Object.values(obj).flat().filter(item => getName(item))
// 经大佬指点，更加简化（发现自己的抽象能力真的差~）
const flatArr = Object.values(obj).flat().filter(getName)
// 二维数组用array.flat()，三维及以上用array.flatMap()。
```

### 数组的常用遍历
#### 检测数组所有元素是否都符合判断条件
```js
const arr = [1, 2, 3, 4, 5]
const isAllNum = arr.every(item => typeof item === 'number')
```

#### 检测数组是否有元素符合判断条件
```js
const arr = [1, 2, 3, 4, 5]
const hasNum = arr.some(item => typeof item === 'number')
```

#### 找到第一个符合条件的元素/下标
```js
const arr = [1, 2, 3, 4, 5]
const findItem = arr.find(item => item === 3) // 返回子项
const findIndex = arr.findIndex(item => item === 3) // 返回子项的下标

// 我以后再也不想看见下面这样的代码了😂
let findIndex
arr.find((item, index) => {
    if (item === 3) {
        findIndex = index
    }
})
```


## 类数组

### 通过扩展运算符
```js
let nodeList = document.querySelectorAll('div');
let arr = [...nodeList];
```
上面代码中，querySelectorAll方法返回的是一个NodeList对象。它不是数组，而是一个类似数组的对象。扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator。

### 通过Array.from()
Array.from方法用于将类对象转为真正的数组：类似数组的对象和可遍历的对象（包括 ES6 新增的数据结构 Set 和 Map）。
```js
let nodeList = document.querySelectorAll('div');
let arr = [...nodeList];
```

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
```js
Array.from([1, 2, 4], (x) => x + 1)
// [2, 3, 5]
```


