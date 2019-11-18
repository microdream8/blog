(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{150:function(e,a,r){"use strict";r.r(a);var t=r(0),l=Object(t.a)({},(function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"webpack随手记"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#webpack随手记"}},[e._v("#")]),e._v(" Webpack随手记")]),e._v(" "),r("blockquote",[r("p",[e._v("本文记录了一些webpack的核心功能，包含名词解释以及使用场景等，欢迎大家补充...")])]),e._v(" "),r("h2",{attrs:{id:"简述下webpack的构建流程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#简述下webpack的构建流程"}},[e._v("#")]),e._v(" 简述下Webpack的构建流程")]),e._v(" "),r("ol",[r("li",[e._v("初始化：启动构建，读取与合并配置参数，加载相应的Plugins，实例化Compiler；")]),e._v(" "),r("li",[e._v("编译：从entry出发，针对每个module串行调用对应的loader去翻译文件内容，再找到该module依赖的module，递归地进行编译处理；")]),e._v(" "),r("li",[e._v("输出：对编译后的module组合成chunk，再把chunk转换成文件，输出到output指定目录下；")])]),e._v(" "),r("h2",{attrs:{id:"tree-shaking的理解"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#tree-shaking的理解"}},[e._v("#")]),e._v(" Tree Shaking的理解")]),e._v(" "),r("blockquote",[r("p",[e._v("你可以将应用程序想象为一棵树。实际使用的源代码和库表示树的绿色活叶，死亡代码代表了被秋天消耗掉的棕色枯叶。为了除掉枯叶，你必须摇动这棵树，使它们落下，这就是所谓的“摇树优化”。")])]),e._v(" "),r("p",[e._v("Webpack4里，配置参数mode为production(即生产环境)时，默认开启了Tree Shaking功能，若值为none则关闭了Tree Shaking。例如值引用了loadsh的isEqual方法，打包时只打引用过的模块。所以，我们为了利用"),r("a",{attrs:{href:"https://webpack.js.org/guides/tree-shaking/#root",target:"_blank",rel:"noopener noreferrer"}},[e._v("Tree Shaking"),r("OutboundLink")],1),e._v("的优势，建议如下：")]),e._v(" "),r("ul",[r("li",[e._v("使用ES2015模块语法（如import 和 export）；")]),e._v(" "),r("li",[e._v("确保没有编译器将ES2015模块语法转换为CommonJS模块（这是流行的babel preset@babel/preset env的默认行为-有关详细信息，"),r("a",{attrs:{href:"https://www.babeljs.cn/docs/babel-preset-env",target:"_blank",rel:"noopener noreferrer"}},[e._v("请参阅文档"),r("OutboundLink")],1),e._v("）；")]),e._v(" "),r("li",[e._v("将”sideEffects“(副作用)属性添加到项目的package.json文件中；")]),e._v(" "),r("li",[e._v("使用生产模式配置选项启用各种优化，包括压缩和Tree Shaking；")])]),e._v(" "),r("h2",{attrs:{id:"scope-hoisting的理解"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#scope-hoisting的理解"}},[e._v("#")]),e._v(" Scope Hoisting的理解")]),e._v(" "),r("blockquote",[r("p",[e._v("原理：将所有模块的代码按照引用顺序放在一个函数作用域里 ，然后适当的重命名一些变量以防止变量名冲突。通过scope hoisting可减少函数声明代码合内存开销。")])]),e._v(" "),r("p",[e._v("如果不开启scope hoisting，会导致大量作用域包裹代码，导致体积增大（模块越多越明显），运行代码时创建的函数作用域变多（大量的IIFE匿名闭包），内存开销大。")]),e._v(" "),r("ul",[r("li",[e._v("Webpack4环境，配置参数mode为production(即生产环境)时，默认开启了scope hoisting功能。")]),e._v(" "),r("li",[e._v("Webpack3环境，需要在plugins里手动配置，"),r("code",[e._v("new webpack.optimize.ModuleConcatenationPlugin()")]),e._v("，会将es6里的import转换成__webpack__require__，export转换成__webpack_exports__。")])]),e._v(" "),r("h2",{attrs:{id:"code-splitting的理解"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#code-splitting的理解"}},[e._v("#")]),e._v(" Code Splitting的理解")]),e._v(" "),r("blockquote",[r("p",[e._v("代码拆分是Webpack最引人注目的特性之一。此功能允许您将代码拆分为各种捆绑包，然后可以按需或并行加载。它可以用来实现更小的捆绑包和控制资源负载优先级，如果正确使用，这会对加载时间产生重大影响。")])]),e._v(" "),r("p",[e._v("有三种通用的代码拆分方法：")]),e._v(" "),r("ol",[r("li",[e._v("入口点：使用入口配置手动拆分代码。")]),e._v(" "),r("li",[e._v("防止重复：使用SplitChunksPlugin来删除和拆分块。")]),e._v(" "),r("li",[e._v("动态导入：通过模块内的内联函数调用拆分代码。")])]),e._v(" "),r("h2",{attrs:{id:"file-loader和url-loader的区别"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#file-loader和url-loader的区别"}},[e._v("#")]),e._v(" file-loader和url-loader的区别")]),e._v(" "),r("blockquote",[r("p",[e._v("url-loader内部使用了file-loader，都可以处理图片和字体，不过url-loader还可以将较小资源转化成base64字符串。")])]),e._v(" "),r("ul",[r("li",[e._v("file-loader：文件加载器将文件的import/require()解析为URL，并将文件发送到输出目录。")]),e._v(" "),r("li",[e._v("url-loader：用于将文件转换为base64 URI的Webpack加载程序。")])]),e._v(" "),r("h2",{attrs:{id:"聊聊热更新的实现"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#聊聊热更新的实现"}},[e._v("#")]),e._v(" 聊聊热更新的实现")]),e._v(" "),r("blockquote",[r("p",[e._v("本话题主要想讲webpack-dev-server 与 hot-module-replacement-plugin之间的关系，需要从两者的功能上来分析说明。")])]),e._v(" "),r("p",[e._v("单独写两个包也是出于功能的解耦来考虑的。简单来说就是：hot-module-replacement-plugin 包给 webpack-dev-server 提供了热更新的能力。")]),e._v(" "),r("ul",[r("li",[e._v("webpack-dev-server(WDS)的功能提供 bundle server的能力，就是生成的 bundle.js 文件可以通过 localhost://xxx 的方式去访问，另外 WDS 也提供 livereload(浏览器的自动刷新)。")]),e._v(" "),r("li",[e._v("hot-module-replacement-plugin 的作用是提供 HMR 的 runtime，并且将 runtime 注入到 bundle.js 代码里面去。一旦磁盘里面的文件修改，那么 HMR server 会将有修改的 js module 信息发送给 HMR runtime，然后 HMR runtime 去局部更新页面的代码。因此这种方式可以不用刷新浏览器。")])]),e._v(" "),r("h2",{attrs:{id:"webpack-dev-server的理解"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#webpack-dev-server的理解"}},[e._v("#")]),e._v(" webpack-dev-server的理解")]),e._v(" "),r("blockquote",[r("p",[e._v("webpack-dev-server 是webpack-dev-middleware的封装版，细聊一下webpack-dev-middleware灵活的场景？")])]),e._v(" "),r("ul",[r("li",[e._v("webpack-dev-server实际上相当于启用了一个express的Http服务器+调用webpack-dev-middleware。它的作用主要是用来伺服资源文件。这个Http服务器和client使用了websocket通讯协议，原始文件作出改动后，webpack-dev-server会用webpack实时的编译，再用webpack-dev-middleware将webpack编译后文件会输出到内存中。适合纯前端项目，很难编写后端服务，进行整合。")]),e._v(" "),r("li",[e._v("webpack-dev-middleware输出的文件存在于内存中。你定义了 webpack.config，webpack 就能据此梳理出entry和output模块的关系脉络，而 webpack-dev-middleware 就在此基础上形成一个文件映射系统，每当应用程序请求一个文件，它匹配到了就把内存中缓存的对应结果以文件的格式返回给你，反之则进入到下一个中间件。")])]),e._v(" "),r("h2",{attrs:{id:"文件名hash值"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#文件名hash值"}},[e._v("#")]),e._v(" 文件名hash值")]),e._v(" "),r("ul",[r("li",[e._v("hash，如果都使用hash的话，因为这是工程级别的，即每次修改任何一个文件，所有文件名的hash至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效。")]),e._v(" "),r("li",[e._v("chunkhash，它可根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响，并且webpack4中支持了异步import功能。")]),e._v(" "),r("li",[e._v("contenthash，它是针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变。")])])])}),[],!1,null,null,null);a.default=l.exports}}]);