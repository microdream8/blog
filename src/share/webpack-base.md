---
title: 'webpack入门'
sidebar: auto
collapsable: true
---
# webpack入门

## 什么是WebPack，为什么要使用它？

### 什么是Webpack

WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。<br/>

#### 构成
1. entry 入口
2. output 出口
3. loaders 转化器
4. plugins 插件
5. devServer 开发服务器
6. mode

demo核心代码：

```js
const path = require('path'); 
var webpack = require("webpack");
const config = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name]-[hash:8].js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.html/, use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/index.html'
        })
    ]
}
module.exports = config;
```

### 为什要使用WebPack

现今的很多网页其实可以看做是功能丰富的应用，它们拥有着复杂的JavaScript代码和一大堆依赖包。为了简化开发的复杂度，前端社区涌现出了很多好的实践方法.<br/>

模块化，让我们可以把复杂的程序细化为小的文件;<br/>
类似于TypeScript这种在JavaScript基础上拓展的开发语言：使我们能够实现目前版本的JavaScript不能直接使用的特性，并且之后还能转换为JavaScript文件使浏览器可以识别；<br/>
Scss，less等CSS预处理器<br/>
...<br/><br/>
总结为：
1. 打包（把多个文件打包成一个js文件，较少的服务器压力、带宽）
2. 转化（比如less、sass、ts）需要loader
3. 优化（SPA越来越盛行，前端项目复杂度高，webpack可以对项目进行优化）

这些改进确实大大的提高了我们的开发效率，但是利用它们开发的文件往往需要进行额外的处理才能让浏览器识别,而手动处理又是非常繁琐的，这就为WebPack类的工具的出现提供了需求。<br/>


### WebPack和Grunt以及Gulp相比有什么特性

其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。<br/>

Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，工具之后可以自动替你完成这些任务。<br/>

Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。<br/>

如果实在要把二者进行比较，Webpack的处理速度更快更直接，能打包更多不同类型的文件。<br/>

## webpack常用知识点

### webpack的打包原理

1. 识别入口文件
2. 通过逐层识别模块依赖（Commonjs、amd或者es6的import，webpack都会对其进行分析，来获取代码的依赖）
3. webpack 做的就是分析代码、转换代码、编译代码、输出代码
4. 最终形成打包后的代码

### loader和plugin的区别

#### 什么是loader
loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
1. 处理一个文件可以使用多个loader,loader的执行顺序和配置中的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行
2. 第一个执行的loader接收源文件内容作为参数，其它loader接收前一个执行的loader的返回值作为参数，最后执行的loader会返回此模块的JavaScript源码

#### 什么是plugin

在webpack运行的生命周期中会广播出许多时间，plugin可以监听这些事件，在合适的时机通过webpack提供的API改变输出结果。

#### loader和plugin的区别
对于loader，它是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，这里操作的是文件，比如将A.scss转换为A.css，单纯的文件转换过程。
loader 用于加载某些资源文件。 因为webpack 本身只能打包commonjs规范的js文件，对于其他资源例如 css，图片，或者其他的语法集，比如 jsx， coffee，是没有办法加载的。 这就需要对应的loader将资源转化，加载进来。从字面意思也能看出，loader是用于加载的，它作用于一个个文件上。

plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。
plugin 用于扩展webpack的功能。它直接作用于 webpack，扩展了它的功能。当然loader也时变相的扩展了 webpack ，但是它只专注于转化文件（transform）这一个领域。而plugin的功能更加的丰富，而不仅局限于资源的加载。

简而言之：loader 用于加载待打包的资源，plugin 用于扩展 webpack。

```js
class MyPlugin{
    constructor(options){
        console.log("MyPlugin constructor:", options);
    }
    apply(compiler){
        compiler.plugin("compilation", compilation => {
            console.log("MyPlugin");
        });
    }
}
module.exports = MyPlugin;
 
webpack.config.js配置：
module.exports = {
    ...
    plugins: [
        new MyPlugin({param: "my plugin"})
    ]
}
```
使用该plugin后，执行的顺序：
1. webpack启动后，在读取配置的过程中会执行new MyPlugin(options)初始化一个MyPlugin获取其实例
2. 在初始化compiler对象后，就会通过compiler.plugin(事件名称，回调函数)监听到webpack广播出来的事件
3. 并且可以通过compiler对象去操作webpack

## 常用的loader和plugins

### 常用的loader

