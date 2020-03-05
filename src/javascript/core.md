---
title: '跨域相关'
sidebar: auto
collapsable: true
---
# 跨域相关知识点总结

## 什么是跨域

在了解跨域之前，首先要知道什么是同源策略（same-origin policy）。简单来讲同源策略就是浏览器为了保证用户信息的安全，防止恶意的网站窃取数据，禁止不同域之间的JS进行交互。对于浏览器而言只要域名、协议、端口其中一个不同就会引发同源策略，从而限制他们之间如下的交互行为：<br/><br/>

1. Cookie、LocalStorage和IndexDB无法读取；<br/>
2. DOM无法获得；<br/>
3. AJAX请求不能发送。<br/>

## 为什么浏览器要限制跨域访问

原因就是安全问题：如果一个网页可以随意地访问另外一个网站的资源，那么就有可能在客户完全不知情的情况下出现安全问题。比如下面的操作就有安全问题：<br/>

1. 用户访问www.mybank.com，登陆并进行网银操作，这时cookie啥的都生成并存放在浏览器；<br/>
2. 用户突然想起件事，并迷迷糊糊的访问了一个邪恶的网站www.xiee.com；<br/>
3. 这时该网站就可以在它的页面中，拿到银行的cookie，比如用户名，登陆token等，然后发起对www.mybank.com的操作；<br/>
4. 如果这时浏览器不予限制，并且银行也没有做响应的安全处理的话，那么用户的信息有可能就这么泄露了。<br/>

## 解决跨域问题的方法

### 跨域资源共享（CORS）

CORS（Cross-Origin Resource Sharing）跨域资源共享，定义了必须在访问跨域资源时，浏览器与服务器应该如何沟通。CORS背后的基本思想就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是失败。<br/>
服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。<br/>
只需要在后台中加上响应头来允许域请求！在被请求的Response header中加入以下设置，就可以实现跨域访问了！<br/>
如下所示：<br/>
```js
//指定允许其他域名访问
'Access-Control-Allow-Origin:*'//或指定域名（若用* 安全性低且不能携带cookie;若指定域名：则只能指定一个）
//响应类型
'Access-Control-Allow-Methods:GET,POST'
//响应头设置
'Access-Control-Allow-Headers:x-requested-with,content-type'
```

### 通过jsonp跨域
JSONP由两部分组成：回调函数和数据。回调函数是当响应到来时应该在页面中调用的函数，而数据就是传入回调函数中的JSON数据。<br/><br/>

JSONP的原理：通过script标签引入一个js文件，这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。所以jsonp是需要服务器端的页面进行相应的配合的。（即用JavaScript动态加载一个script文件，同时定义一个callback函数给script执行而已。）<br/><br/>

在js中，我们直接用XMLHttpRequest请求不同域上的数据时，是不可以的。但是，在页面上引入不同域上的js脚本文件却是可以的，jsonp正是利用这个特性来实现的。 例如：有个a.html页面，它里面的代码需要利用ajax获取一个不同域上的json数据，假设这个json数据地址是http://example.com/data.php，那么a.html中的代码就可以这样：<br/>

```js
​<script type="text/javascript">
    function dosomething(jsondata){
        //处理获得的json数据
    }
</script>
<script src="http://example.com/data.php?callback=dosomething"></script>
```
js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。所以jsonp是需要服务器端的页面进行相应的配合的。<br/>
如果你的页面使用jquery，那么通过它封装的方法就能很方便的来进行jsonp操作了。jquery会自动生成一个全局函数来替换callback=?中的问号，之后获取到数据后又会自动销毁，实际上就是起一个临时代理函数的作用。$.getJSON方法会自动判断是否跨域，不跨域的话，就调用普通的ajax方法；跨域的话，则会以异步加载js文件的形式来调用jsonp的回调函数。<br/>

```js
​<script type="text/javascript">
    $.getJSON('http://example.com/data.php?callback=?,function(jsondata)'){
        //处理获得的json数据
    });
</script>
```
JSONP的优缺点：<br/>

JSONP的优点是：它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制；它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持；并且在请求完毕后可以通过调用callback的方式回传结果。<br/>
JSONP的缺点则是：它只支持GET请求而不支持POST等其它类型的HTTP请求；它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题。<br/><br/>
CORS和JSONP对比：<br/>
CORS与JSONP相比，无疑更为先进、方便和可靠。<br/>
（1）JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求；<br/>
（2）使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得说句，比起JSONP有更好的错误处理；<br/>
（3）JSONP主要被老的浏览器支持，它们往往不支持CORS，而绝大多数现代浏览器都已经支持了CORS；<br/>

