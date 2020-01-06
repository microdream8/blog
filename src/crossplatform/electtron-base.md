---
title: 'Electron初探'
sidebar: auto
collapsable: true
---
# Electron初探

Electron是一种基于Node.js和Chromium进行桌面应用开发的技术。Electron实现了丰富的操作系统相关的API，通过Node.js暴露给开发者，我们可以使用JavaScript来和操作系统进行交互，同时还可以使用NPM上海量的包来辅助开发。另一方面，凭借Chromium对HTML5良好的支持以及在各个操作系统上的一致表现，我们可以使用HTML来编写用户界面，享受HTML5、CSS3以及各种各样的前端工具库带来的便利。<br>
Electron已经有了不少成功的案例，笔者日常工作中使用的Atom、Visual Studio Code、Zeplin、Postman和Insominia就是基于Electron开发的。

## 快速上手

快速上手的最好方式是直接从electron-quick-start项目开始：
```js
git clone https://github.com/electron/electron-quick-start
```
然后转到对应的目录，安装NPM依赖并启动项目：
```js
npm install
npm start
```
然后就可以看到应用了。<br>
其执行过程可以简单地理解为：Electron使用Node.js执行了入口文件main.js，后者声明了一个Electron app并订阅了该app的一些事件；随后，app还创建了一个BroswerWindow，并将其内容设置为index.html文件，然后将其显示出来。到现在位置的所有执行步骤都位于Electron的主进程中。<br>
BrowserWindow内部包含了一个Chromium容器，该容器会在一个独立的渲染器进程中渲染index.html并执行所有与其相关的JavaScript代码。每个BrowserWindow都会有独立的渲染器进程。

## 调试

先来看看主进程的调试方法，简单来说，可以用任何调试Node.js代码的方法来调试Electron主进程。笔者推荐使用调试体验非常棒的Visual Studio Code。<br>

调试之前需要进行一些配置，在项目根目录下创建.vscode/launch.json文件：
```js
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron.cmd",
      "program": "${workspaceRoot}/main.js"
    }
  ]
}
```
然后直接按F5即可进行调试。<br>
渲染进程则可以使用BrowserWindow的开发者工具来进行调试，就像调试网页中的JavaScript代码一样。<br>
在main.js中，我们通过以下代码来打开开发者工具：
```js
mainWindow.webContents.openDevTools()
```

## 进程通讯

主进程和渲染进程之间可以通过互相发送消息来进行交互。<br>
在渲染进程中，可以通过electron.ipcRenderer来操作该进程，比如令其发送一条消息：
```js
electron.ipcRenderer.send('toggle-dev')
```
在主进程中，可以通过electron.ipcMain来操作主进程，比如令其订阅消息：
```js
electron.ipcMain.on('toggle-dev', function () {
  mainWindow.webContents.toggleDevTools()
})
```

## 托盘
```js
var tray = new electron.Tray(path.join(__dirname, '/tray.png'))
tray.setToolTip('Hello Electron!')
tray.setContextMenu(electron.Menu.buildFromTemplate([
  {
    label: 'About',
    click() {
      electron.dialog.showMessageBox({
        message: 'Hello, Electron!',
        buttons: []
      })
    }
  }
]))
```
以上代码创建了一个托盘图标，该图标除了拥有气泡提示之外还包含一个About菜单项，点击该菜单则会弹出一个对话框。<br>
此处需要注意的是传递给Tray的图标路径必须是绝对路径，否则在最终发布时可能会出现无法定位图标的问题。

