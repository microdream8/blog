---
title: 'Uniapp从入门到进阶'
sidebar: auto
collapsable: true
---
# Uniapp 从入门到进阶

## 为什么你必须学Uniapp开发

当今社会互联网技术在不断的极速发展，其中离不开每一位热情奋进的技术人员。每天层出不穷的新概念，热火朝天的区块链，泛滥的共享经济，每年蜂拥而至抢着每一手热点发布的手机厂商，还有资讯快餐充斥着我们所有能看到的场景。这一切都离不开界面的呈现，内容上、形式上、功能上都在以非同凡响的效果吸引着你我，当中离不开一个角色--前端。

前端是从web应用开发分离出来的用户层，也就是用户接口，直接与用户进行交互，通信技术发展促进了很多前端技术的变革。从最传统的开发模式开始，随着的前后端分离，AMD，CMD和UMD的模块化管理，工程化出现和发展，再演变为前端MVVM和当今的小程序。前端与其说是一个职业，更是一项不断学习提升自我的过程，作为前端开发者堪比盖世武侠，招式固然重要，唯有内功心法才能让功力大增。

2017 年，微信小程序横空出世，依托微信的强大市场占有量，小程序的出现影响了人们的生活，简单方便的移动操作界面应用在生活方方面面，但是对于前端开发者来说，意味着我们又要掌握一套的框架，甚至又催生了一个职业—小程序工程师。

```js
小程序是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或者搜一下即可打开应用。也体现了“用完即走”的理念，用户不用关心是否安装太多应用的问题。应用将无处不在，随时可用，但又无需安装卸载。
```

开发市场规模不断扩大，前端开发的角色越发重要。对于大部分应用级开发而言，开发团队的人员配备正向前端倾斜，包括Android开发、iOS开发、PC端开发、小程序开发等角色进一步壮大了前端开发团队，前端工程师的岗位权重占比将不断加重。

虽然开发应用一直在向前端倾斜过渡，作为一名小小的前端，是不是也敢挺着身板自称程序员呢？因为前端就三大法宝：HTML、JS、CSS。技术，显然站不住脚。前端三架马车React、Angular、Vue 这样面向现代 web 应用需求的前端框架及其生态，与APP结合的混合开发模式，内嵌单页webview，Hybrid App。都在混淆这前端界。这些让我们感觉渺小羸弱。

你是否也在考虑WEB统一的时代来临，更或是由你改变？如果你有这样的想法，那么你来对了，Uniapp正在做这些事情，让开发有着统一的规范。

```js
小程序是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或者搜一下即可打开应用。也体现了“用完即走”的理念，用户不用关心是否安装太多应用的问题。应用将无处不在，随时可用，但又无需安装卸载。
```

Uniapp 是一个使用 Vue.js 开发跨平台应用的前端框架。开发者通过编写 Vue.js 代码，Uniapp 将其编译到iOS、Android、H5、以及各种小程序平台。

在实际开发中，同一个项目可能需要分别在H5 端，小程序端，甚至React Native 端有相同的表现，我们就需要开发和维护多端不同代码，工作量是非常巨大的。Uniapp 继承自 Vue.js，提供了完整的 Vue.js 开发体验。Uniapp 组件规范和扩展api与微信小程序基本相同。有一定 Vue.js 和微信小程序开发经验的开发者可快速上手，用特定的集成语言与多端语言进行对话就能在多个平台发布，省去了开发成本，节约了时间，何乐而不为呢？

曾在网上看到一句，“程序界的「二八定律」，百分之八十的问题可以运用百分之二十的知识来解决，而剩下的百分之二十的问题需要运用百分之八十的知识来解决。准备好那百分之八十的知识，才会在遇到有挑战的问题时更加游刃有余，机会永远留给准备好的人。”

我不是你的老师，只是你的一个旅伴而已。你问我路在何方，我指向我俩的前方。

## 工具介绍、新建项目及插件配置

```js
软件开发的时间通常是这样的：一开始的 90% 开发工作用掉了整个计划 90% 的时间，剩下的 10% 同样需要整个计划 90% 的时间，而最终发布前的修改也是如此。—— 汤姆 · 嘉吉
```

当你看到这里，相信你已经做好了准备（一台折腾得起的电脑和一颗肯行动的心），准备跟着我一同进入 Uniapp 的世界。

