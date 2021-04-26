const themeConfig = require('./config/theme/');

module.exports = {
    base: '/',
    title: "Hyouka",
    description: '相信自己',
    dest: 'docs/.vuepress/dist',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}],
        [
            'script',
            {},
            `
            var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?4b108402c7f42462b38e7f15d0fc9321";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
            })();    
        `
        ]
    ],
    theme: 'reco',
    themeConfig,
    codeTheme: 'coy',
    markdown: {
        lineNumbers: true
    },
    plugins: [
        '@vuepress/medium-zoom',
        'flowchart',
        '@vuepress-reco/vuepress-plugin-loading-page',
        [
            "cursor-effects",
            {
                size: 2,                    // size of the particle, default: 2
                shape: ['circle'],  // shape of the particle, default: 'star'， 可选'circle'
                zIndex: 999999999           // z-index property of the canvas, default: 999999999
            }
        ],
        // // 动态标题
        [
            "dynamic-title",
            {
                showIcon: "/avatar.ico",
                showText: "👻我害怕鬼！",
                hideIcon: "/avatar.ico",
                hideText: "🧑‍💻我不害怕人！",
                recoverTime: 2000
            }
        ],
        ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
            title: '个人微信:15157548822',
            body: [
                {
                    type: 'image',
                    src: '/wechart.png'
                }
            ],
        }],
        ['vuepress-plugin-comment', {
            choosen: 'valine',
            options: {
                appId: 'FdT4yPiuI8yl0Q1ndeKy0Dr4-gzGzoHsz',// your appId
                appKey: '3uFvPvYeuHfUzULmU7ntRazw', // your appKey，
                visitor: true,
                lang: 'zh-CN',
                placeholder: '请填写你的评论吧😊😊😊'
            }
        }]
    ],
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
}
