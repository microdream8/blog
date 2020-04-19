---
title: 'js基础总结'
sidebar: auto
collapsable: true
---
# js基础

## 遍历与循环总结

### 1. forEach
可以三个参数，第一个是value，第二个是index，第三个是数组体

缺点：不能同时遍历多个集合，在遍历的时候无法修改和删除集合数据，方法不能使用break,continue语句跳出循环，或者使用return从函数体返回，对于空数组不会执行回调函数，不能遍历对象

优点：遍历的时候更加简洁，效率和for循环相同，不用关心集合下标问题，减少了出错的效率

定义：用于调用数组的每个元素，并将元素传递给回调函数

实例：
```js
//我们先用它来遍历数组
  let arry=[9,8,7,6,5,4]
  array.forEach(function(value,index,arr){
      console.log(value)
  })
//输出结果为9 8 7 6 5 4


//首先有人疑问它能不能用来遍历对象（一开始我也不知道）？
//我们用它来遍历对象试试可不可以
   let obj={a:1,b:2,c:3,d:4}
   obj.forEach(function(value,index,oObj){
       console.log(value)
   }
//输出结果会是obj.forEach is not a function，
//所以forEach不可以遍历对象，这也是它和for in的一个区别
```

### 2. for in (它大部分用于遍历对象)
定义：用于循环遍历数组或对象属性，for in 循环里面的index是string类型的，代码每执行一次，就会对数组对元素或者对象对属性进行一次操作

缺点：某些情况下，会出现随机顺序对遍历，因为里面对值是string类型，增加里转换过程，因此开销较大

优点：可以遍历数组对键名，遍历对象简洁方便

实例：
```js
//我们先用它来遍历数组
  let arry=[9,8,7,6,5,4]
  array.forEach(function(value,index,arr){
      console.log(value)
  })
//输出结果为9 8 7 6 5 4


//首先有人疑问它能不能用来遍历对象（一开始我也不知道）？
//我们用它来遍历对象试试可不可以
   let obj={a:1,b:2,c:3,d:4}
   obj.forEach(function(value,index,oObj){
       console.log(value)
   }
//输出结果会是obj.forEach is not a function，
//所以forEach不可以遍历对象，这也是它和for in的一个区别
```

### for of
可遍历map，object,array,set string等）用来遍历数据，比如组中的值,map,set会在下篇文章详解，这节只查看遍历对象和数组

优点：避免了for in的所有缺点，可以使用break,continue和return，不仅支持数组的遍历，还可以遍历类似数组的对象，支持字符串的遍历;最简洁，最直接的遍历数组的语法;支持map和Set对象遍历

缺点：不适用于处理原有的原生对象（原生对象是一个子集，包含一些在运动过程中动态创建的对象）

实例：
```js
//遍历数组
   let arr=["nick","freddy","mike","james"];
    for (let item of arr){
        console.log(item)
    }
//暑促结果为nice freddy mike james


//遍历对象
   let person={name:"老王",age:23,city:"唐山"}
   for (let item of person){
        console.log(item)
    }
//我们发现它是不可以的
//但是它和forEach有个解决方法，结尾介绍
```

### for
缺点：程序简洁，结构清晰，循环初始化，循环变量化，循环体和循环条件位置突出

缺点：结构比while循环复杂，容易出编码错误

实例：
```js
//首先它和forEach,forof一样不可以遍历对象
//解决办法：就是把对象先转化为数组类型- -
//有一个对象：
     let obj={a:1,b:2,c:3}
//用Object.keys属性转化
     let obj2=Object.keys(obj)
//最后就可以用来遍历了
   for (let i=0;i<obj2.length;i++){
     console.log(obj2[i])
   }
//输出结果就能出来了，forEach，for of同理
```

### Map和ForEach的区别
#### 定义
foreEach()方法:

针对每一个元素执行提供的函数。

map()方法:

创建一个新的数组，其中每一个元素由调用数组中的每一个元素执行提供的函数得来。

区别：

forEach()方法不会返回执行结果，而是undefined。也就是说，forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回。
```js
arr.forEach((value, key) => {
 return arr[key] = value * value;
});
```
打印原数组时发生改变

```js
let list = arr.map(value => {
 return value * value;
});
```
arr原数组未发生改变

#### 执行速度对比
forEach()的执行速度 < map()的执行速度

#### 如何使用
forEach适合于你并不打算改变数据的时候，而只是想用数据做一些事情 – 比如存入数据库或则打印出来。

map()适用于你要改变数据值的时候。不仅仅在于它更快，而且返回一个新的数组。这样的优点在于你可以使用复合(composition)(map(), filter(), reduce()等组合使用)来玩出更多的花样。
```js
let arr = [1, 2, 3, 4, 5];
let arr2 = arr.map(value => value * value).filter(value => value > 10);
// arr2 = [16, 25]
```

#### 总结
* forEach()可以做到的东西，map()也同样可以。反过来也是如此。
* map()会分配内存空间存储新数组并返回，forEach()不会返回数据。
* forEach()允许callback更改原始数组的元素。map()返回新的数组。






