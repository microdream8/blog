module.exports = {
  base: '/blog/',
  dest: 'docs',
  title:'lei哥的技术博客',
  description:'生活中，百分之八十的问题可以运用百分之二十的知识来解决，而剩下的百分之二十的问题需要运用百分之八十的知识来解决。准备好那百分之八十的知识，才会在遇到有挑战的问题时更加游刃有余，机会永远留给准备好的人。',
  head:[
    ['link', { rel: 'icon', href: 'favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  themeConfig: {
    sidebarDepth: 3,
    navBar: true,
    nav: [
      {
        text: '教程',
        items: [
          { text: '环境配置', link: '/share/env'},
          { text: 'markdown语法', link: '/share/md' },
          { text: 'editorconfig', link: '/share/config' },
          // { text: 'eslint规则', link: '/share/eslint'},
          // { text: '性能优化', link: '/share/opt'},
        ]
      },
      // {
      //   text: '重点技术',
      //   items: [
          // { text: '深入skulpt', link: '/skulpt/1'},
          // { text: '深入scratch', link: '/scratch/links' },
      //   ]
      // },
      {
        text: '技术积累',
        items: [
          { text: '深入skulpt', link: '/skulpt/1'},
          { text: '深入scratch', link: '/scratch/links' },
          { text: '图片相关总结', link: '/javascript/img' },
          { text: '遇到的坑', link: '/javascript/js-bug' },
          { text: 'css3', link: '/css/base-css' },
          { text: 'git', link: '/other/git' },
          { text: '请求相关', link: '/technologyAccoumulation/request' },
          { text: 'http相关', link: '/technologyAccoumulation/http.md' },
          { text: '讲讲ts', link: '/typescript/summary.md' },
        ]
      },
      {
        text: 'JS开发总结',
        items: [
          { text: 'js基础总结', link: '/javascript/js-base' },
          { text: 'js继承', link: '/javascript/inherit' },
          { text: 'js继承(二)', link: '/javascript/inherit2' },
          { text: '面向对象', link: '/javascript/obj' },
          { text: '引用对象', link: '/javascript/yinyong' },
          { text: 'js各种知识点', link: '/javascript/js-tip' },
          { text: '异步汇总', link: '/javascript/yibu' },
          { text: '跨域相关', link: '/javascript/core' },
          { text: 'ES6知识', link: '/javascript/es6' },
          { text: '工具函数总结', link: '/javascript/tool-fun' },
          { text: '手写代码', link: '/javascript/write-code' },
          { text: '面试题总结', link: '/interview/dachang' },
        ]
      },
      {
        text: '移动端',
        items: [
          { text: '公众号开发总结', link: '/mobile/wechat' },
          { text: '移动端性能优化(一)', link: '/mobile/optimize' },
          { text: '移动端性能优化(二)', link: '/mobile/optimize2' },
          { text: '移动端的那些坑', link: '/mobile/mobile-bug' }
        ]
      },
      {
        text: '框架',
        items: [
          { text: 'Vue小知识', link: '/vue/knowledgePoint' },
          { text: '组件化总结', link: '/vue/component' },
          { text: 'Uniapp学习', link: '/share/uni-app' },
          { text: 'webpack入门', link: '/share/webpack-base' },
          { text: 'webpack优化', link: '/webpack/perform-opt' },
          { text: 'webpack随手记', link: '/share/webpack-note' },
          { text: 'element-ui学习', link: '/other/frame/element-ui' }
        ]
      },
      // {
      //   text: '跨平台',
      //   items: [
      //     { text: 'Electron初探', link: '/crossplatform/electtron-base' }
      //   ]
      // },
      // {
      //   text: 'webpack学习'
      // },
      // vue, js(ecma6), react, 面试（经典题型）
      // 手写代码（Promise mini-vue router axios）
      // 常用工具函数，框架， 脚手架
      // 经验积累
      // 理想梦想
      {
        text: '常用网址',
        link: '/url/fe'
      },
      // {
      //   text: 'github',
      //   link: 'https://github.com/microdream8'
      // },
    ],
    sidebar: {
      '/skulpt/': genSidebarConfig('skulpt', ['links', '1']),
      '/scratch/': genSidebarConfig('深入scratch', ['links', '1', 'sb3']),
      // '/technology/': genSidebarConfig('webpack学习', ['ltb', 'jy', 'gxl', 'yh', 'xd']),
    }
  }
}

function genSidebarConfig (title, children) {
  return [
    { title, children }
  ]
}
