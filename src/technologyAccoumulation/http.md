---
title: 'http相关知识点'
sidebar: auto
collapsable: true
---

# http相关知识点

### HTTP和HTTPS的基本概念
HTTP：是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。<br/>
HTTPS：是以安全为目标的HTTP通道，简单讲是HTTP的安全版，即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。<br/>
HTTPS协议的主要作用可以分为两种：一种是建立一个信息安全通道，来保证数据传输的安全；另一种就是确认网站的真实性。<br/>

### HTTP与HTTPS有什么区别？
HTTP协议传输的数据都是未加密的，也就是明文的，因此使用HTTP协议传输隐私信息非常不安全，为了保证这些隐私数据能加密传输，于是网景公司设计了SSL（Secure Sockets Layer）协议用于对HTTP协议传输的数据进行加密，从而就诞生了HTTPS。简单来说，HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全。<br/>
HTTPS和HTTP的区别主要如下：<br/>
1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。<br/>
2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。<br/>
3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。<br/>
4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。<br/>

### HTTP请求包含哪几个部分
#### 请求报文（请求行/请求头/请求数据/空行）
1. 请求行
求方法字段、URL字段和HTTP协议版本
例如：GET /index.html HTTP/1.1
get方法将数据拼接在url后面，传递参数受限
2. 请求方法：
GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE、CONNECT
3. 请求头：
a. Host (主机和端口号)
b. Connection (链接类型)
c. Upgrade-Insecure-Requests (升级为 HTTPS 请求)
d. User-Agent (浏览器名称)
e. Accept (传输文件类型)
f. Referer (页面跳转处)
g. Accept-Encoding（文件编解码格式）
h. Cookie （Cookie）
i. x-requested-with :XMLHttpRequest (是 Ajax 异步请求)
4. 请求数据
post方法中，会把数据以key value形式发送请求
5. 空行
发送回车符和换行符，通知服务器以下不再有请求头
#### 响应报文
1. 状态行
2. 消息报头
3. 响应正文

### 一次完整的HTTP请求过程
1. 域名解析
2. 发起TCP的3次握手
3. 建立TCP连接后发起http请求
4. 服务器响应http请求，浏览器得到html代码
5. 浏览器解析html代码，并请求html代码中的资源（如js、css、图片等）
6. 浏览器对页面进行渲染呈现给用户

### 从输入url到显示页面，经历了什么
1. 首先，在浏览器地址栏中输入url。
2. 浏览器先查看浏览器缓存-系统缓存-路由器缓存，如果缓存中有，会直接在屏幕中显示页面内容。若没有，则跳到第三步操作。
3. 在发送http请求前，需要域名解析(DNS解析)(DNS（域名系统，Domain Name System）是互联网的一项核心服务，它作为可以将域名和IP地址相互映射的一个分布式数据库，能够使人更方便的访问互联网，而不用去记住IP地址。)，解析获取相应的IP地址。
4. 浏览器向服务器发起tcp连接，与浏览器建立tcp三次握手。（TCP即传输控制协议。TCP连接是互联网连接协议集的一种。）
5. 握手成功后，浏览器向服务器发送http请求，请求数据包。
6. 服务器处理收到的请求，将数据返回至浏览器。
7. 浏览器收到HTTP响应。
8. 读取页面内容，浏览器渲染，解析html源码。
9. 生成Dom树、解析css样式、js交互。
10. 客户端和服务器交互。
11. ajax查询。

### http1.1时如何复用tcp连接
在HTTP 1.0中，客户端的每一个HTTP请求都必须通过独立的TCP连接进行处理，而在HTTP 1.1中，对这种方式进行了改进。客户端可以在一个TCP连接中发送多个HTTP请求，这种技术叫做HTTP复用（HTTP Multiplexing）。它与TCP连接复用最根本的区别在于，TCP连接复用是将多个客户端的HTTP请求复用到一个服务器端TCP连接上，而HTTP复用则是一个客户端的多个HTTP请求通过一个TCP连接进行处理。前者是负载均衡设备的独特功能；而后者是HTTP 1.1协议所支持的新功能，目前被大多数浏览器所支持。<br/>

### 常见状态码
1. 1XX：通知<br/>
2. 2XX: 成功<br/>
3. 3XX 重定向<br/>
4. 4XX：客户端错误<br/>
5. 5XX 服务端错误<br/>
<br/>
200 OK：表示从客户端发送给服务器的请求被正常处理并返回；<br/>
204 No Content：表示客户端发送给客户端的请求得到了成功处理，但在返回的响应报文中不含实体的主体部分（没有资源可以返回）；<br/>
206 Patial Content：表示客户端进行了范围请求，并且服务器成功执行了这部分的GET请求，响应报文中包含由Content-Range指定范围的实体内容。<br/>
<br/>
301 Moved Permanently：永久性重定向，表示请求的资源被分配了新的URL，之后应使用更改的URL；<br/>
302 Found：临时性重定向，表示请求的资源被分配了新的URL，希望本次访问使用新的URL；<br/>
301与302的区别：前者是永久移动，后者是临时移动（之后可能还会更改URL）<br/>
303 See Other：表示请求的资源被分配了新的URL，应使用GET方法定向获取请求的资源；<br/>
302与303的区别：后者明确表示客户端应当采用GET方式获取资源<br/>
304 Not Modified：表示客户端发送附带条件（是指采用GET方法的请求报文中包含if-Match、If-Modified-Since、If-None-Match、If-Range、If-Unmodified-Since中任一首部）的请求时，服务器端允许访问资源，但是请求为满足条件的情况下返回改状态码；<br/>
307 Temporary Redirect：临时重定向，与303有着相同的含义，307会遵照浏览器标准不会从POST变成GET；（不同浏览器可能会出现不同的情况）；<br/>
<br/>
400 Bad Request：表示请求报文中存在语法错误；<br/>
401 Unauthorized：未经许可，需要通过HTTP认证；<br/>
403 Forbidden：服务器拒绝该次访问（访问权限出现问题）<br/>
404 Not Found：表示服务器上无法找到请求的资源，除此之外，也可以在服务器拒绝请求但不想给拒绝原因时使用；<br/>
<br/>
500 Inter Server Error：表示服务器在执行请求时发生了错误，也有可能是web应用存在的bug或某些临时的错误时；<br/>
503 Server Unavailable：表示服务器暂时处于超负载或正在进行停机维护，无法处理请求；<br/>
