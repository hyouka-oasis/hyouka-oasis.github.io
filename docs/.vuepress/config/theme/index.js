const themeReco = require('./themeReco.js');
const nav = require('../nav/');


module.exports = Object.assign({}, themeReco, {
  nav,
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 自动形成侧边导航
  sidebar: 'auto',
  // friendLink: [
  //   {
  //     title: '俊劫',
  //     desc: '一个非常能收集杂七杂八资源的人，想学点其他的可以先去他的个人博客里面看看',
  //     logo: "https://alexwjj.github.io/logo.png",
  //     link: 'https://alexwjj.github.io'
  //   }
  // ],
})
