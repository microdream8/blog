---
title: '基于webpack从0配置vue开发'
sidebar: auto
collapsable: true
---

# 基于webpack从0配置vue开发
vue 官方为了让开发者快速进行开发，为了很大的精力，提供了vue-cli脚手架，只需简单几步，就能开始vue的开发了。

然而，对项目里的webpack封装和配置了解的不清楚，就容易导致出问题不知如何解决，甚至不会通过webpack去扩展新功能，对webpack+vue项目究竟是怎样搭建起来的感到一脸懵逼。

本文就是要解决这个问题。

## 初始化项目：
打开terminal，通过以下命令生成项目目录：
```
mkdir vue_webpack_demo
```
进入项目目录，并生成 package.json 文件（主要是项目的基本信息）：
```
mkdir vue_webpack_demo && npm init
```

## 安装webpack及脚手架
在安装好了node开发环境后，通过以下命令安装：
```
npm i -D webpack webpack-cli
```
此时webpack和webpack-cli会被安装到项目目录的node_modules目录下，同时webpack和webpack-cli会被添加到package.json 文件中的devDependencies(因为只是辅助开发，所以在此)对象中。

因为写当前博客的时间是2019年12月，所以安装的webpack是webpack4的最新稳定版本，很多配置都有默认的了。

## 配置ES6+转码为ES5:
babel-loader可以将ES6代码转为ES5代码，从而可以在现有环境执行，所以我们可以用ES6编写，而不用考虑环境支持的问题。

例如IE9根本看不懂代码写的let和const是什么东西？只能选择报错，这就是浏览器对ES6的兼容性问题；我们可以通过 babel-polyfill 对一些不支持新语法、兼容性差的客户端提供新语法的实现。

```
npm i -D babel-loader @babel/core @babel/preset-env
```
然后，在项目根目录下新建一个src文件夹，然后再建一个 index.js 文件，
```
mkdir src && cd src && vi index.js
```

在 index.js中，写上2句代码：
```
const str = 'word';
console.log('hello ', str);
```

因为写当前博客的时间是2019年12月，所以安装的webpack是webpack4的最新稳定版本，很多配置都有默认的了。所以在项目根目录下执行以下命令：
```
webpack
```
就会把src的默认入口文件 index.js 打包到dist目录下。

## 创建webpack.config.js文件
在项目根目录下增加webpack.config.js文件：
```
vi webpack.config.js
```
然后写入以下配置：
```
module.exports = {
  mode: 'development', // 打包模式
  entry : './src/index.js', // 入口文件
  output : {
      filename : 'index.js', // 输出文件名
      path :  __dirname+'/dist' // 输出文件的根路径
  },
  module : {
      rules: [
          {
              /*将js文件转码成es5*/
              test: /\.js?$/,
              use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
          },
      ]
  },
}
```

然后在package.json的scripts先添加下面这个指令：
```
"build": "webpack --config ./webpack.config.js",
```

最后在terminal中运行:
```
npm run build
```
可以看到根目录会生成一个 dist 文件夹，包含一个由 src/index.js 打包出来的index.js。

## 使用 html-webpack-plugin来创建html页面
- 安装html-webpack-plugin插件
```
npm i -D html-webpack-plugin
```
- 添加入口文件
在根目录下创建 index.html 文件：
```
vi  index.html
```
- 添加下面代码：
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>做有追求的码农</title>
  </head>

  <body>
    <div id="app"></div>
  </body>
</html>
```
- 修改webpack.config.js配置
```
const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 指定开发者打包模式
  entry : './src/idex.js', //入口文件
  output : {
      filename : 'index.js',
      path :  __dirname+'/dist'
  },
  module : {
      rules: [
          {
            /*将js文件转码成es5*/
            test: /\.js?$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
      ]
  },
  plugins:[
    new HtmlWebpackplugin({
      filename: 'index.html', // 打包后的文件名，默认index.html
      template: path.resolve(__dirname, 'index.html') // 导入被打包的文件模板
    })
  ]
}
```

- 查看效果
运行npm run build ，我们可以看到 dist 文件夹下有一个index.html生成了，而且还引入了src/index.js的压缩包index.js。

## 安装配置并使用vue
- 安装vue及其插件：
```
npm i vue && npm i -D vue-loader vue-template-compiler
```
其中，vue-loader 用于解析.vue文件，vue-template-compiler 用于编译模板。

- 修改webpack.config.js配置
```
const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development', // 指定开发者打包模式
  entry : './src/idex.js', //入口文件
  output : {
      filename : 'index.js',
      path :  __dirname+'/dist'
  },
  module : {
      rules: [
          {
            /*将js文件转码成es5*/
            test: /\.js?$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },            
          {
            test: /\.vue$/,
            use: [
              {
                loader: 'vue-loader',
                options: {
                  compilerOptions: {
                    preserveWhitespace: false
                  },
                }
              }
            ]
          },
      ]
  },
  plugins:[
    new HtmlWebpackplugin({
      filename: 'index.html', // 打包后的文件名，默认index.html
      template: path.resolve(__dirname, 'index.html') // 导入被打包的文件模板
    }),
     new VueLoaderPlugin()
  ]
}
```

- 使用vue
在 src 新建一个 App.vue：
```
cd src && vi App.vue
```

在App.vue 中添加以下代码：
```
<template>
  <div class="App">
    要做 {{msg}} 的码农
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
        msg: "有追求的",
    };
  }
};
</script>
```

- 修改src/index.js的代码为：
```
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('#app');
```
- 打包及运行vue
再次运行：
```
npm run build
```
然后在浏览器打开 dist/index.html，可以发现vue已经可以运行了。

## 安装本地服务及代码热更新
- 安装webpack-dev-server
```
npm i -D webpack-dev-server 
```
- 修改webpack.config.js配置
```
// ...
    devServer: { 
        host: 'localhost',
        port: 9527
    },