### 通过修改document.domain来跨子域
上面的jsonp是来解决ajax跨域请求的，那么如果是需要处理 Cookie 和 iframe 该怎么办呢？这时候就可以通过修改document.domain来跨子域。两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置document.domain共享 Cookie或者处理iframe。比如A网页是http://w1.example.com/a.html，B网页是http://w2.example.com/b.html，那么只要设置相同的document.domain，两个网页就可以共享Cookie。

```js
document.domain = 'example.com';
//现在，A网页通过脚本设置一个 Cookie。
document.cookie = "test1=hello";
//B网页就可以读到这个 Cookie。
var allCookie = document.cookie;
```

注意，这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexDB 无法通过这种方法，规避同源政策，而要使用下文介绍的PostMessage API。<br/> 
另外，服务器也可以在设置Cookie的时候，指定Cookie的所属域名为一级域名，比如.example.com。

```js
Set-Cookie: key=value; domain=.example.com; path=/
//这样的话，二级域名和三级域名不用做任何设置，都可以读取这个Cookie。
```

不同的iframe 之间（父子或同辈），是能够获取到彼此的window对象的，但是你却不能使用获取到的window对象的属性和方法(html5中的postMessage方法是一个例外，还有些浏览器比如ie6也可以使用top、parent等少数几个属性)，总之，你可以当做是只能获取到一个几乎无用的window对象。 <br/>
首先说明一下同域之间的iframe是可以操作的。比如http://127.0.0.1/JSONP/a.html里面嵌入一个iframe指向http://127.0.0.1/myPHP/b.html。那么在a.html里面是可以操作iframe里面的DOM的。<br/>

```js
<iframe src="http://127.0.0.1/myPHP/b.html" frameborder="1"></iframe>
<body>
<script type="text/javascript">
var iframe = document.querySelector("iframe");
iframe.onload = function(){
    var win = iframe.contentWindow;
    var doc = win.document;
    var ele = doc.querySelector(".text1");
    var text = ele.innerHTML="123456";
}
</script>
```

如果两个网页不同源，就无法拿到对方的DOM。典型的例子是iframe窗口和window.open方法打开的窗口，它们与父窗口无法通信。如果两个窗口一级域名相同，只是二级域名不同，那么document.domain属性，就可以规避同源政策，拿到DOM。<br/>

### 使用window.name来进行跨域

window对象有个name属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。这个属性的最大特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。 
比如：有一个页面a.html,它里面有这样的代码：<br/>

```js
window.name = "我是a页面设置的";
setTimeout(function(){
    window.location = "http://127.0.0.1/JSONP/b.html";
},1000)
```

b.html页面的代码：<br/>

```js
​console.log(window.name);
```

a.html页面载入后1秒，跳转到了b.html页面，结果b页面打印出了：<br/>

```js
我是a页面设置的
```

可以看到在b.html页面上成功获取到了它的上一个页面a.html给window.name设置的值。如果在之后所有载入的页面都没对window.name进行修改的话，那么所有这些页面获取到的window.name的值都是a.html页面设置的那个值。当然，如果有需要，其中的任何一个页面都可以对window.name的值进行修改。注意，window.name的值只能是字符串的形式，这个字符串的大小最大能允许2M左右甚至更大的一个容量，具体取决于不同的浏览器，但一般是够用了。 <br/>
利用window.name可以对同域或者不同域的之间的js进行交互。 <br/>
那么在a.html页面中，我们怎么把b.html页面载入进来呢？显然我们不能直接在a.html页面中通过改变window.location来载入b.html页面，因为我们想要即使a.html页面不跳转也能得到b.html里的数据。答案就是在a.html页面中使用一个隐藏的iframe来充当一个中间人角色，由iframe去获取b.html的数据，然后a.html再去得到iframe获取到的数据。<br/>

### 使用HTML5的window.postMessage方法跨域

上面两种方法都属于破解，HTML5为了解决这个问题，引入了一个全新的API：跨文档通信 API（Cross-document messaging）。 <br/>
这个API为window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。目前IE8+、FireFox、Chrome、Opera等浏览器都已经支持window.postMessage方法。 
举例来说，父窗口http://a.com向子窗口http://b.com发消息，调用postMessage方法就可以了。 <br/>
a页面：

```js
<iframe id="frame1" src="http://127.0.0.1/JSONP/b.html" frameborder="1"></iframe>
document.getElementById('frame1').onload = function(){
    var win = document.getElementById('frame1').contentWindow;
    win.postMessage("我是来自a页面的","http://127.0.0.1/JSONP/b.html")
}
```

b页面通过监听message事件可以接受到来自a页面的消息。<br/>

