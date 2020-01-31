---
title: '面向对象'
sidebar: auto
collapsable: true
---
# 面向对象

## 什么是对象

"无序属性的集合，其属性可以包括基本值、对象或者函数"，对象是一组没有特定顺序的的值。对象的没个属性或方法都有一个名字，每个名字都映射到一个值。<br/>
简单来理解对象就是由属性和方法来组成的。<br/>

### 面向对象的特点
封装<br/>
对于一些功能相同或者相似的代码，我们可以放到一个函数中去，多次用到此功能时，我们只需要调用即可，无需多次重写。<br/>
创造对象的几种模式：单例模式、工厂模式、构造函数模式、原型模式等。<br/>
继承<br/>
子类可以继承父类的属性和方法。<br/>
多态(重载和重写)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;重载：严格意义上说js中没有重载的功能，不过我们可以通过判断函数的参数的不同来实现不同的功能来模拟重载。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;重写：子类可以改写父类的属性和方法。<br/>

#### javascript中的封装

<b>单例模式</b>
小王在一个小公司，就自己一个前端，所以他写js都是这样的
```js
var a = 1;
function getNum(){
    return 1;
}
```
后来公司又招了个前端小明，于是变成他们2个一起写同一个js了。一天小王发现自己写的getNum方法出问题了，原来是小华写的js中也有个getNum的函数，代码合并后把他的覆盖掉了，于是便找小华理论去，经过一番妥协后，两人都把自己的代码改了改。<br/>

```js
var xiaoming = {
    num:1,
    getNum:function(){
        return 1;
    }
};

var xiaohua = {
    num:2,
    getNum: function(){
        return 2;
    }
};
```

这就是我们所谓的单例模式(命名空间)
我们把描述同一个事物的方法或者属性放到同一个对象里，不同事物之间的方法或者属性名相同相互也不会发生冲突。<br/>

<b>单例模式的优劣</b><br/>
使用单例模式，我们可以实现简单的模块化开发<br/>

```js
var obj = {
    getCss:function(){
        //code
    },
    getByClass:function(){
         //code
    },
    setCss:function(){
        //code
    }
}
```

我们可以把自己写好的工具方法放到一个单独的js文件中，然后直接引入即可。<br/>

避免了全局变量名的冲突<br/>
需要注意的是，我们在引入各个模块的时候，需要注意引入的顺序，引入顺序是按照各模块之间的相互依赖进行前后排列的；<br/>
缺点：<br/>
单例模式只是一定程度上避免了变量名的冲突，但并不能彻底解决此问题，而且在不同的对象下，我们可能会有很多功能相同的代码，最终造成大量的冗余代码。<br/>
单例模式让每个对象有了自己独立的命名空间，但是并不能批量生产的问题，每一个新的对象都要重新写一份一模一样的代码。<br/>

```js
var person = {
    name:'小明',
    age:24,
    showName:function(){
        console.log('我的名字是：'+this.name)
    }
};
var person = {
    name:'小华',
    age:25,
    showName:function(){
        console.log('我的名字是：'+this.name)
    }
};
```

<b>工厂模式</b>

工厂模式其实就是把需要一个个的编写的对象,放在一个函数中统一的进行创建，说白了就是普通函数的封装。<br/>
工厂模式是编程领域一种广为人知的设计模式，它抽象了创建具体对象的过程。JS 中创建一个函数，把创建新对象、添加对象属性、返回对象的过程放到这个函数中，用户只需调用函数来生成对象而无需关注对象创建细节，这叫工厂模式。<br/>
工厂模式总共3步骤：<br/>
1）进厂 --- 创建一个空对象<br/>
2）加工 --- 加工对象：给对象添加属性和方法；<br/>
3）输出 --- 返回对象：return 对象；<br/>

```js
function CreatePerson(name,age){
    var obj={};//1.创建一个空对象
    //2.加工对象
    obj.name=name;
    obj.age=age;
    obj.showName=function(){
        console.log('我的名字是：'+this.name)
    };
    return obj;//3.输出对象；
}
var person1 = CreatePerson('小明',23)
var person2 = CreatePerson('小华',23)
person1.showName(); //我的名字是：小明
person2.showName(); //我的名字是：小华
```
工厂模式的优缺点<br/>
既然叫工厂模式，它就和我们周围的工厂一样，我们只需要把原材料放进去，就能得到我们需要的产品了。<br/>
工厂模式也解决了单例模式的批量生产的问题，避免了单例模式中的大量冗余代码，进行系统的封装，提高代码的重复利用率<br/>
不过工厂模式跟我们js内置类的调用方法不同，因为是调用函创建对象，无法识别对象的类型<br/>