// ...
```
- 在package.json的scripts中增加一行启动本地服务指令：
```
"start": "webpack-dev-server",
```
默认会读取根目录下的webpack.config.js配置文件。

- 运行以及查看效果
```
npm start
```
用浏览器打开 http://localhost:9527/, 就可以本地开发了哦！而且当我们修改 src/App.vue 的代码后，浏览器是会自动刷新的(热更新)。

目前为止，一个简单的vue项目我们已经搭建出来了，之后我们可以像堆积木一样添加自己想要的功能了。

需要注意的是，devServer生成的文件是存在我们电脑的内存中的，不在我们的硬盘上。

## 加一些常用的loader
对于webpack来说，默认只能打包处理JS文件，或者说JS模块，但是webpack作为模块打包工具，需要打包的模块肯定不仅仅只有JS模块，还有：图片模块，CSS模块等等。

loader就是帮助webpack打包那些webpack默认打包不了的模块的工具；配置第三方loader，需要在webpack的配置文件中新增一个module节点，节点中是一个一个的规则集合，集合名字是rules，需要添加loader就在rules的集合中新增一个规则；每个规则必须的两个配置：
- test  ：test搭配的是键值对，值是一个正则表达式，用来匹配要处理的文件类型；
- use  ：用来指定使用哪个loader模块来打包处理该文件；

安装一些常用的loader
```
npm i -D  css-loader style-loader url-loader postcss-loader autoprefixer
```
其中：css-loader主要是解析 css 文件，style-loader 主要是将 css 解析到html页面的style上，postcss-loader和autoprefixer实现自动添加css3前缀。

特别是: file-loader可以用来帮助webpack打包处理一系列的图片文件，而url-loader它除了做file-loader能做的事情，还会通过配置规则将一定范围大小的图片打包成base64的字符串，放到dist.js文件里，从而减少https的图片请求数。

在webpack.config.js中增加配置
```
// ...
{
    test: /\.css$/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader'
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    require("autoprefixer") /*自动添加前缀*/
                ]
            }
        }
    ]
},
{
    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }]
}
```

## 自定义环境变量和常量
通过 webpack提供的DefinePlugin插件，可以很方便的定义环境变量
- 在根目录下添加config.js
```
const NODE_ENV = process.env.NODE_ENV; // webpack编译时会获取node环境的配置信息
const config = {
     production: { // 生产环境(线上环境)
        DOMAIN: 'production.com', // 上线域名
     },
     development: { // 开发环境
        DOMAIN: 'development.com', // 测试域名
     }
}
module.exports = config[NODE_ENV];
```

- 修改webpack.config.js文件
```
// ...
const constant = require('./config'); 
// ...
plugins:[
        // ...
        new webpack.DefinePlugin({ 
          CONSTANT: JSON.stringify(constant)
        })
        // ...
    ],
// ...
```

- 修改package.json
```
"scripts": {
    "start": "NODE_ENV=development webpack-dev-server",
    "build": "NODE_ENV=production webpack --config webpack.config.js"
  },
```
NODE_ENV=development和NODE_ENV=production指定node环境

- 运行及调试
由于修改了webpack.config.js所以需要重新运行npm start, 然后在src/idex.js后面加上一句测试代码：console.log(CONSTANT);

可以看到，配置成功打印出来了。

## 总结：
vue-cli是一个封装得很完美的vue脚手架，所以它的适应性很强；但是有些大公司他们的前端项目一般不会直接套用这种脚手架，而是需要结合公司内部的组件一步步搭起一个vue前端项目。

单纯的vue架构是非常简单的，但是结合到node环境和webpack一起用的话，有一些不是太熟悉node、webpack的前端同学就会有些蒙圈。

本文我们主要是搭建了一个基于webpack的vue开发环境，然后将需要的东西一件一件组装起来，虽然不算太完善，但是学会了这种思路的话，我们处理其他前端项目也不难了。