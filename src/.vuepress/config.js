module.exports = {
  base: '/blog/',
  dest: 'docs',
  title:'lei哥的技术博客',
  description:'当你处于一个上升状态时，你会体会到工作带给你的成就感和物质回报，你不会想回头多看一眼那些努力挣扎却又收效甚微的过往，你只会感叹为什么没有早点开始。',
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
          { text: 'eslint规则', link: '/share/eslint'},
          // { text: '性能优化', link: '/share/opt'},
          { text: '深入webpack', link: '/share/webpack' },
          { text: 'webpack随手记', link: '/share/webpack-note' },
          { text: 'webpack配置vue', link: '/share/webpack-vue' },
          { text: 'webpack入门', link: '/share/webpack-base' },
          { text: '深入浅出前端脚手架', link: '/share/scaffold' },
          { text: 'markdown语法', link: '/share/md' },
        ]
      },
      {
        text: '重点技术',
        items: [
          { text: '深入skulpt', link: '/skulpt/1'},
          { text: '深入scratch', link: '/scratch/links' },
        ]
      },
      {
        text: '技术积累',
        items: [
          { text: 'webpack学习', link: '/technology/webpack'},
        ]
      },
      {
        text: '移动端',
        items: [
          { text: '公众号开发总结', link: '/mobile/wechat' },
          { text: '移动端性能优化(一)', link: '/mobile/optimize' },
          { text: '移动端性能优化(二)', link: '/mobile/optimize2' },
          { text: '移动端的那些坑(一)', link: '/mobile/mobile-bug' }
        ]
      },
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
      {
        text: 'github',
        link: 'https://github.com/microdream8'
      },
    ],
    sidebar: {
      '/skulpt/': genSidebarConfig('skulpt', ['links', '1']),
      '/scratch/': genSidebarConfig('深入scratch', ['links', '1', 'sb3']),
      '/technology/': genSidebarConfig('webpack学习', ['ltb', 'jy', 'gxl', 'yh', 'xd']),
    }
  }
}

function genSidebarConfig (title, children) {
  return [
    { title, children }
  ]
}