<b>构造函数模式</b><br/>
可以创建一个自定义的类，并且可以new出实例<br/>
构造函数做的就是类和实例打交道。<br/>

```js
//构造函数：首字母大写(约定俗成)；
function CreatePerson(name,age){ //创建一个自定义的类
    //构造函数中的this，都是new出来的实例
    //构造函数中存放的都是私有的属性和方法；
    this.name=name;
    this.age=age;
    this.showName=function(){
            console.log('我的名字是：'+this.name)
    }
}
//实例1
var person1 = new CreatePerson('小明', 25)
//实例2
var person2 = new CreatePerson('小华', 24)
```

这里说一下工厂模式和构造函数模式的区别：<br/>
::: warning 注意
1. 在调用的时候不同：
工厂模式：调用的时候，只是普通函数的调用createPerson();
构造函数模式：new CreatePerson();
2. 在函数体内不同：
工厂模式有三步：1）创建对象 2）加工对象 3）返回对象；
构造函数模式只有1步： 只有加工对象； 因为系统默认会为其创建对象和返回对象；
3. 构造函数默认给我们返回了一个对象，如果我们非要自己手动返回的话：
    (1)手动返回的是字符串类型：对以前实例上的属性和方法没有影响；
    (2)手动返回的是引用数据类型:以前实例身上的属性和方法就被覆盖了；实例无法调用属性和方法；
:::

构造函数的方法都是私有方法，每个实例调用的都是自己私有的方法，即构造函数方法要在每个实例上新建一次，同样也会有许多重复的代码。<br/>
我们可以使用原型模式来解决每个实例中都有相同方法的函数的问题<br/>
解决了类似对象创建问题，且可以检测对象类型。<br/>


<b>原型模式</b><br/>
终于讲到了原型模式，JS 中每个构造函数都有一个prototype属性，这个属性是一个指针，指向原型对象，而这个原型对象包含了这个构造函数所有实例共享的属性和方法。而实例对象中有一个proto属性，它指向原型对象，也就是构造函数.prototype == 原型对象 == 对象._proto_，那么对象就可以获取到原型对象中的属性和方法啦。同时，所有对象中都有一个constructor属性，原型对象的constructor指向其对应的构造函数。<br/>

使用原型，就意味着我们可以把希望实例共享的属性和方法放到原型对象中去，而不是放在构造函数中，这样每一次通过构造函数new一个实例，原型对象中定义的方法都不会重新创建一次。来看下面的例子：<br/>
```js
function Person() {
}

Person.prototype.name = "leon";
Person.prototype.age = "20";
Person.prototype.greeting = function() {
  alert('Hi!');
};

var person1 = new Person();
var person2 = new Person();
alert(person1.name); //"leon"
alert(person2.name); //"leon"
alert(person1.greeting == person2.greeting); //true

```
优点：与单纯使用构造函数不一样，原型对象中的方法不会在实例中重新创建一次，节约内存。<br/>
缺点：使用空构造函数，实例 person1 和 person2 的 name都一样了，我们显然不希望所有实例属性方法都一样，它们还是要有自己独有的属性方法。并且如果原型中对象中有引用类型值，实例中获得的都是该值的引用，意味着一个实例修改了这个值，其他实例中的值都会相应改变。<br/>
解决办法：构造函数+原型模式组合使用。<br/>
另外 JS 中还定义了一些与原型相关的属性，这里罗列一下：<br/>
Object.getPrototypeOf()，取得实例的原型对象。

```js
Object.getPrototypeOf(person1);
```
isPrototypeOf()，判断是不是一个实例的原型对象。<br/>
```js
Person.prototype.isPrototypeOf(person1);
```
hasOwnProperty()，检测一个属性是否存在于实例中<br/>
```js
person1.hasOwnProperty("name");
```
in，判断一个属性是否存在于实例和原型中。
```js
"name" in person1;
```

<b>构造函数+原型模式</b>

```js
function CreatePerson(name,age){ 
    this.name=name;
    this.age=age;
}
// 我们把公有的方法放到函数的原型链上
CreatePerson.prototype.showName = function(){
    console.log('我的名字是：'+this.name)
}  
var person1 = new CreatePerson('小明',25) 
var person2 = new CreatePerson('小华',24)
person1.showName() //小明
```
原型模式的关键：<br/>
1）每个函数数据类型（普通函数，类）上，都有一个属性，叫prototype。<br/>
2）prototype这个对象上，天生自带一个属性，叫constructor:指向当前这个类；<br/>
3）每个对象数据类型（普通对象，prototype，实例）上都有一个属性，叫做__proto__:指向当前实例所属类的原型；<br/>
