# webpack学习-云皓
```
module.exports = {
    entry: './src/index.js', //入口文件，src下的index.js
    output: {
        path: path.join(__dirname, 'dist'), // 出口目录，dist文件
        filename: '[name].[hash].js' //这里name就是打包出来的文件名，因为是单入口，就是main，多入口下回分解
    },
    module: {},
    plugin: {},
    devServer: {}
}
```

```
devServer: {
    contentBase: path.join(__dirname, "dist"), //静态文件根目录,与output路径一致，使其build打包后的文件直接作用在起的服务的内存中
    port: 9090, // 端口
    host: 'localhost',
    overlay: true,
    compress: true // 服务器返回浏览器的时候是否启动gzip压缩
}
```

```
HtmlWebpackPlugin
这个plugin曝光率很高，他主要有两个作用

为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口


```