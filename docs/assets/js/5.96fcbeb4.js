(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{138:function(t,s,a){t.exports=a.p+"assets/img/2.b28f90ea.png"},139:function(t,s,a){t.exports=a.p+"assets/img/3.5b63916e.png"},140:function(t,s,a){t.exports=a.p+"assets/img/4.5f2be91e.png"},141:function(t,s,a){t.exports=a.p+"assets/img/5.5a32ac31.png"},142:function(t,s,a){t.exports=a.p+"assets/img/6.49059ad5.png"},172:function(t,s,a){"use strict";a.r(s);var n=a(0),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"移动端性能优化总结（一）"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#移动端性能优化总结（一）"}},[t._v("#")]),t._v(" 移动端性能优化总结（一）")]),t._v(" "),n("p",[t._v("过去一段时间我参与了移动端的开发，遇到了许多与性能优化方面的问题，遂做了详细的总结。")]),t._v(" "),n("h2",{attrs:{id:"优化网页加载速度"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#优化网页加载速度"}},[t._v("#")]),t._v(" 优化网页加载速度")]),t._v(" "),n("p",[t._v("像我们最近做的各种落地页无论是设计还是内容都追求高品质，于是丰富的图文混合成了标配：顶部的banner图，课程介绍的配图，有趣的gif图等等。"),n("br"),t._v("\n特别严重的时候，一篇文章有十多个gif图，加载花费的时间10-20秒之长，加载消耗的流量几十M之多，严重影响了用户体验！尤其是Mobile端，一寸流量一寸金；3-5s打不开页面，用户都会直接逃离。所以网页加载速度优化势在必行！")]),t._v(" "),n("p",[n("b",[t._v("我们都知道一个网页的加载流程大致如下：")]),n("br"),t._v("\n1、解析HTML结构。"),n("br"),t._v("\n2、加载外部脚本和样式表文件。"),n("br"),t._v("\n3、解析并执行脚本代码。// 部分脚本会阻塞页面的加载"),n("br"),t._v("\n4、DOM树构建完成。//DOMContentLoaded 事件"),n("br"),t._v("\n5、加载图片等外部文件。"),n("br"),t._v("\n6、页面加载完毕。//load 事件"),n("br"),t._v("\n一句话就是：请求HTML，然后顺带将HTML依赖的JS/CSS/iconfont等其他资源一并请求过来。"),n("br"),t._v("\n那么优化网页的加载速度，最本质的方式就是："),n("b",[t._v("减少请求数量 与 减小请求大小")]),t._v("。"),n("br")]),t._v(" "),n("p",[n("b",[t._v("减小请求数量")]),n("br"),t._v("\n1、将小图标合并成sprite图或者iconfont字体文件"),n("br"),t._v("\n2、用base64减少不必要的网络请求"),n("br"),t._v("\n3、图片延迟加载"),n("br"),t._v("\n4、JS/CSS按需打包"),n("br"),t._v("\n5、延迟加载ga统计"),n("br"),t._v("\n6、等等..."),n("br")]),t._v(" "),n("p",[n("b",[t._v("减小请求大小")]),n("br"),t._v("\n1、JS/CSS/HTML压缩"),n("br"),t._v("\n2、gzip压缩"),n("br"),t._v("\n3、JS/CSS按需加载"),n("br"),t._v("\n4、图片压缩，jpg优化"),n("br"),t._v("\n5、webp优化 & srcset优化"),n("br"),t._v("\n6、等等..."),n("br")]),t._v(" "),n("p",[t._v("JS/CSS按需打包 和 JS/CSS按需加载是两个不同的概念："),n("br"),t._v("\nJS/CSS按需打包是预编译发生的事情，保证只打包当前页面相关的逻辑。"),n("br"),t._v("\nJS/CSS按需加载是运行时发生的事情，保证只加载当前页面第一时间使用到的逻辑。"),n("br")]),t._v(" "),n("p",[t._v("接下来我们将结合两个本质的优化方式介绍具体的实践方法。")]),t._v(" "),n("h3",{attrs:{id:"如何减少请求数量？"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#如何减少请求数量？"}},[t._v("#")]),t._v(" 如何减少请求数量？")]),t._v(" "),n("h3",{attrs:{id:"_1-合并图标，减少网络请求"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-合并图标，减少网络请求"}},[t._v("#")]),t._v(" 1.合并图标，减少网络请求")]),t._v(" "),n("p",[t._v("合并图标是减少网络请求的常见的优化手段，网页中的小图标特征是体积小、数量多，而浏览器同时发起的并行请求数量又是有限制的，所以这些小图标会严重的影响网页的加载速度，阻碍关键内容的请求和呈现.")]),t._v(" "),n("p",[n("b",[t._v("sprite图")]),n("br"),t._v("\n合并sprite图是慢工细活儿，并没有特别大的技术含量，但却是每个前端开发都必须掌握的技术。"),n("br"),t._v("\n刚入门的前端直接手动切图拼图即可。"),n("br"),t._v("\n经验丰富的前端可以尝试利用构建工具实现自动化，推荐使用。"),n("b",[t._v("gulp.spritesmith")]),t._v("插件。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 构建视图文件")]),t._v("\ngulp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("task")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sprites'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" spriteData "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" gulp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("src")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("config"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("pipe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("plumber")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("handleErrors"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("pipe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("newer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("config"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("imgDest"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("pipe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("logger")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" showChange"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("pipe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("spritesmith")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            cssName"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sprites.css'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            imgName"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sprites.png'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            cssTemplate"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" path"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./gulp/lib/template.css.handlebars'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" imgStream "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" spriteData"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("img\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("pipe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("buffer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("pipe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("gulp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("dest")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("config"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("imgDest"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" cssStream "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" spriteData"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("css\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("pipe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("gulp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("dest")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("config"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cssDest"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("merge")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("imgStream"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" cssStream"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[t._v("sprite图不适合无线端的响应式场景，所以越来越作为一个备用方案。")]),t._v(" "),n("p",[n("b",[t._v("iconfont字体文件")]),n("br"),t._v("\niconfont字体文件是用字体编码的形式来实现图标效果，既然是文字，那就可以随意设置颜色设置大小，相对来说比sprite方案更好。但是它只适用于纯色图标。推荐使用 "),n("b",[t._v("阿里巴巴矢量图标库")])]),t._v(" "),n("h3",{attrs:{id:"_2-用base64减少不必要的网络请求"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-用base64减少不必要的网络请求"}},[t._v("#")]),t._v(" 2.用base64减少不必要的网络请求")]),t._v(" "),n("p",[n("img",{staticStyle:{width:"80%"},attrs:{src:a(138)}}),n("br")]),t._v(" "),n("p",[t._v("上文提到的sprite图和iconfont字体文件，对于有些场景并不适合，比如："),n("br"),t._v("\n1、小背景图，无法放到精灵图中，通常循环平铺小块来设置大背景。"),n("br"),t._v("\n2、小gif图，无法放到精灵图中，发请求又太浪费。"),n("br")]),t._v(" "),n("p",[n("img",{staticStyle:{width:"80%"},attrs:{src:a(139)}}),n("br")]),t._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),n("p",[t._v("cssnano压缩css的时候，对于部分规则的base64 uri不能识别，会出现误伤，如下图，cssnano压缩的时候会将压缩为：\n"),n("img",{staticStyle:{width:"90%"},attrs:{src:a(140)}}),n("br")])]),t._v(" "),n("p",[t._v("原因是：cssnano会跳过data:image/data:application后面的字符串，但是不会跳过data:img，所以如果你使用的工具生成的是data:img，建议换工具或者直接将其修改为data:image。")]),t._v(" "),n("h4",{attrs:{id:"_3-图片延迟加载"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-图片延迟加载"}},[t._v("#")]),t._v(" 3.图片延迟加载")]),t._v(" "),n("p",[t._v("图片是网页中流量占比最多的部分，也是需要重点优化的部分。"),n("br"),t._v("\n图片延迟加载的原理就是先不设置img的src属性，等合适的时机（比如滚动、滑动、出现在视窗内等）再把图片真实url放到img的src属性上。"),n("br")]),t._v(" "),n("p",[n("b",[t._v("固定宽高值的图片")]),t._v("\n固定宽高值的图片延迟加载比较简单，因为宽高值都可以设置在css中，只需考虑src的替换问题，推荐使用"),n("a",[t._v("lazysizes")]),t._v("。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 引入js文件")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lazysizes.min.js"')]),t._v(" async"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 非响应式 例子")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("img src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"image.jpg"')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lazyload"')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 响应式 例子，自动计算合适的图片")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("img\n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("sizes"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"auto"')]),t._v("\n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"image2.jpg"')]),t._v("\n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("srcset"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v('"image1'),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jpg "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("300")]),t._v("w"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    image2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jpg "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("600")]),t._v("w"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    image3"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jpg "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("900")]),t._v("w"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('" class="')]),t._v('lazyload" '),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// iframe 例子")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("iframe frameborder"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0"')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lazyload"')]),t._v("\n    allowfullscreen"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"//www.youtube.com/embed/ZfV-aYdU4uE"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("iframe"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),n("p",[t._v("注意：浏览器解析img标签的时候，如果src属性为空，浏览器会认为这个图片是坏掉的图，会显示出图片的边框，影响市容。")])]),t._v(" "),n("br"),t._v(" "),n("img",{staticStyle:{width:"90%"},attrs:{src:a(141)}}),n("br"),t._v(" "),n("p",[t._v("lazysizes延迟加载过程中会改变图片的class：默认lazyload，加载中lazyloading，加载结束：lazyloaded。结合这个特性我们有两种解决上述问题办法："),n("br"),t._v("\n1、设置opacity:0，然后在显示的时候设置opacity:1。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 渐现 lazyload")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lazyload"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lazyloading"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    opacity"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lazyloaded"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    opacity"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    transition"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" opacity "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),t._v("ms"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//加上transition就可以实现渐现的效果")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("2、用一张默认的图占位，比如1x1的透明图或者灰图。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("img "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lazyload"')]),t._v(" \n    src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v('"data'),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("image"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("gif"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("base64"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("R0lGODlhAQABAAA\n       AACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v('" \n    data'),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"真实url"')]),t._v(" \n    alt"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<%= article.title %>"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),n("p",[t._v("此外，为了让效果更佳，尤其是文章详情页中的大图，我们可以加上loading效果。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("article"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("detail"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("bd "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lazyload "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        opacity"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lazyloading "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        opacity"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        background"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #f7f7f7 "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("url")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("images"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("loading"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("gif"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" no"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("repeat center"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("固定宽高比的图片"),n("br")]),t._v(" "),n("p",[t._v("固定宽高比的图片延迟加载相对来说复杂很多，比如文章详情页的图片，由于设备的宽度值不确定，所以高度值也不确定，这时候工作的重心反倒放到了如何确定图片的高度上。"),n("br"),t._v("\n为什么要确定图片的高度呢？因为单个图片的加载是从上往下，所以会导致页面抖动，不仅用户体验很差，而且对于性能消耗很大，因为每次抖动都会触发reflow（重绘）事件。"),n("br"),t._v("\n固定宽高比的图片抖动问题，有下列两种主流的方式可以解决："),n("br"),t._v("\n1、第一种方案使用padding-top或者padding-bottom来实现固定宽高比。优点是纯CSS方案，缺点是HTML冗余，并且对输出到第三方不友好。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div style"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"padding-top:75%"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("img data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" alt"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lazyload"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),n("p",[t._v("2、第二种方案在页面初始化阶段利用ratio设置实际宽高值，优点是html干净，对输出到第三方友好，缺点是依赖js，理论上会至少抖动一次。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("img data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" alt"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lazyload"')]),t._v(" data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("ratio"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.75"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),n("p",[t._v('那么，这个padding-top: 75%;和data-ratio="0.75"的数据从哪儿来呢？在你上传图片的时候，需要后台给你返回原始宽高值，计算得到宽高比，然后保存到data-ratio上。\n我们的落地页采用的第二种方案，主要在于第一种方案对第三方输出不友好：需要对img设置额外的样式，但第三方平台通常不允许引入外部样式。\n确定第二种方案之后，我们定义了一个设置图片高度的函数：')]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 重置图片高度，仅限文章详情页")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("resetImgHeight")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("els"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" placeholder")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" ratio "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        i"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" len"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" width"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" len "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" els"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" len"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        els"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" placeholder"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        width "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" els"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientWidth"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//一定要使用clientWidth")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("els"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("attributes"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'data-ratio'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            ratio "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" els"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("attributes"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'data-ratio'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            ratio "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseFloat")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ratio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ratio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            els"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("height "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("width "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" ratio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("我们将以上代码的定义和调用都直接放到了HTML中，就为了一个目的，第一时间计算图片的高度值，降低用户感知到页面抖动的可能性，保证最佳效果。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 原生代码")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("img alt"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" \n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("ratio"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.562500"')]),t._v(" \n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("format"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"jpeg"')]),t._v(" \n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lazyload"')]),t._v(" \n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://img.qdaily.com/uploads/20160807124000WFJNyGam85slTC4H.jpg"')]),t._v(" \n    src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 解析之后的代码")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("img alt"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" \n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("ratio"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.562500"')]),t._v(" \n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("format"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"jpeg"')]),t._v(" \n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lazyloaded"')]),t._v(" \n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://img.qdaily.com/uploads/20160807124000WFJNyGam85slTC4H.jpg"')]),t._v(" \n    src"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://img.qdaily.com/uploads/20160807124000WFJNyGam85slTC4H.jpg"')]),t._v(" \n    style"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"height: 323.438px;"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),n("p",[t._v("我们不仅保存了宽高比，还保存了图片格式，是为了后期可以对gif做进一步的优化。")]),t._v(" "),n("p",[n("b",[t._v("注意事项")]),t._v("\n1、避免图片过早加载，把临界值调低一点。在实际项目中，并不需要过早就把图片请求过来，尤其是Mobile项目，过早请求不仅浪费流量，也会因为请求太多，导致页面加载速度变慢。\n2、为了最好的防抖效果，设置图片高度的JS代码内嵌到HTML中以便第一时间执行。\n3、根据图片宽度设置高度时，使用clientWidth而不是width。这是因为Safari中，第一时间执行的JS代码获取图片的width失败，所以使用clientWidth解决这个问题。")]),t._v(" "),n("h3",{attrs:{id:"_4、js-css按需打包"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4、js-css按需打包"}},[t._v("#")]),t._v(" 4、JS/CSS按需打包")]),t._v(" "),n("p",[t._v("按需打包是webpack独特的优势，如果有需要通过此种方式来管理模块之间的依赖关系，强烈推荐引入！webpack门槛较高，可以自己私下好好研究下。\n我们原来的项目是典型的多页应用，为了缓存通用代码，我们使用webpack按需打包的同时，还利用webpack的CommonsChunkPlugin 插件抽离出公用的JS/CSS代码，便于缓存，在请求数量和公用代码的缓存之间做了一个很好的平衡。")]),t._v(" "),n("h3",{attrs:{id:"_5、延迟加载ga统计"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5、延迟加载ga统计"}},[t._v("#")]),t._v(" 5、延迟加载ga统计")]),t._v(" "),n("p",[n("b",[t._v("async & defer属性")])]),t._v(" "),n("p",[t._v("html5中给script标签引入了async和defer属性。\n带有async属性的script标签，会在浏览器解析时立即下载脚本同时不阻塞后续的document渲染和script加载等事件，从而实现脚本的异步加载。\n带有defer属性的script标签，和async拥有类似的功能。并且他们有可以附带一个onload事件"),n("script",{attrs:{src:"",defer:"",onload:"init()"}},[t._v('。\nasync和defer的区别在于：async属性会在脚本下载完成后无序立即执行，defer属性会在脚本下载完成后按照document结构顺序执行。\n由于defer和async的兼容性问题，我们通常使用动态创建script标签的方式来实现异步加载脚本，即document.write(\'<script src="" async>')]),t._v("');，该方式也可以避免阻塞。")]),t._v(" "),n("p",[n("b",[t._v("ga统计代码")])]),t._v(" "),n("p",[t._v("ga统计代码采用就是动态创建script标签方案。\n该方法不阻塞页面渲染，不阻塞后续请求，但会阻塞window.onload事件，页面的表现方式是进度条一直加载或loading菊花一直转。\n所以我们延迟执行ga初始化代码，将其放到window.onload函数中去执行，可以防止ga脚本阻塞window.onload事件。从而让用户感受到更快的加载速度。")]),t._v(" "),n("img",{staticStyle:{width:"80%"},attrs:{src:a(142)}})])}),[],!1,null,null,null);s.default=r.exports}}]);