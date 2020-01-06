---
title: 'js继承2'
sidebar: auto
collapsable: true
---
# js继承2

## 构造函数的继承

今天要介绍的是，对象之间的"继承"的五种方法。<br/>
今天要介绍的是，对象之间的"继承"的五种方法。<br/>
```js
function Animal(){
    this.species = "动物";
}
```
还有一个"猫"对象的构造函数。<br/>
```js
function Cat(name,color){
　　 this.name = name;
　　 this.color = color;
}
```
怎样才能使"猫"继承"动物"呢？<br/><br/>

### 构造函数绑定
第一种方法也是最简单的方法，使用call或apply方法，将父对象的构造函数绑定在子对象上，即在子对象构造函数中加一行：
```js
function Cat(name,color){
    Animal.apply(this, arguments);
    this.name = name;
    this.color = color;
}
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```

### prototype模式
第二种方法更常见，使用prototype属性。<br/>
如果"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了。<br/>
```js
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
代码的第一行，我们将Cat的prototype对象指向一个Animal的实例。
```js
Cat.prototype = new Animal();
```
它相当于完全删除了prototype 对象原先的值，然后赋予一个新值。但是，第二行又是什么意思呢？
```js
Cat.prototype.constructor = Cat;
```
原来，任何一个prototype对象都有一个constructor属性，指向它的构造函数。如果没有"Cat.prototype = new Animal();"这一行，Cat.prototype.constructor是指向Cat的；加了这一行以后，Cat.prototype.constructor指向Animal。
```js
alert(Cat.prototype.constructor == Animal); //true
```
更重要的是，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。
```js
alert(cat1.constructor == Cat.prototype.constructor); // true
```
因此，在运行"Cat.prototype = new Animal();"这一行之后，cat1.constructor也指向Animal！
```js
alert(cat1.constructor == Animal); // true
```
这显然会导致继承链的紊乱（cat1明明是用构造函数Cat生成的），因此我们必须手动纠正，将Cat.prototype对象的constructor值改为Cat。这就是第二行的意思。<br/>
这是很重要的一点，编程时务必要遵守。下文都遵循这一点，即如果替换了prototype对象，
```js
o.prototype = {};
```
那么，下一步必然是为新的prototype对象加上constructor属性，并将这个属性指回原来的构造函数。
```js
o.prototype.constructor = o;
```

### 直接继承prototype
第三种方法是对第二种方法的改进。由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。<br/>
现在，我们先将Animal对象改写：
```js
function Animal(){}
Animal.prototype.species = "动物";
```
然后，将Cat的prototype对象，然后指向Animal的prototype对象，这样就完成了继承。
```js
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。<br/>
所以，上面这一段代码其实是有问题的。请看第二行
```js
Cat.prototype.constructor = Cat;
```
这一句实际上把Animal.prototype对象的constructor属性也改掉了！
```js
alert(Animal.prototype.constructor); // Cat
```

