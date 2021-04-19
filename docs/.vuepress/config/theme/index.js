const themeReco = require('./themeReco.js');
const nav = require('../nav/');


module.exports = Object.assign({}, themeReco, {
  nav,
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 自动形成侧边导航
  sidebar: 'auto',
})