1. 模板<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(1)html-loader:将HTML文件导出编译为字符串，可供js识别的其中一个模块<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(2)pug-loader : 加载pug模板<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(3)jade-loader : 加载jade模板(是pug的前身，由于商标问题改名为pug)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(4)ejs-loader : 加载ejs模板<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(5)handlebars-loader : 将Handlebars模板转移为HTML<br/>

2. 样式<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(1)css-loader : 解析css文件中代码<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(2)style-loader : 将css模块作为样式导出到DOM中<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(3)less-loader : 加载和转义less文件<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(4)sass-loader : 加载和转义sass/scss文件<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(5)postcss-loader : 使用postcss加载和转义css/sss文件<br/>

3. 脚本转换编译<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(1)script-loader : 在全局上下文中执行一次javascript文件，不需要解析<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(2)babel-loader : 加载ES6+ 代码后使用Babel转义为ES5后浏览器才能解析<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(3)typescript-loader : 加载Typescript脚本文件<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(4)coffee-loader : 加载Coffeescript脚本文件<br/>

4. JSON加载<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(1)json-loader : 加载json文件（默认包含）<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(2)json5-loader : 加载和转义JSON5文件<br/>

5. Files文件<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(1)raw-loader : 加载文件原始内容(utf-8格式)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(2)url-loader : 多数用于加载图片资源,超过文件大小显示则返回data URL<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(3)file-loader : 将文件发送到输出的文件夹并返回URL(相对路径)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(4)jshint-loader : 检查代码格式错误<br/>

6. 加载框架<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(1)vue-loader : 加载和转义vue组件<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(2)angualr2-template--loader : 加载和转义angular组件<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(3)react-hot-loader : 动态刷新和转义react组件中修改的部分,基于webpack-dev-server插件需先安装,然后在webpack.config.js中引用react-hot-loader<br/>

### 常用的plugin

1. copy-webpack-plugin：复制文件到目标文件夹。在开发时使用热模替换，（没有生成dist 文件夹，都在内存中），如果想引用某一个js文件，直接写script标签是找不到的，因为服务器内存中没有这个文件。所以复制这个文件，到dist中。
2. compression-webpack-plugin： 生产环境时可选择让代码压缩gzip.
3. html-webpack-plugin: 生成index.html 并自动注入打包后的js css 等
4. webpack.DefinePlugin： 可以生成配置常量。编译时就有的常量。
5. extract-text-webpack-plugin： 提取使用文件的css 组成一个或多个css 文件。
6. webpack.optimize.CommonsChunkPlugin： 让多个出口文件组成一个文件
7. webpack-dev-server: 开发时使用，静态服务器，并且有热替换等功能。
8. uglifyjs-webpack-plugin： 删除警告，压缩代码等。

## webpack打包流程

### 总述
webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。 插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。<br/>
webpack 通过 Tapable 来组织这条复杂的生产线。 webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。 webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。 --吴浩麟《深入浅出webpack》

### 构建流程
webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：
1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。


## webpack小知识点

### webpack里配置sass
1. 步骤一：安装依赖包
```js
cnpm i node-sass sass-loader -D
```
2. 步骤二：打开webpack.base.config.js在loaders里面加：
```js
{
  test: /\.scss$/,
  loaders: ["style", "css", "sass"]
}
```
3. 在组件里这样写：
```html
<style lang="scss" scoped></style>
```

### webpack分包（业务模块分开打包）

比如现在有三个js文件（login.js,main.js,reg.js）
先来说下统一打包：
只需要修改webpack的配置文件webpack.config.js:

```js
// entry是入口文件，可以多个，代表要编译那些js
entry:['./src/main.js','./src/login.js','./src/reg.js'],
```
这样就可以全部打包，最终生成./build/js/build.js

那么我们最后想生成不同的文件，该如何做呢？<br/>
今天我们就要用到webpack的模块拆分插件

```js
entry:
{
  'main':'./src/main.js',
  'user':['./src/login.js','./src/reg.js']
},
```
拆分模块：login.js和reg.js我们都定义给user节点，那么下面我们就来把这个user节点单独打包，核心代码：

```js
// 拆分插件
new webpack.optimize.CommonsChunkPlugin({
  name: 'user',  // 上面入口定义的节点组
  filename: 'build-user.js'  // 最后生成的文件名
})
```

