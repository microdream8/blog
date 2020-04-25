(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{286:function(t,v,_){"use strict";_.r(v);var e=_(28),T=Object(e.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"接口请求总结"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#接口请求总结"}},[t._v("#")]),t._v(" 接口请求总结")]),t._v(" "),_("h2",{attrs:{id:"get和post总结"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#get和post总结"}},[t._v("#")]),t._v(" get和post总结")]),t._v(" "),_("h3",{attrs:{id:"get和post两种区别"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#get和post两种区别"}},[t._v("#")]),t._v(" GET和POST两种区别")]),t._v(" "),_("ul",[_("li",[t._v("GET在浏览器回退时是无害的，而POST会再次提交请求。")]),t._v(" "),_("li",[t._v("GET产生的URL地址可以被Bookmark，而POST不可以。")]),t._v(" "),_("li",[t._v("GET请求会被浏览器主动cache等，而POST不会被缓存、保存在服务器日志、以及浏览器浏览记录中，除非手动设置。")]),t._v(" "),_("li",[t._v("GET请求只能进行url编码，而POST支持多种编码方式。")]),t._v(" "),_("li",[t._v("GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。")]),t._v(" "),_("li",[t._v("GET请求在URL中传送的参数是有长度限制的，而POST么有，所以发送的数据更大。")]),t._v(" "),_("li",[t._v("对参数的数据类型，GET只接受ASCII字符，而POST没有限制。")]),t._v(" "),_("li",[t._v("GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。")]),t._v(" "),_("li",[t._v("GET参数通过URL传递，POST放在Request body中。")]),t._v(" "),_("li",[t._v("post比get慢")]),t._v(" "),_("li",[t._v("post用于修改和写入数据，get一般用于搜索排序和筛选之类的操作（淘宝，支付宝的搜索查询都是get提交），目的是资源的获取，读取数据")])]),t._v(" "),_("p",[t._v("现在我们扒下GET和POST的外衣，来一次深入的总结吧！")]),t._v(" "),_("p",[t._v("GET和POST是什么？HTTP协议中的两种发送请求的方法。")]),t._v(" "),_("p",[t._v("HTTP是什么？HTTP是基于TCP/IP的关于数据如何在万维网中如何通信的协议。")]),t._v(" "),_("p",[t._v("HTTP的底层是TCP/IP。所以GET和POST的底层也是TCP/IP，也就是说，GET/POST都是TCP链接。GET和POST能做的事情是一样一样的。你要给GET加上request body，给POST带上url参数，技术上是完全行的通的。")]),t._v(" "),_("p",[t._v("那么，上边罗列的那些区别是怎么回事？")]),t._v(" "),_("p",[t._v("在我大万维网世界中，TCP就像汽车，我们用TCP来运输数据，它很可靠，从来不会发生丢件少件的现象。但是如果路上跑的全是看起来一模一样的汽车，那这个世界看起来是一团混乱，送急件的汽车可能被前面满载货物的汽车拦堵在路上，整个交通系统一定会瘫痪。为了避免这种情况发生，交通规则HTTP诞生了。HTTP给汽车运输设定了好几个服务类别，有GET, POST, PUT, DELETE等等，HTTP规定，当执行GET请求的时候，要给汽车贴上GET的标签（设置method为GET），而且要求把传送的数据放在车顶上（url中）以方便记录。如果是POST请求，就要在车上贴上POST的标签，并把货物放在车厢里。当然，你也可以在GET的时候往车厢内偷偷藏点货物，但是这是很不光彩；也可以在POST的时候在车顶上也放一些数据，让人觉得傻乎乎的。"),_("b",[t._v("HTTP只是个行为准则，而TCP才是GET和POST怎么实现的基本")]),t._v("。")]),t._v(" "),_("p",[t._v("但是，我们只看到HTTP对GET和POST参数的传送渠道（url还是requrest body）提出了要求。上边罗列的区别里关于参数大小的限制又是从哪来的呢？")]),t._v(" "),_("p",[t._v("在我大万维网世界中，还有另一个重要的角色：运输公司。不同的浏览器（发起http请求）和服务器（接受http请求）就是不同的运输公司。 虽然理论上，你可以在车顶上无限的堆货物（url中无限加参数）。但是运输公司可不傻，装货和卸货也是有很大成本的，他们会限制单次运输量来控制风险，数据量太大对浏览器和服务器都是很大负担。业界不成文的规定是，（大多数）浏览器通常都会限制url长度在2K个字节，而（大多数）服务器最多处理64K大小的url。超过的部分，恕不处理。如果你用GET服务，在request body偷偷藏了数据，不同服务器的处理方式也是不同的，有些服务器会帮你卸货，读出数据，有些服务器直接忽略，所以，虽然GET可以带request body，也不能保证一定能被接收到哦。")]),t._v(" "),_("p",[t._v("好了，现在你知道，GET和POST本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。")]),t._v(" "),_("p",[t._v("GET和POST还有一个重大区别，简单的说：")]),t._v(" "),_("p",[_("b",[t._v("GET产生一个TCP数据包；POST产生两个TCP数据包")]),t._v("。")]),t._v(" "),_("p",[t._v("总结来说：")]),t._v(" "),_("p",[t._v("对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；")]),t._v(" "),_("p",[t._v("而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。")]),t._v(" "),_("p",[t._v("也就是说，GET只需要汽车跑一趟就把货送到了，而POST得跑两趟，第一趟，先去和服务器打个招呼“嗨，我等下要送一批货来，你们打开门迎接我”，然后再回头把货送过去。")]),t._v(" "),_("p",[t._v("总之，请求过程大致如下：")]),t._v(" "),_("p",[t._v("post请求的过程：")]),t._v(" "),_("ol",[_("li",[t._v("浏览器请求tcp连接（第一次握手）")]),t._v(" "),_("li",[t._v("服务器答应进行tcp连接（第二次握手）")]),t._v(" "),_("li",[t._v("浏览器确认，并发送post请求头（第三次握手，这个报文比较小，所以http会在此时进行第一次数据发送）")]),t._v(" "),_("li",[t._v("服务器返回100 Continue响应")]),t._v(" "),_("li",[t._v("浏览器发送数据")]),t._v(" "),_("li",[t._v("服务器返回200 OK响应")])]),t._v(" "),_("p",[t._v("get请求的过程：")]),t._v(" "),_("ol",[_("li",[t._v("浏览器请求tcp连接（第一次握手）")]),t._v(" "),_("li",[t._v("服务器答应进行tcp连接（第二次握手）")]),t._v(" "),_("li",[t._v("浏览器确认，并发送get请求头和数据（第三次握手，这个报文比较小，所以http会在此时进行第一次数据发送）")]),t._v(" "),_("li",[t._v("服务器返回200 OK响应\n也就是说，目测get的总耗是post的2/3左右，这个口说无凭，网上已经有网友进行过测试。")])]),t._v(" "),_("p",[t._v("另外，post请求包含更多的请求头，因为post需要在请求的body部分包含数据，所以会多了几个数据描述部分的首部字段（如：content-type）,但这种影响其实是微乎其微的")]),t._v(" "),_("p",[t._v("因为POST需要两步，时间上消耗的要多一点，看起来GET比POST更有效。因此Yahoo团队有推荐用GET替换POST来优化网站性能。但这是一个坑！跳入需谨慎。为什么？")]),t._v(" "),_("ol",[_("li",[t._v("GET与POST都有自己的语义，不能随便混用。")]),t._v(" "),_("li",[t._v("据研究，在网络环境好的情况下，发一次包的时间和发两次包的时间差别基本可以无视。而在网络环境差的情况下，两次包的TCP在验证数据包完整性上，有非常大的优点。")]),t._v(" "),_("li",[t._v("并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次。")])]),t._v(" "),_("p",[t._v("其次，对上边说的，get会将数据缓存起来，而post不会，为什么呢？")]),t._v(" "),_("p",[t._v("可以做个简短的测试，使用ajax采用get方式请求静态数据（比如html页面，图片）的时候，如果两次传输的数据相同，第二次以后消耗的时间将会在10ms以内（chrome测试），而post每次消耗的时间都差不多。经测试，chrome和firefox下如果检测到get请求的是静态资源，则会缓存，如果是数据，则不会缓存，但是IE什么都会缓存起来，当然，应该没有人用post去获取静态数据吧，反正我是没见过。")]),t._v(" "),_("p",[t._v("还有，post不能进行管道化传输")]),t._v(" "),_("p",[t._v("http权威指南中是这样说的：http的一次会话需要先建立tcp连接（大部分是tcp，但是其他安全协议也是可以的），然后才能通信，如果 每次连接都只进行一次http会话，那这个连接过程占的比例太大了！于是出现了持久连接：在http/1.0+中是connection首部中添加keep-alive值，在http/1.1中是在connection首部中添加persistent值，当然两者不仅仅是命名上的差别，http/1.1中，持久连接是默认的，除非显示在connection中添加close，否则持久连接不会关闭，而http/1.0+中则恰好相反，除非显示在connection首部中添加keep-alive，否则在接收数据包后连接就断开了。\n出现了持久连接还不够，在http/1.1中，还有一种称为管道通信的方式进行速度优化：把需要发送到服务器上的所有请求放到输出队列中，在第一个请求发送出去后，不等到收到服务器的应答，第二个请求紧接着就发送出去，但是这样的方式有一个问题：不安全，如果一个管道中有10个连接，在发送出9个后，突然服务器告诉你，连接关闭了，此时客户端即使收到了前9个请求的答复，也会将这9个请求的内容清空，也就是说，白忙活了……此时，客户端的这9个请求需要重新发送。这对于幂等请求还好（比如get，多发送几次都没关系，每次都是相同的结果），如果是post这样的非幂等请求（比如支付的时候，多发送几次就惨了），肯定是行不通的。")]),t._v(" "),_("p",[t._v("所以，post请求不能通过管道的方式进行通信！很有可能，post请求需要重新建立连接，这个过程不跟完全没优化的时候一样了么？所以，在可以使用get请求通信的时候，不要使用post请求，这样用户体验会更好，当然，如果有安全性要求的话，post会更好。管道化传输在浏览器端的实现还需考证，貌似默认情况下大部分浏览器（除了opera）是不进行管道化传输的，除非手动开启！")]),t._v(" "),_("p",[t._v("总体总结：")]),t._v(" "),_("p",[t._v("get传参最大长度的理解误区")]),t._v(" "),_("ol",[_("li",[t._v("总结")])]),t._v(" "),_("ul",[_("li",[t._v("http协议并未规定get和post的长度限制")]),t._v(" "),_("li",[t._v("get的最大长度限制是因为浏览器和web服务器限制了URL的长度")]),t._v(" "),_("li",[t._v("不同的浏览器和web服务器，限制的最大长度不一样")]),t._v(" "),_("li",[t._v("要支持IE，则最大长度为2083byte，若支持Chrome，则最大长度8182byte")])]),t._v(" "),_("ol",{attrs:{start:"2"}},[_("li",[t._v("误解")])]),t._v(" "),_("ul",[_("li",[t._v("首先即使get有长度限制，也是限制的整个URL的长度，而不仅仅是参数值数据长度，http协议从未规定get/post的请求长度限制是多少")]),t._v(" "),_("li",[t._v("所谓的请求长度限制是由浏览器和web服务器决定和设置的，各种浏览器和web服务器的设定均不一样，这依赖于各个浏览器厂家的规定或者可以根据web服务器的处理能力来设定。IE 和 Safari 浏览器 限制 2k，Opera 限制4k，Firefox 限制 8k（非常老的版本 256byte），如果超出了最大长度，大部分的服务器直接截断，也有一些服务器会报414错误。")])]),t._v(" "),_("ol",{attrs:{start:"3"}},[_("li",[t._v("各个浏览器和web服务器的最大长度总结")])]),t._v(" "),_("p",[t._v("浏览器")]),t._v(" "),_("ul",[_("li",[t._v("IE：IE浏览器（Microsoft Internet Explorer） 对url长度限制是2083（2K+53），超过这个限制，则自动截断（若是form提交则提交按钮不起作用）。")]),t._v(" "),_("li",[t._v("firefox：firefox（火狐浏览器）的url长度限制为 65536字符，但实际上有效的URL最大长度不少于100,000个字符。")]),t._v(" "),_("li",[t._v("chrome：chrome（谷歌）的url长度限制超过8182个字符返回本文开头时列出的错误。")]),t._v(" "),_("li",[t._v("Safari：Safari的url长度限制至少为 80 000 字符。")]),t._v(" "),_("li",[t._v("Opera：Opera 浏览器的url长度限制为190 000 字符。Opera9 地址栏中输入190000字符时依然能正常编辑。")])]),t._v(" "),_("p",[t._v("服务器")]),t._v(" "),_("ul",[_("li",[t._v("Apache：Apache能接受url长度限制为8 192 字符")]),t._v(" "),_("li",[t._v("IIS：Microsoft Internet Information Server(IIS)能接受url长度限制为16384个字符。这个是可以通过修改的（IIS7）\nconfiguration/system.webServer/security/requestFiltering/requestLimits@maxQueryStringsetting.")])])])}),[],!1,null,null,null);v.default=T.exports}}]);