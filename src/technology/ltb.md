# webpack学习-天宝

## Scope Hoisting的理解
  > 原理：将所有模块的代码按照引用顺序放在一个函数作用域里 ，然后适当的重命名一些变量以防止变量名冲突。通过scope hoisting可减少函数声明代码合内存开销。
  
如果不开启scope hoisting，会导致大量作用域包裹代码，导致体积增大（模块越多越明显），运行代码时创建的函数作用域变多（大量的IIFE匿名闭包），内存开销大。
  
+ Webpack4环境，配置参数mode为production(即生产环境)时，默认开启了scope hoisting功能。
+ Webpack3环境，需要在plugins里手动配置，<code>new webpack.optimize.ModuleConcatenationPlugin()</code>，会将es6里的import转换成__webpack__require__，export转换成__webpack_exports__。