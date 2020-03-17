---
title: '异步相关'
sidebar: auto
collapsable: true
---
# 异步相关知识点

## Promise
### Promise 的含义
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。<br/>
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。<br/><br/>

Promise对象有以下两个特点：<br/>
（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。<br/>
（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。<br/><br/>

优点：<br/>
有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。<br/>
缺点：<br/>
Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。<br/><br/>

promise上的方法：<br/>
1. Promise.all()<br/>
2. Promise.race()<br/>
3. Promise.resolve()<br/>
4. Promise.reject()<br/>
5. Promise.prototype.catch()<br/>
6. Promise.prototype.finally()<br/>
7. Promise.prototype.then()<br/>

### Promise.prototype.then()
Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。<br/><br/>

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。<br/>

### Promise.all()
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。<br/>
```js
const p = Promise.all([p1, p2, p3]);
```
上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。<br/><br/>

p的状态由p1、p2、p3决定，分成两种情况。<br/>
（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。<br/>
（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。<br/>

### Promise.race()
Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。<br/>
```js
const p = Promise.race([p1, p2, p3]);
```
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。<br/>
Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。<br/>
下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。<br/>

### Promise.allSettled()
Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。该方法由 ES2020 引入。<br/>
有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，Promise.allSettled()方法就很有用。如果没有这个方法，想要确保所有操作都结束，就很麻烦。Promise.all()方法无法做到这一点。<br/>

### Promise.any()
Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。该方法目前是一个第三阶段的提案。<br/>
Promise.any()跟Promise.race()方法很像，只有一点不同，就是不会因为某个 Promise 变成rejected状态而结束。<br/>

### Promise.resolve()
有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。<br/>
Promise.resolve方法的参数分成四种情况:<br/>
（1）参数是一个 Promise 实例<br/>
如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。<br/>

（2）参数是一个thenable对象<br/>
thenable对象指的是具有then方法的对象，比如下面这个对象。<br/>
```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```
Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。<br/>
```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```
上面代码中，thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42。<br/><br/>

（3）参数不是具有then方法的对象，或根本就不是对象<br/>
如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。<br/>
```js
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```
上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。<br/><br/>

（4）不带有任何参数<br/>
Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。<br/>
所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。<br/>
```js
const p = Promise.resolve();

p.then(function () {
  // ...
});
```
上面代码的变量p就是一个 Promise 对象。<br/>
需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。<br/>

## 附录：手写Promise
### Promise 的声明
首先呢，promise肯定是一个类，我们就用class来声明。<br/>
由于new Promise((resolve, reject)=>{})，所以传入一个参数（函数），秘籍里叫他executor，传入就执行。<br/>
executor里面有两个参数，一个叫resolve（成功），一个叫reject（失败）。<br/>
由于resolve和reject可执行，所以都是函数，我们用let声明。<br/>
```js
class Promise{
  // 构造器
  constructor(executor){
    // 成功
    let resolve = () => { };
    // 失败
    let reject = () => { };
    // 立即执行
    executor(resolve, reject);
  }
}
```

### 解决基本状态
对Promise有规定：<br/>
Promise存在三个状态（state）pending、fulfilled、rejected<br/>
pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）<br/>
成功时，不可转为其他状态，且必须有一个不可改变的值（value）<br/>
失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）<br/>
new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。<br/>
new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。<br/>
若是executor函数报错 直接执行reject();<br/>

```js
class Promise{
  constructor(executor){
    // 初始化state为等待态
    this.state = 'pending';
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    let resolve = value => {
      // state改变,resolve调用就会失败
      if (this.state === 'pending') {
        // resolve调用后，state转化为成功态
        this.state = 'fulfilled';
        // 储存成功的值
        this.value = value;
      }
    };
    let reject = reason => {
      // state改变,reject调用就会失败
      if (this.state === 'pending') {
        // reject调用后，state转化为失败态
        this.state = 'rejected';
        // 储存失败的原因
        this.reason = reason;
      }
    };
    // 如果executor执行报错，直接执行reject
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
}
```

### then方法
Promise有一个叫做then的方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因<br/><br/>

当状态state为fulfilled，则执行onFulfilled，传入this.value。当状态state为rejected，则执行onRejected，传入this.reason<br/>
onFulfilled,onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，value或reason依次作为他们的第一个参数<br/>