webpack.config.js全部代码：

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    // entry是入口文件，可以多个，代表要编译那些js
    //entry:['./src/main.js','./src/login.js','./src/reg.js'],

    entry:
    {
        'main':'./src/main.js',
        'user':['./src/login.js','./src/reg.js']
    },

    output:{
        path: __dirname+'/build/js', // 输出到那个目录下（__dirname当前项目目录）
        filename:'build.js' //最终打包生产的文件名
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: __dirname+'/build/html/login-build.html',
            template:__dirname+'/src/tpl/login.html',
            inject:'head',
            hash:true
        }),

        // 拆分插件
        new webpack.optimize.CommonsChunkPlugin({
            name:'user', // 上面入口定义的节点组
            filename:'build-user.js' //最后生成的文件名
        }),
    ]
};
```

### webpack插件编写

- [如何编写插件 ](https://zhuanlan.zhihu.com/p/94577244)

### webpack-dev-server

webpack-dev-server是webpack官方提供的一个小型Express服务器。使用它可以为webpack打包生成的资源文件提供web服务。

<b>webpack-dev-server 主要提供两个功能：</b>

1. 为静态文件提供web服务
2. 自动刷新和热替换(HMR)
自动刷新指当修改代码时webpack会进行自动编译，更新网页内容

<b>自动刷新和热更新</b><br/>
webpack-dev-server为了方便开发，提供了自动刷新机制，自动刷新就是在客户端利用socket监听来自服务端的消息，例如文件改动了，服务器会先打包，在内存中生成了新的bundle.js后，告诉客户端：嘿，该刷新了！然后客户端就reload页面。<br/>
自动刷新模式虽然可以每次刷新页面，但是对于一个大型项目还是比较麻烦的，因此有了热更新，热更新只是更新模块，不更新整个页面。


## 开始使用Webpack

初步了解了Webpack工作方式后，我们一步步的开始学习使用Webpack。<br/>

### 安装

Webpack可以使用npm安装，新建一个空的练习文件夹（此处命名为webpack-demo），在终端中转到该文件夹后执行下述指令就可以完成安装。<br/>
```js
//全局安装
npm init -y
npm install webpack webpack-cli --save-dev
```
<br/>

创建相应对目录结构：

```js
webpack-demo
  dist
    index.html
  node_modules(默认生成)
  src
    index.js
  package.json(默认生成)
```

在index.html的body里定义相应代码

```html
<div id="root"></div>
<script type="text/javascript" src="bundle.js"></script>
```

在src/index.js里定义相应代码

```js
var oRoot = document.querySelector('#root');
oRoot.innerHTML = 'hello world';
```

接下来就需要将src/index.js 打包到 dist文件夹里并命名为 bundle.js，即在命令行输入以下代码：

```js
webpack src/index.js --output dist/bundle.js
```

运行，在浏览器查看，成功。

但是我们每次都需要在控制台输入上边一大行代码，这是我们不希望看到到，所以我们最要创建一个配置文件，将上边的代码配置上去，即：
webpack.config.js  webpack的配置文件（创建在项目的根目录）

webpack采用comment规范，首先需要整体导出一个模块，然后把整体需要的模块添加上去，基本模块如下：

```js
module.exports = {
  // 入口配置,里边可以放数组可以放名字
  entry: {},
  // 出口配置
  output: {},
  // module.rules
  // loaders
  module: {},
  // 插件
  plugins: [],
  // 开发服务器
  devServer: {},
}
```
但现在，我们只需要配置入口和出口就可以了：

```js
module.exports = {
  // 入口配置
  entry: {
    a: './src/index.js', // a是随便起的名字
  },
  // 出口配置
  output: {
    // filename: './dist/bundle.js'  //filename是默认的
    filename: '/bundle.js'  //filename是默认的
  },
}
```

现在在终端运行 webpack 发现是可以的，但是现在我们发现了一个问题，那就是入口配置全部路径，出口只配置了名字的相对路径，感觉不好，所以我们需要进行相应的修改：

```js
module.exports = {
  // 入口配置
  entry: {
    a: './src/index.js', // a是随便起的名字
  },
  // 出口配置
  output: {
    // filename: './dist/bundle.js'  //filename是默认的
    path: __dirname + '/dist',  // path必须是绝对路径（__dirname是项目的绝对路径）
    filename: '/bundle.js'  //filename是默认的
  },
}
```

现在在终端运行 webpack 发现也是可以的，但是这种写法不常见，所以我们也要改成常见的：

```js
const path = require('path'); // 头部引用path 在output输出时候用