### 利用空对象作为中介
由于"直接继承prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介。
```js
var F = function(){};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;
```
F是空对象，所以几乎不占内存。这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。
```js
alert(Animal.prototype.constructor); // Animal
```
我们将上面的方法，封装成一个函数，便于使用。
```js
function extend(Child, Parent) {
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}
```
使用的时候，方法如下
```js
extend(Cat,Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
这个extend函数，就是YUI库如何实现继承的方法。<br/>
另外，说明一点，函数体最后一行
```js
Child.uber = Parent.prototype;
```
意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。

### 拷贝继承
上面是采用prototype对象，实现继承。我们也可以换一种思路，纯粹采用"拷贝"方法实现继承。简单说，如果把父对象的所有属性和方法，拷贝进子对象，不也能够实现继承吗？这样我们就有了第五种方法。<br/>
首先，还是把Animal的所有不变属性，都放到它的prototype对象上。
```js
function Animal(){}
Animal.prototype.species = "动物";
```
然后，再写一个函数，实现属性拷贝的目的。
```js
function extend2(Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
}
```
这个函数的作用，就是将父对象的prototype对象中的属性，一一拷贝给Child对象的prototype对象。<br/>
使用的时候，这样写：
```js
extend2(Cat, Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```




### 原型链
首先得要明白什么是原型链，在一篇文章看懂proto和prototype的关系及区别中讲得非常详细。<br/>
原型链继承基本思想就是让一个原型对象指向另一个类型的实例
```js
function SuperType() {
    this.property = true
}

SuperType.prototype.getSuperValue = function() {
    return this.property
}

function SubType() {
    this.subproperty = false
}

SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function() {
    return this.subproperty
}

var instance = new SubType() console.log(instance.getSuperValue()) // true
```
代码定义了两个类型SuperType和SubType，每个类型分别有一个属性和一个方法，SubType继承了SuperType，而继承是通过创建SuperType的实例，并将该实例赋给SubType.prototype实现的<br/>
实现的本质是重写原型对象,代之以一个新类型的实例，那么存在SuperType的实例中的所有属性和方法，现在也存在于SubType.prototype中了<br/>
我们知道，在创建一个实例的时候，实例对象中会有一个内部指针指向创建它的原型，进行关联起来，在这里代码SubType.prototype = new SuperType()，也会在SubType.prototype创建一个内部指针，将SubType.prototype与SuperType关联起来<br/>
所以instance指向SubType的原型，SubType的原型又指向SuperType的原型，继而在instance在调用getSuperValue()方法的时候，会顺着这条链一直往上找<br/>

**添加方法**
在给SubType原型添加方法的时候，如果，父类上也有同样的名字，SubType将会覆盖这个方法，达到重新的目的。 但是这个方法依然存在于父类中<br/>
记住不能以字面量的形式添加，因为，上面说过通过实例继承本质上就是重写，再使用字面量形式，又是一次重写了，但这次重写没有跟父类有任何关联，所以就会导致原型链截断
```js
function SuperType() {
    this.property = true
}

SuperType.prototype.getSuperValue = function() {
    return this.property
}

function SubType() {
    this.subproperty = false
}

SubType.prototype = new SuperType()

SubType.prototype = {
    getSubValue: function() {
        return this.subproperty
    }
}

var instance = new SubType() console.log(instance.getSuperValue()) // error
```

**问题**
单纯的使用原型链继承，主要问题来自包含引用类型值的原型。<br/>
```js
function SuperType() {
    this.colors = ['red', 'blue', 'green']
}

function SubType() {}

SubType.prototype = new SuperType()

var instance1 = new SubType() var instance2 = new SubType()

instance1.colors.push('black') console.log(instance1.colors) // ["red", "blue", "green", "black"]
console.log(instance2.colors) // ["red", "blue", "green", "black"]
```
在SuperType构造函数定义了一个colors属性，当SubType通过原型链继承后，这个属性就会出现SubType.prototype中，就跟专门创建了SubType.prototype.colors一样，所以会导致SubType的所有实例都会共享这个属性，所以instance1修改colors这个引用类型值，也会反映到instance2中。<br/>

**借用构造函数**
此方法为了解决原型中包含引用类型值所带来的问题<br/>
这种方法的思想就是在子类构造函数的内部调用父类构造函数，可以借助apply()和call()方法来改变对象的执行上下文<br/>
```js
function SuperType() {
    this.colors = ['red', 'blue', 'green']
}

function SubType() {
    // 继承SuperType
    SuperType.call(this)
}

var instance1 = new SubType() var instance2 = new SubType()

instance1.colors.push('black') console.log(instance1.colors) // ["red", "blue", "green", "black"]
console.log(instance2.colors) // ["red", "blue", "green"]
```
在新建SubType实例是调用了SuperType构造函数，这样以来，就会在新SubType对象上执行SuperType函数中定义的所有对象初始化代码<br/>
结果，SubType的每个实例就会具有自己的colors属性的副本了

**传递参数**
借助构造函数还有一个优势就是可以传递参数
```js
function SuperType(name) {
    this.name = name
}

function SubType() {
    // 继承SuperType
    SuperType.call(this, 'Jiang')

    this.job = 'student'
}

var instance = new SubType() console.log(instance.name) // Jiang
console.log(instance.job) // student
```

**问题**
如果仅仅借助构造函数，方法都在构造函数中定义，因此函数无法达到复用<br/>

### 组合继承(原型链+构造函数)

组合继承是将原型链继承和构造函数结合起来，从而发挥二者之长的一种模式<br/>
思路就是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承<br/>
这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性
```js
function SuperType(name) {
    this.name = name this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, job) {
    // 继承属性
    SuperType.call(this, name)

    this.job = job
}

// 继承方法
SubType.prototype = new SuperType() SubType.prototype.constructor = SuperType SubType.prototype.sayJob = function() {
    console.log(this.job)
}

var instance1 = new SubType('Jiang', 'student') instance1.colors.push('black') console.log(instance1.colors) //["red", "blue", "green", "black"]
instance1.sayName() // 'Jiang'
instance1.sayJob() // 'student'
var instance2 = new SubType('J', 'doctor') console.log(instance2.colors) // //["red", "blue", "green"]
instance2.sayName() // 'J'
instance2.sayJob() // 'doctor'
```
这种模式避免了原型链和构造函数继承的缺陷，融合了他们的优点，是最常用的一种继承模式

### 原型式继承
借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型
```js
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
```
在object函数内部，先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的一个新实例<br/>
本质上来说，object对传入其中的对象执行了一次浅复制
```js
var person = {
    name: 'Jiang',
    friends: ['Shelby', 'Court']
}
var anotherPerson = object(person) console.log(anotherPerson.friends) // ['Shelby', 'Court']
```
这种模式要去你必须有一个对象作为另一个对象的基础<br/>
在这个例子中，person作为另一个对象的基础，把person传入object中，该函数就会返回一个新的对象<br/>
这个新对象将person作为原型，所以它的原型中就包含一个基本类型和一个引用类型<br/>
所以意味着如果还有另外一个对象关联了person，anotherPerson修改数组friends的时候，也会体现在这个对象中

### Object.create()方法

ES5通过Object.create()方法规范了原型式继承，可以接受两个参数，一个是用作新对象原型的对象和一个可选的为新对象定义额外属性的对象，行为相同，基本用法和上面的object一样，除了object不能接受第二个参数以外
```js
var person = {
    name: 'Jiang',
    friends: ['Shelby', 'Court']
}
var anotherPerson = Object.create(person) console.log(anotherPerson.friends)
```

### 寄生式继承

寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数
```js
function createAnother(o) {
    var clone = Object.create(o) // 创建一个新对象
    clone.sayHi = function() { // 添加方法
        console.log('hi')
    }
    return clone // 返回这个对象
}

var person = {
    name: 'Jiang'
}

var anotherPeson = createAnother(person) anotherPeson.sayHi()
```
基于person返回了一个新对象anotherPeson，新对象不仅拥有了person的属性和方法，还有自己的sayHi方法<br/>
在主要考虑对象而不是自定义类型和构造函数的情况下，这是一个有用的模式

### 寄生组合式继承

在前面说的组合模式(原型链+构造函数)中，继承的时候需要调用两次父类构造函数<br/>
父类
```js
function SuperType(name) {
    this.name = name
    this.colors = ['red', 'blue', 'green']
}
```
第一次在子类构造函数中
```js
function SubType(name, job) {
// 继承属性
SuperType.call(this, name)
 
this.job = job
}
```
第二次将子类的原型指向父类的实例
```js
// 继承方法
SubType.prototype = new SuperType()
```
当使用var instance = new SubType()的时候，会产生两组name和color属性，一组在SubType实例上，一组在SubType原型上，只不过实例上的屏蔽了原型上的<br/>
使用寄生式组合模式，可以规避这个问题<br/>
这种模式通过借用构造函数来继承属性，通过原型链的混成形式来继承方法<br/>
基本思路：不必为了指定子类型的原型而调用父类的构造函数，我们需要的无非就是父类原型的一个副本<br/>
本质上就是使用寄生式继承来继承父类的原型，在将结果指定给子类型的原型
```js
function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}
```
该函数实现了寄生组合继承的最简单形式<br/>
这个函数接受两个参数，一个子类，一个父类<br/>
第一步创建父类原型的副本，第二步将创建的副本添加constructor属性，第三部将子类的原型指向这个副本
```js
function SuperType(name) {
    this.name = name this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, job) {
    // 继承属性
    SuperType.call(this, name)

    this.job = job
}

// 继承
inheritPrototype(SubType, SuperType)

var instance = new SubType('Jiang', 'student') instance.sayName()
```
补充：直接使用Object.create来实现，其实就是将上面封装的函数拆开，这样演示可以更容易理解
```js
function SuperType(name) {
    this.name = name this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, job) {
    // 继承属性
    SuperType.call(this, name)

    this.job = job
}

// 继承
SubType.prototype = Object.create(SuperType.prototype)

// 修复constructor
SubType.prototype.constructor = SubType

var instance = new SubType('Jiang', 'student') instance.sayName()
```
ES6新增了一个方法，Object.setPrototypeOf，可以直接创建关联，而且不用手动添加constructor属性
```js
// 继承
Object.setPrototypeOf(SubType.prototype, SuperType.prototype)
 
console.log(SubType.prototype.constructor === SubType) // true
```