```js
class Promise{
  constructor(executor){...}
  // then 方法 有两个参数onFulfilled onRejected
  then(onFulfilled,onRejected) {
    // 状态为fulfilled，执行onFulfilled，传入成功的值
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    };
    // 状态为rejected，执行onRejected，传入失败的原因
    if (this.state === 'rejected') {
      onRejected(this.reason);
    };
  }
}
```

这下武学初成，可以对付对付江湖小杂毛了，但是对于带setTimeout的江洋大盗还是没辙。<br/>

### 解决异步实现
现在基本可以实现简单的同步代码，但是当resolve在setTomeout内执行，then时state还是pending等待状态 我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们<br/>
类似于发布订阅，先将then里面的两个函数储存起来，由于一个promise可以有多个then，所以存在同一个数组内。<br/>

```js
// 多个then的情况
let p = new Promise();
p.then();
p.then();
```

成功或者失败时，forEach调用它们<br/>

```js
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    };
    if (this.state === 'rejected') {
      onRejected(this.reason);
    };
    // 当状态state为pending时
    if (this.state === 'pending') {
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(()=>{
        onFulfilled(this.value);
      })
      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.reason);
      })
    }
  }
}
```

### 解决链式调用
我门常常用到new Promise().then().then(),这就是链式调用，用来解决回调地狱<br/>
1、为了达成链式，我们默认在第一个then里返回一个promise。秘籍规定了一种方法，就是在then里面返回一个新的promise,称为promise2：promise2 = new Promise((resolve, reject)=>{})<br/><br/>

将这个promise2返回的值传递到下一个then中<br/>
如果返回一个普通的值，则将普通的值传递给下一个then中<br/><br/>

2、当我们在第一个then中return了一个参数（参数未知，需判断）。这个return出来的新的promise就是onFulfilled()或onRejected()的值<br/>
秘籍则规定onFulfilled()或onRejected()的值，即第一个then返回的值，叫做x，判断x的函数叫做resolvePromise<br/><br/>

首先，要看x是不是promise。<br/>
如果是promise，则取它的结果，作为新的promise2成功的结果<br/>
如果是普通值，直接作为promise2成功的结果<br/>
所以要比较x和promise2<br/>
resolvePromise的参数有promise2（默认返回的promise）、x（我们自己return的对象）、resolve、reject<br/>
resolve和reject是promise2的<br/>

```js
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    // 声明返回的promise2
    let promise2 = new Promise((resolve, reject)=>{
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value);
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2, x, resolve, reject);
      };
      if (this.state === 'rejected') {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(()=>{
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        })
        this.onRejectedCallbacks.push(()=>{
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        })
      }
    });
    // 返回promise，完成链式
    return promise2;
  }
}
```

### 完成resolvePromise函数
规定一段代码，让不同的promise代码互相套用，叫做resolvePromise<br/>
如果 x === promise2，则是会造成循环引用，自己等待自己完成，则报“循环引用”错误<br/>

```js
let p = new Promise(resolve => {
  resolve(0);
});
var p2 = p.then(data => {
  // 循环引用，自己等待自己完成，一辈子完不成
  return p2;
})
```

1、判断x<br/><br/>

Otherwise, if x is an object or function,Let then be x.then<br/>
x 不能是null<br/>
x 是普通值 直接resolve(x)<br/>
x 是对象或者函数（包括promise），let then = x.then<br/>
2、当x是对象或者函数（默认promise）<br/><br/>
声明了then<br/>
如果取then报错，则走reject()<br/>
如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调<br/>
如果成功的回调还是pormise，就递归继续解析<br/>
3、成功和失败只能调用一个 所以设定一个called来防止多次调用<br/>

```js
function resolvePromise(promise2, x, resolve, reject){
  // 循环引用报错
  if(x === promise2){
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then;
      // 如果then是函数，就默认是promise了
      if (typeof then === 'function') { 
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(x, y => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          reject(err);// 失败了就失败了
        })
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e); 
    }
  } else {
    resolve(x);
  }
}
```

### 解决其他问题
1、秘籍规定onFulfilled,onRejected都是可选参数，如果他们不是函数，必须被忽略<br/><br/>

onFulfilled返回一个普通的值，成功时直接等于 value => value<br/>
onRejected返回一个普通的值，失败时如果直接等于 value => value，则会跑到下一个then中的onFulfilled中，所以直接扔出一个错误reason => throw err<br/>
2、秘籍规定onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题<br/>
如果onFulfilled或onRejected报错，则直接返回reject()<br/>

```js
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 异步
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        // 异步
        setTimeout(() => {
          // 如果报错
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    // 返回promise，完成链式
    return promise2;
  }
}
```