module.exports = {
  // 入口配置
  entry: {
    a: './src/index.js', // a是随便起的名字
  },
  // 出口配置
  output: {
    // filename: './dist/bundle.js'  //filename是默认的
    path: path.resolve(__dirname, 'dist'),  // path 是node系统模块，需要我们在头部引用下，.resolve相当于合并的意思， 注意：dist前不用\
    filename: '/bundle.js'  //filename是默认的
  },
}
```

现在感觉就完美了。

但是话又说回来了，我们的配置文件只能叫webpack.config.js吗，显然是否定的，比如我们把名字改成gxl.config.js,运行 webpack 发现生成的是main.js，而不是bundle.js，所以就需要我们在控制台输入的名利改成：

```js
webpack --config gxl.config.js
```

当我们在终端运行时，发现输入的命令和平时不一样，因为平时无非就是输入以下两种代码：

```js
npm run dev
npm run build
```

我们也想这么做，比如我想输入的是npm run build,那么我就需要在<b>package.json文件的scripts里输入之前的终端命令，键名就是'build'，同理，如果要运行'npm run dev'就是 'div'</b>，详细如下：

```js
scripts: {
  'build': 'webpack', // 或 webpack --config gxl.config.js
}
```

一切都挺好，但是控制台总是报警告，我们需要添加相应的开发模式

```js
webpack --mode development  //开发
webpack --mode production  //生产
```

上边的几乎就是完美的，但是这只是最简单的情况，实际开发中，总会出现多入口（多文件）打包一起的情况，所以现在我们在src里再创建一个文件index2.js,然后再修改entry入口如下：

```js
entry: ['./src/index.js', './src/index2.js']  //这是按照顺序从左到右进行打包的
```

上边的代码运行‘cnpm run build’发现是可以的，但是显示情况下也会出现<b>‘多入口对多出口’</b>的情况，所以我们也需要支持下：

入口需要都有对应的名字的，之前数组的模式是没有名字的，所以我们需要用对象的键值对的方式重写下：

```js
entry: {
  index: './src/index.js',
  index2: './src/index2.js'
}
```

现在再运行程序发现报错了，可能是因为程序预感到了我们要多入口，多出口了吧，所以我们要进行多出口处理，进行动态前缀的修改，代码如下：

```js
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].bundle.js'
}
```

运行一切正常，这是需要将html中的script标签修改下，就可以了，简直完美极了！

但是回过头再想一想，我们这一次还是需要手动去修改html中的script标签，所以我们应该把它整成动态的。
现在有一个<b>html-webpack-plugin</b>插件(注意：该插件依赖webpack插件，需要安装，本文起初就已经安装了)，是用于生成动态页面的，这个不是webpack自带的，所以我们需要安装一下

1. 安装

```js
cnpm i html-webpack-plugin -D
```

2. 引入

```js
const HtmlWebpackPlugin = reuqire('html-webpack-plugin');

plugins: [
  new HtmlWebpackPlugin()
]
```

运行成功，dist文件至此可以动态生成了。下面我们可以讲讲这个插件的一些基本配置，比如说一些模板。
模板就是我们平时开发时的一些东西，下面我们在src文件夹下创建一个index.html文件,然后进行基本配置：

```js
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]
```

也可以给html添加动态title,代码如下：

```js
plugins: [
  new HtmlWebpackPlugin({
    title: 'XXX',
    template: './src/index.html'
  })
]
```

然后在html中进行配置：

```html
<title><%= htmlWebpackPlugin.options.title %></title>
```

我们生成的链接可能有缓存，所以可以进行基本的配置，代码如下：

```js
plugins: [
  new HtmlWebpackPlugin({
    hash: true,
    title: 'XXX',
    template: './src/index.html'
  })
]
```

上线时，我们需要对html进行压缩输出，配置如下：

```js
plugins: [
  new HtmlWebpackPlugin({
    minify: {
      collapseWhitespace: true
    },
    hash: true,
    title: 'XXX',
    template: './src/index.html'
  })
]
```

支持多页面应用

因为输出对名字默认都是index.html，所以如果不起一个名字，创建再多的HtmlWebpackPlugin模版都会只输出一个页面，所以每一个页面模板都要起一个名字filename，表示输出的名字

```js
plugins: [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    minify: {
      collapseWhitespace: true
    },
    hash: true,
    title: 'XXX',
    template: './src/index.html'
  }),
  new HtmlWebpackPlugin({
    filename: 'index2.html',
    title: '页面2',
    template: './src/index.html'
  }),
]
```

现在我们需要将定义的两个js分别引入到各自的html上，即多页面分别引入自己的js，所以我们需要在各自的模板上通过<b>chunks['引入的js名称']</b>来引入自己的js，整体代码如下：

```js
plugins: [
  new HtmlWebpackPlugin({
    chunks: ['index'],
    filename: 'index.html',
    minify: {
      collapseWhitespace: true
    },
    hash: true,
    title: 'XXX',
    template: './src/index.html'
  }),
  new HtmlWebpackPlugin({
    chunks: ['index2'],
    filename: 'index2.html',
    title: '页面2',
    template: './src/index.html'
  }),
]
```

我们注意到，每次重新运行的时候，都要先删除dist文件夹，这是不合理的，每次运行都应该自动先删除，我们需要一个小模块来解决这个问题：
clean-webpack-plugin： 删除某些东西

1. 安装

```js
cnpm i clean-webpack-plugin -D
```

2. 定义

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


plugins: [
  // new CleanWebpackPlugin(['dist'])
  new CleanWebpackPlugin()  // 括号里 ['dist']不用写
]
```