正所谓工欲善其事，必先利其器（这句话我经常说:>），我们要开发微信小程序和app，有两个工具是必不可少的：

1. 微信开发者工具
2. HbuilderX

注意：配置与安装方法 windows 系统一致。

### 微信开发者工具

我们要做的应用需要编译成小程序，因此也要下载微信开发者工具进行编译预览效果。找到对应版本，下载安装，完成打开。

这里先做个配置，找到菜单 【设置】 >> 【安全设置】，该配置可以使 Uniapp 使用命令行调用微信开发者工具，实现项目的预览与热更新。

<img src="../imgs/uniapp/ua1_1.jpeg" style="width: 80%;">

把服务端口选择开启即可

<img src="../imgs/uniapp/ua1_2.jpeg" style="width: 80%;">

这里如果不开启，接下来的调试会报以下错

<img src="../imgs/uniapp/ua1_3.jpeg" style="width: 80%;">

### HbuilderX

打开 HbuilderX官方，使用 Uniapp 框架开发项目搭配官方的编辑器 HBuilderX 开发，编辑器集成了node，添加了很多底层配置。无需复杂的安装，开箱即用并且搭配了可视化界面，可以轻松编辑。

<img src="../imgs/uniapp/ua1_4.jpeg" style="width: 80%;">

下载对应安装包（我的是 Mac 机），下载选择一个 App 开发版本（App 开发版已集成相关插件、开箱即用），下载成功后直接解压：

<img src="../imgs/uniapp/ua1_5.jpeg" style="width: 80%;">

### 新建项目

【选择新建项目】 >> 【uni-app】 >> 【默认模板】 >> 【创建】；选择 uni-app(U) 创建项目是为了开发者编写一套代码，可发布到iOS、Android、H5、以及各种小程序。

<img src="../imgs/uniapp/ua1_6.jpeg" style="width: 80%;">

一秒创建成功

<img src="../imgs/uniapp/ua1_7.jpeg" style="width: 80%;">

目录结构：

* pages 业务页面文件存放的目录
* static 静态文件目录(images之类)
* App.vue App 全局应用配置
* main.js 初始化入口文件
* manifest.json 多端配置信息
* pages.json 配置页面路由、导航等信息，类似原生小程序的 app.json

### 插件配置

选择菜单 【工具】 >> 【插件安装】

<img src="../imgs/uniapp/ua1_8.jpeg" style="width: 80%;">

<!-- <img src="../imgs/uniapp/ua1_9.jpeg" style="width: 80%;"> -->

建议安装这些：

* NPM
* 内置浏览器
* 内置终端
* App真机运行
* uni-app编译
* Git插件
* js-beautify
* prettier
* htmlhint
* stylelint
* eslint-plugin-vue
* eslint-js
* js压缩
* css压缩
* scss/sass编译
* es6编译

其余根据自己需要安装。

### 运行 Uniapp 项目

上面的配置插件完成之后，就可以小试一下刚才的项目了，运行 Uniapp 项目主要有3种方式：

* 浏览器
* 小程序
* 手机 App

由于手机预览调试操作介绍内容比较长，我们会在后面章节小程序、app 调试环境配置中展开细说。这里简单说一下浏览器预览。

HBuilder 可能检测不到的浏览器所在位置，所有的运行配置都需要对应上你在本机安装的浏览器的安装路径才能进行命令行启动预览。小程序，手机的运行配置一致。 选择菜单【工具】>>【设置】>>【运行配置】：

<img src="../imgs/uniapp/ua1_9.jpeg" style="width: 80%;">

完成 chrome 等浏览器运行配置，操作 【运行】>>【运行到浏览器】>>【chrome】，HBuilder 会在底部开启终端，实行项目更新与热编译的检测：

<img src="../imgs/uniapp/ua1_10.jpeg" style="width: 80%;">

### Git

项目开发中，源码管理工具必不可少，比如 Git，但这里我不想花太多篇幅去讲解如何安装配置 Git 以及它的基础概念，这里有一篇更棒的文章很好地解释了 Git：Git简明指南。

### FAQ

有人会说，官方文档写得足够详细了，为什么还要看你的呢？这么说吧，官方文档更像一份新华字典，大而全，可以反复查阅，而我的章节更像一份干货小结，来源于项目用于项目。本课程基于官方文档，但是高于官方文档。

### 小结

磨刀不误砍柴工，只有刀磨锋利，接下来才会更顺手。



