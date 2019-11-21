---
title: '深入浅出前端脚手架'
sidebar: auto
collapsable: true
---
# scaffold 脚手架-cli

> 本文主要讲解什么是脚手架、作用以及如何用Node.js开发一个简单的脚手架

## 什么是脚手架 ？
  **scaffold** ：[ˈskæfoʊld]&nbsp;&nbsp;&nbsp;&nbsp;中式发音：丝盖否的</br>
  简单的说脚手架是属于建筑时用到的一种工具，为安全施工、方便施工而搭建的工作平台（铁架子）。</br>
  程序开发引入的脚手架也是项目用到的一种工具，业内称为<font color="red">**CLI**</font>，定位基本一致：**创建项目初始文件**。</br>例如常见的 <font color="red">vue-cli</font> 、<font color="red">create-react-app</font> 、<font color="red">react-native-cli</font>等。

## 为什么要用脚手架 ？
  1、快速搭建项目模板</br>
  2、减少重复性工作，提升开发效率和开发舒适性</br>
  3、多人协作更为方便，不需要把文件传来传去</br>
## 优秀的脚手架应该具备以下几要素
  1、丰富但不繁琐的配置项；</br>
  2、与其他功能模块联动，生成对应的基本配置项；</br>
  3、自动安装依赖；</br>
  4、底层的高度可扩展性；</br>
  5、支持多种运行环境，比如命令行和Node.js API</br>
## 使用 Node.js 开发简单的脚手架工具
+ #### 思路 （借鉴 vue-cli）
  vue-cli 是将项目模板放在 git 上，运行的时候再根据用户交互下载不同的模板，经过模板引擎渲染出来，生成项目。这样将模板和脚手架分离，就可以各自维护，即使模板有变动，只需要上传最新的模板即可，而不需要用户去更新脚手架就可以生成最新的项目。那么就可以按照这个思路来进行开发了。
+ #### 工具库
  1、<font color="red">**commander.js**</font>：可以自动的解析命令和参数，用于处理用户输入的命令。</br>
  2、<font color="red">**download-git-repo**</font>：下载并提取 git 仓库，用于下载项目模板。</br>
  3、<font color="red">**inquirer.js**</font>：通用的命令行用户界面集合，用于和用户进行交互。</br>
  4、<font color="red">**ora**</font>：下载过程久的话，可以用于显示下载中的动画效果。</br>
  5、<font color="red">**chalk**</font>：可以给终端的字体加上颜色。</br>
+ #### 第一步：编写指令和处理命令行 commander
+ #### 第二步：交互式命令行 inquirer
+ #### 第三步：修改控制台输出内容样式 chalk
+ #### 第四步：加载效果 ora
+ #### 第五步：下载远程模板 download-git-repo
## 总结
  虽然前端脚手架没有固定形态，但是有必须具备的要素。从功能实现的角度，要考虑与业务的高度匹配；从底层框架的角度，要具备高度的可扩展性和执行环境多样性支持。