-------------------------------------
我们也要想正常的脚手架项目，运行后自动打开浏览器，这样会感觉挺爽的，这个功能涉及到devServer，下面我们来实现下：

1. 我们需要安装一个插件：

```js
cnpm i webpack-dev-server -D
```

2. 使用
  
```js
devServer: {
  // 设置服务器访问的基本目录
  contentBase: path.resolve(__dirname, 'dist'),
  // 服务器ip地址，localhost
  host: 'localhost',
  // 设置端口号
  port: 8980
}
```

我们现在想 npm run dev  来启动项目，所以我们添加package.json里的配置：
  
```js
"dev": "webpack-dev-server --mode development"
```

下面我们支持自动打开浏览器：

```js
// 方法一：
devServer: {
  // 设置服务器访问的基本目录
  contentBase: path.resolve(__dirname, 'dist'),
  // 服务器ip地址，localhost
  host: 'localhost',
  // 设置端口号
  port: 8980,
  open: true,  // 支持自动打开浏览器
}

// 方法二：
"dev": "webpack-dev-server --open --mode development"
```

支持热更新：

```js
const webpack = require('webpack');  // 头部引入

hot: true  // devServer对象里添加

plugins: [
  new webpack.HotModuleRelplacementPlugin()  // 在plugin 上添加热更新插件
]


// 方法一：
devServer: {
  // 设置服务器访问的基本目录
  contentBase: path.resolve(__dirname, 'dist'),
  // 服务器ip地址，localhost
  host: 'localhost',
  // 设置端口号
  port: 8980,
  open: true,  // 支持自动打开浏览器
}

// 方法二：
"dev": "webpack-dev-server --open --mode development"
```


下面我们来讲讲loders(加载器，转化器)
#### 处理css文件
1. 我们需要安装两个loader:

```js
cnpm i style-loader css-loader -D
```

2. 配置

```js
module: {
  rules: [
    {
      test: /\.css/,  // 处理以.css结束的文件
      use: ['style-loader', 'css-loader'],  // 与下一行作用相同 （顺序不能变，现有cssloader,然后再插入到styleloader里）
      // loader: ['style-loader', 'css-loader'],  // 与上一行作用相同
    }
  ]
}
```

3. 在js中引入css文件

#### 处理图片文件
1. 安装loader

```js
cnpm i file-loader url-loader -D
```

2. 配置

```js
module: {
  rules: [
    {
      test: /\.css/,  // 处理以.css结束的文件
      use: ['style-loader', 'css-loader'],  // 与下一行作用相同 （顺序不能变，现有cssloader,然后再插入到styleloader里）
      // loader: ['style-loader', 'css-loader'],  // 与上一行作用相同
    },
    {
      test: /\.(png|jpg|gif)/,
      use: [{
        loader: 'url-loader',
        options: {
          // 因为图片会默认转换成base64,有时候我们并不需要转，例如图片比较大的，所以我们可以设置临界值，超过了就用正常路径
          limit: 1
        }
      }]
    }
  ]
}
```

#### 分包（分离css文件）

1. 安装插件

```js
cnpm i extract-text-webpack-plugin -D
```

2. 引入

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// 放到插件里
new ExtractTextPlugin('./css/index.css')

// 重新修改module对象中对css 对rule
module: {
  rules: [
    {
      test: /\.css/,  // 处理以.css结束的文件
      // use: ['style-loader', 'css-loader'],  // 与下一行作用相同 （顺序不能变，现有cssloader,然后再插入到styleloader里）
      // // loader: ['style-loader', 'css-loader'],  // 与上一行作用相同
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }
  ]
}
```
运行对时候报错，是因为该插件版本低，更新一下版本即可：

```js
cnpm i extract-text-webpack-plugin@next -D
```



