```js
window.onmessage = function(e){
    e = e || event;
    console.log(e.data);//我是来自a页面的
}
```

子窗口向父窗口发送消息的写法类似。<br/>

```js
window.opener.postMessage('我是来自b页面的', 'http://a.com');
//父窗口和子窗口都可以通过message事件，监听对方的消息。
```

通过window.postMessage，读写其他窗口的 LocalStorage 也成为了可能。 <br/>
下面是一个例子，主窗口写入iframe子窗口的localStorage。 <br/>
父窗口发送消息代码：<br/>

```js
var win = document.getElementsByTagName('iframe')[0].contentWindow;
var obj = { name: 'Jack' };
// 存入对象
win.postMessage(JSON.stringify({key: 'storage', method: 'set', data: obj}), 'http://b.com');
// 读取对象
win.postMessage(JSON.stringify({key: 'storage', method: "get"}), "*");
window.onmessage = function(e) {
  if (e.origin != 'http://a.com') return;
  // "Jack"
  console.log(JSON.parse(e.data).name);
};
```

子窗口接收消息的代码：<br/>

```js
window.onmessage = function(e) {
  if (e.origin !== 'http://bbb.com') return;
  var payload = JSON.parse(e.data);
  switch (payload.method) {
    case 'set':
      localStorage.setItem(payload.key, JSON.stringify(payload.data));
      break;
    case 'get':
      var parent = window.parent;
      var data = localStorage.getItem(payload.key);
      parent.postMessage(data, 'http://aaa.com');
      break;
    case 'remove':
      localStorage.removeItem(payload.key);
      break;
  }
};
```

### 通过WebSocket进行跨域

web sockets是一种浏览器的API，它的目标是在一个单独的持久连接上提供全双工、双向通信。(同源策略对web sockets不适用)<br/>
web sockets原理：在js创建了web socket之后，会有一个HTTP请求发送到浏览器以发起连接。取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为web sockt协议。<br/>
只有在支持web socket协议的服务器上才能正常工作。<br/>

```js
var socket = new WebSockt('ws://www.baidu.com');//http->ws; https->wss
socket.send('hello WebSockt');
socket.onmessage = function(event){
    var data = event.data;
}
```

### 图像ping（单向）

什么是图像ping：  图像ping是与服务器进行简单、单向的跨域通信的一种方式，请求的数据是通过查询字符串的形式发送的，而相应可以是任意内容，但通常是像素图或204相应（No Content）。 图像ping有两个主要缺点：首先就是只能发送get请求，其次就是无法访问服务器的响应文本。<br/>
使用方法：<br/>

```js
var img = new Image();
img.onload = img.onerror = function(){
alert("done!");
};
img.src = "https://raw.githubusercontent.com/zhangmengxue/Todo-List/master/me.jpg";
document.body.insertBefore(img,document.body.firstChild);
```

然后页面上就可以显示我放在我的github上某个地方的照片啦。<br/>
与<img>类似的可以跨域内嵌资源的还有:<br/>
(1)<script src=""></script>标签嵌入跨域脚本。语法错误信息只能在同源脚本中捕捉到。上面jsonp也用到了呢。<br/>
(2) <link src="">标签嵌入CSS。由于CSS的松散的语法规则，CSS的跨域需要一个设置正确的Content-Type消息头。不同浏览器有不同的限制： IE, Firefox, Chrome, Safari (跳至CVE-2010-0051)部分 和 Opera。<br/>
(3)<video> 和 <audio>嵌入多媒体资源。<br/>
(4)<object>, <embed> 和 <applet>的插件。<br/>
(5)@font-face引入的字体。一些浏览器允许跨域字体（ cross-origin fonts），一些需要同源字体（same-origin fonts）。<br/>
(6) <frame> 和 <iframe>载入的任何资源。站点可以使用X-Frame-Options消息头来阻止这种形式的跨域交互。<br/>

### 使用片段识别符来进行跨域

片段标识符（fragment identifier）指的是，URL的#号后面的部分，比如http://example.com/x.html#flag的#flag。如果只是改变片段标识符，页面不会重新刷新。<br/>
父窗口可以把信息，写入子窗口的片段标识符。在父窗口写入：<br/>

```js
document.getElementById('frame').onload = function(){
    var src = "http://127.0.0.1/JSONP/b.html" + '#' + "data";
    this.src = src;
}
```

子窗口通过监听hashchange事件得到通知。<br/>

```js
window.onload = function(){
    console.log("b.html加载完成")
    window.onhashchange = function(){
        var message = window.location.hash;
        console.log(message)//#data
    };  
}
```

同样的，子窗口也可以改变父窗口的片段标识符。<br/>

```js
parent.location.href= target + "#" + hash;
```

