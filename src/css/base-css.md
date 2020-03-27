---
title: 'css3知识点汇总'
sidebar: auto
collapsable: true
---
# 图css3知识点汇总


## 浏览器的渲染机制

我们可能都知道浏览器含有一个渲染引擎，用来渲染窗口所展示的内容。默认情况下，渲染引擎可以显示html、xml文档及图片，它也可以借助插件（一种浏览器扩展）显示其他类型数据，例如使用PDF阅读器插件，用于显示PDF格式。但是其具体的渲染原理和流程估计也有很多人都不知道或者不清楚吧。这些天研究了一下浏览器的渲染原理，有了些心得，在这里跟大家分享一下，这里只讨论渲染引擎最主要的用途——显示应用了CSS之后的html及图片。

### 渲染引擎简介
本文所讨论的浏览器——Firefox、Chrome和Safari是基于两种渲染引擎构建的，Firefox使用Geoko——Mozilla自主研发的渲染引擎，Safari和Chrome都使用webkit。

### 渲染主流程

渲染引擎首先通过网络获得所请求文档的内容，通常以8K分块的方式完成。下面是渲染引擎在取得内容之后的基本流程：

解析html以构建dom树 -> 构建render树 -> 布局render树 -> 绘制render树

这里先解释一下几个概念，方便大家理解：

　　DOM Tree：浏览器将HTML解析成树形的数据结构。

　　CSS Rule Tree：浏览器将CSS解析成树形的数据结构。

　　Render Tree: DOM和CSSOM合并后生成Render Tree。

　　layout: 有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系，从而去计算出每个节点在屏幕中的位置。

　　painting: 按照算出来的规则，通过显卡，把内容画到屏幕上。

　　<b>reflow（回流）</b>：当浏览器发现某个部分发生了点变化影响了布局，需要倒回去重新渲染，内行称这个回退的过程叫 reflow。reflow 会从 <html> 这个 root frame 开始递归往下，依次计算所有的结点几何尺寸和位置。reflow 几乎是无法避免的。现在界面上流行的一些效果，比如树状目录的折叠、展开（实质上是元素的显 示与隐藏）等，都将引起浏览器的 reflow。鼠标滑过、点击……只要这些行为引起了页面上某些元素的占位面积、定位方式、边距等属性的变化，都会引起它内部、周围甚至整个页面的重新渲 染。通常我们都无法预估浏览器到底会 reflow 哪一部分的代码，它们都彼此相互影响着。

　　<b>repaint（重绘）</b>：改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分要重画，但是元素的几何尺寸没有变。

::: warning 注意
1. display:none 的节点不会被加入Render Tree，而visibility: hidden 则会，所以，如果某个节点最开始是不显示的，设为display:none是更优的。
2. display:none 会触发 reflow，而 visibility:hidden 只会触发 repaint，因为没有发现位置变化。
3. 有些情况下，比如修改了元素的样式，浏览器并不会立刻reflow 或 repaint 一次，而是会把这样的操作积攒一批，然后做一次 reflow，这又叫异步 reflow 或增量异步 reflow。但是在有些情况下，比如resize 窗口，改变了页面默认的字体等。对于这些操作，浏览器会马上进行 reflow。
:::

来看看webkit的主要流程：

<img src="../imgs/css3/css_1.png" style="width: 80%;">


再来看看Geoko的主要流程：

<img src="../imgs/css3/css_2.jpg" style="width: 80%;">

Gecko 里把格式化好的可视元素称做“帧树”（Frame tree）。每个元素就是一个帧（frame）。 webkit 则使用”渲染树”这个术语，渲染树由”渲染对象”组成。webkit 里使用”layout”表示元素的布局，Gecko则称为”reflow”。Webkit使用”Attachment”来连接DOM节点与可视化信息以构建渲染树。一个非语义上的小差别是Gecko在HTML与DOM树之间有一个附加的层 ，称作”content sink”，是创建DOM对象的工厂。

尽管Webkit与Gecko使用略微不同的术语，这个过程还是基本相同的，如下：

1. 浏览器会将HTML解析成一个DOM树，DOM 树的构建过程是一个深度遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。
2. 将CSS解析成 CSS Rule Tree 。
3. 根据DOM树和CSSOM来构造 Rendering Tree。注意：Rendering Tree 渲染树并不等同于 DOM 树，因为一些像Header或display:none的东西就没必要放在渲染树中了。
4. 有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系。下一步操作称之为layout，顾名思义就是计算出每个节点在屏幕中的位置。
5. 再下一步就是绘制，即遍历render树，并使用UI后端层绘制每个节点。

::: warning 注意
上述这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的html都解析完成之后再去构建和布局render树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。
:::

## 浏览器css的读取规则

最近研究css性能优化，明白了浏览器读取css选择器的顺序是从右到左。但是为什么呢？这就涉及到了浏览器渲染页面的顺序，而关于浏览器的渲染，我们首页要了解浏览器的架构

<img src="../imgs/css3/css_3.png" style="width: 80%;">

如上图所示，浏览器主要由 用户界面（User Interface）, 浏览器引擎(Browser engine), 渲染引擎（Rendering engine), 网络模块(Networking)，js解析器(Javascript Interpreter)，用户界面后台（UI Backend）和数据持久层(Data persistence) 等几部分组成。其中各模块除了Browser engine是用来协调Render engine和UI层（也许还有别的层）的，UI Backend是用来绘制页面上的各个组件的，其它模块的用途都见名知义，所以也就不多说了。

OK,进入正题。从用户在地址栏中输入地址并按下回车，到他看到整个页面的过程大致如下：

1. 用户在浏览器地址栏输入地址，按下回车；
2. 浏览器向服务器发送请求，服务器响应请求并返回数据；（这其中的DNS解析，路由解析，服务器mvc请求分发，连接数据库等一系列操作略过）
3. 浏览器接收服务器传回的html代码，通过词法解析和语法解析生成dom树，生成dom树期间，解析到link标签则去下载相应的css文件，待所有外部css文件下载完成后，结合页面中的style标签和标签行内style样式，生成render树. render树包含了每个dom节点的样式信息（位置，大小，字体，背景等）。
4. 结合dom树和render树绘制页面，如下图所示：

<img src="../imgs/css3/css_4.png" style="width: 80%;">

我们要研究的问题发生在步骤3,构建render树的过程中。

构建render树的过程是遍历dom树, 每次拿出一个dom节点，然后遍历所有的样式规则查找与当前节点匹配的规则，最后将所有匹配的规则中定义的样式写入一个render对象中，再将该render对象挂到render树上（这个render对象和 dom节点会以某种方式建立联接，知道彼此的存在）。

也就是说，每次只有一个dom节点，且该节点标签名称，拥有的class和id等我是已知的，例如<span class="abc" id="demo">，但却可能有成千上万条css规则(这个数量并不夸张)，我们需要从这多的规则中找中符合当前的节点的1条或几条规则(这个数量绝不会很多)。

由于每条规则都可能有多层嵌套，例如 #container p.content  .title a {...}，如果采用从左到右的方式读取css规则，那么大多数规则读到最后会发现是不匹配的，这样会做很多无用功。

而如果采取从右到左的方式，那么只要发现最右边的key selector不匹配，整条规则就都不必再看下去了。例如当前节点是<span class="abc" id="demo">, 那么只有最右端选择器是span或.abc或#demo的css 规则有可能匹配，其它的就可以直接被舍弃了。

根据2009年Google和Firefox的测试，right-to-left方式可以避免70%左右的无效匹配，因此目前主流浏览器都采用这种方式读取css selector(css规则)