## 运行命令
可以通过Node.js的child_process.exec来运行命令，并拿到执行结果以及输出。但是在Windows平台上，由于中文编码的问题的问题，拿到的输出可能是乱码，这时就需要使用NPM包iconv-lite来进行编码转换。<br>
下面是一个封装了编码转换的exec函数：
```js
function exec (command, callback) {
  var iconv = require('iconv-lite')
  iconv.skipDecodeWarning = true
  exec = function (command, callback) {
    require('child_process').exec(command, { encoding: 'binary' }, function (error, stdout, stderr) {
      if (error) callback(error, null, iconv.decode(stderr, "CP936"))
      else callback(error, iconv.decode(stdout, "CP936"), null)
    })
  }
  exec(command, callback)
}
```
使用方法：
```js
exec('NET SESSION', function (error, stdout, stderr) {
  document.getElementById('admin').innerText = error || stdout.indexOf('拒绝访问') >= 0 ? 'You are NOT admin.' : 'You are admin';
})
```
以上代码通过运行NET SESSTION命令来间接地判断应用当前是否以管理员权限运行。

## Win32 API

可以通过NPM包node-ffi来和Win32 API进行交互：
```js
npm install ffi --save
```
Node-ffi是一个Native包，在Electron中使用Native包通常需要进行额外的编译操作，使其能匹配Electron内置的Node.js版本。所以还需要安装electron-rebuild：
```js
npm install electron-rebuild --save-dev
```
接着可以运行下面的命令来重新编译：
```js
node_modules\.bin\electron-rebuild.cmd --force
```
为了方便起见，也可以将这个命令添加到package.json的scripts节中，令其在每次执行npm install后自动运行：<br/>
json"] "post-install": "node_modules\\.bin\\electron-rebuild.cmd --force"<br/>
在Node.js中通过node-ffi调用Win32 API和在C#中类似，都需要提前注册该API：<br/>
```js
var ffi = require('ffi')
var wininet = new ffi.Library('Wininet', {
  InternetGetConnectedState: [ 'bool', [ 'int32', 'int32']]
})
```
然后就可以调用了：
```js
var status = wininet.InternetGetConnectedState(0, 0)
```
以上代码通过调用wininet.dll中的InternetGetConnectedState函数来获取Windows当前的互联网连接状态，当然，HTML5本身也提供了这样的接口（online/offiline事件），此处只作试验之用。

## 发布

应用开发完毕后，可以通过electron-builder来将代码编译封装成一个便于传播和安装的包：
```js
npm -install electron-builder --save-dev
```
然后编辑package.json，增加build节：
```js
"build": {
  "appId": "Hello.Electron",
  "productonName": "Hello Electron",
  "win": {
    "icon": "icon.ico"
  }
}
```
接着在scripts下增加：
```js
"pack": "build --dir",
"dist": "build"
```
运行npm run pack会生成编译后的应用，位于dist/xxx-unpacked文件夹内。<br>
运行npm run dist会生成编译后的安装包，位于dist文件夹内。<br>
可以修改scripts.dist来指定编译后的目标架构，比如：
```js
"dist": "build --ia32"
```
这样修改后，在进行编译时，electron-builder检测到本地的electron版本和目标架构不匹配，就会自动下载匹配目标架构的electron版本。由于这些文件托管在github上，在国内可能会遇到一些问题，可以按照编译时提示的文件名手工下载该文件，然后和package.json放到一起即可。<br>
electron-builder默认使用的安装包格式并不会自动创建快捷方式，想要实现这一功能，可以指定electron使用nsis来生成安装包。<br>
在package.json的build.win节中增加：
```js
"target": "nsis"
```
如果想要在安装和卸载期间执行一些额外的操作，比如将应用注册为随Windows自动启动，可以为build.nsis增加：
```js
"include": "installer.nsi"
```
然后创建installer.nsi文件：
```js
!macro customInstall
WriteRegStr HKEY_LOCAL_MACHINE 'Software\Microsoft\Windows\CurrentVersion\Run' 'App Name' '$INSTDIR\app-name.exe'
!macroend

!macro customUnInstall
DeleteRegValue HKEY_LOCAL_MACHINE 'Software\Microsoft\Windows\CurrentVersion\Run' 'App Name'
!macroend
```