### 附赠catch和resolve、reject、race、all方法

```js
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    return promise2;
  }
  catch(fn){
    return this.then(null,fn);
  }
}
function resolvePromise(promise2, x, resolve, reject){
  if(x === promise2){
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  let called;
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') { 
        then.call(x, y => {
          if(called)return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if(called)return;
          called = true;
          reject(err);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if(called)return;
      called = true;
      reject(e); 
    }
  } else {
    resolve(x);
  }
}
//resolve方法
Promise.resolve = function(val){
  return new Promise((resolve,reject)=>{
    resolve(val)
  });
}
//reject方法
Promise.reject = function(val){
  return new Promise((resolve,reject)=>{
    reject(val)
  });
}
//race方法 
Promise.race = function(promises){
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(resolve,reject)
    };
  })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function(promises){
  let arr = [];
  let i = 0;
  function processData(index,data){
    arr[index] = data;
    i++;
    if(i == promises.length){
      resolve(arr);
    };
  };
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(data=>{
        processData(i,data);
      },reject);
    };
  });
}
```

### 验证我们的promise是否正确
1、先在后面加上下述代码
2、npm 有一个promises-aplus-tests插件 npm i promises-aplus-tests -g 可以全局安装 mac用户最前面加上sudo
3、命令行 promises-aplus-tests [js文件名] 即可验证

```js
// 目前是通过他测试 他会测试一个对象
// 语法糖
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = Promise;
//npm install promises-aplus-tests 用来测试自己的promise 符不符合promisesA+规范
```

来源：https://juejin.im/post/5b2f02cd5188252b937548ab<br/>
<br/><br/>

## Async / await

### 概念
async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。相较于 Generator，async 函数的改进在于下面四点：<br/>
内置执行器。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，调用方式跟普通函数的调用一样<br/>
更好的语义。async 和 await 相较于 * 和 yield 更加语义化<br/>
更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await 命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）<br/>
返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用<br/>
async是ES7新出的特性，表明当前函数是异步函数，不会阻塞线程导致后续代码停止运行。<br/>
<br/>
简而言之：<br/>
async/await 是异步代码的新方式<br/>
async/await 基于 Promise 实现<br/>
async/await 使得异步代码更像同步代码<br/>
await 只能用在 async 函数中，不能用在普通函数中<br/><br/>

#### async/await 的优势在于处理 then 链：
单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（很有意思，Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）。<br/>

### 用法
async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就会先返回一个 Promise 对象，等到异步操作完成，再接着执行函数体内后面的语句。<br/>

```js
function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}
asyncPrint('hello world', 50);
```

### 错误处理

方法一<br/>
```js
function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
async function asyncPrint(value, ms) {
  await timeout(ms);
  return value
}
asyncPrint('hello world', 5000).then(result=> {
  console.log(result);
}).catch(err=>{
  console.log(err)
})
```

方法二<br/>
```js
function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
async function asyncPrint(value, ms) {
  try{
    await timeout(ms);
    console.log(value)
  }catch(err){
    console.log(err)
  }
  await timeout(ms);
  return value
}
asyncPrint('hello world', 5000)
```

await 后面紧跟着的最好是一个耗时的操作或者是一个异步操作(当然非耗时的操作也可以的，但是就失去意义了)<br/>
如果 await 后面的异步操作出错，那么等同于 async 函数返回的 Promise 对象被 reject<br/>

## callback 与 Promise的区别
js中的callback与promise的区别实际就是宽度和深度的区别<br/><br/>
1. callback函数处理异步：代码逻辑复杂，可读性差----回调地狱；不可return；<br/>
2. promise处理异步：对比callback，易读，可以return，不需要层层传递callback；处理多个异步等待合并<br/>
3. async，await--ES2017 ，promise的语法糖<br/>

## 附录：原生ajax
```js
如何创建Ajax
XMLHttpRequest对象的工作流程
==========兼容性写法===========
var xmlHttp = null;
if(window.XMLHttpRequset) {
	// IE7+,Firefox,Chrome,Safari,Opera
	xmlHttp = new XMLHttpRequset();
}
else {
	// IE5,IE6
	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
}
兼容性处理
事件的触发条件
xmlHttp.onreadystatechange = function() {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		responseText、responseXML
	}
}
事件的触发顺序
======================注意=================
如果是POST请求则需要添加头
xmlHttp.setRequestHeader("Content-type": "application/x-www-form-urlencoded")
```
