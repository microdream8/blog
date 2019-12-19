# webpack学习-许荻

## 基础学习
>本质：现代 JavaScript 应用程序的静态模块打包器(module bundler)

### 核心概念
#### 入口：
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

例子：
```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

#### 出口：
output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程。

例子：
```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```
output.filename：告诉 webpack bundle 的名称</br>
output.path：想要 bundle 生成(emit)到哪里。

#### loader
loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）</br>
>webpack 的配置中 loader 有两个目标：</br>
>test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。</br>
>use 属性，表示进行转换时，应该使用哪个 loader。

例子
```javascript
const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
// 嘿，webpack 编译器，当你碰到「在 require()/import 语句中
// 被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。
```

#### 插件
loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。
>想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。<br>
>多数插件可以通过选项(option)自定义。<br>
>你也可以在一个配置文件中因为不同目的而多次使用同一个插件，<br>这时需要通过使用 new 操作符来创建它的一个实例。

例子：
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

## 深入学习
- [文章借鉴](https://www.jianshu.com/p/080e18fcf0e3)
- [资源借鉴](https://github.com/ruanyf/webpack-demos)

## 深入研究