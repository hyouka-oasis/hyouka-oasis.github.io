---
title: 我的日常
sidebar: 'auto'
date: 2021-04-17
tags:
- 日常

categories:
- 日常

sticky:
- 1
---

> 记录一下日常生活🌈🌈🌈 

## 2020-04-29
整天无所事事，敲了一天的小程序，昨天晚上凌晨四点才睡
七天的开发周期是在让我有点脑阔痛，
而且还是用原生的开发，并且本地还不能调试人傻了
算法五一的时候在推送吧最近脑子有点不好使

## 2020-04-28

### 上午
又简单的过了一下vue3

### 下午
午觉一起来就被叫去开会了从两点钟一直开到晚上七点🥲

## 2020-04-26

### 上午

昨天简单的写了一个React+Typescript+Zent后台，但是早上编写的时候发现通过require.context引入路由路径的方法有点问题
于是改动了一下。临近中午吃饭的时候在知乎发现了一篇毁三观的散文，挺有意思的🤤。

### 下午

pm把我们拉进去开了一个简单的敏捷开发扫盲会，团队同事之间简单的介绍了一下自己。然后制定了前端后端之间的DOD
然后我们前端制定的DOD分为五点
* 页面达到设计效果
* 不同设备的兼容性
* 功能逻辑完整
* 页面性能达到要求
* 符合代码规范

出来以后简单的学了一下vue3，发现通过setup函数解构出去的变量不会被监听到🧐
```javascript
//不会响应
<template>
    <div>
        {{name}}
    </div>
</template>
<script>
    export default {
        setup() {
            const state = {
                name: 'this is vue3'
            };
            return {...state}
        }   
    }
</script>

//会响应
<template>
    <div>
        {{state.name}}
    </div>
</template>
<script>
    export default {
        setup() {
            const state = {
                 name: 'this is vue3'
            };
        return {state}
    }
}
</script>
```
也是第一次试vue3，还是需要慢慢来的。

## 2020-04-25
由于公司里面要用zent，没看过所以今天花了半天的时间用来写了一个简单的[后台](https://github.com/HyoukaM/React-Typescript-zent)

## 2020-04-24

公寓通知将停水至下午，很无奈为了节省早饭钱和中饭去，一直睡到下午🐶🐶🐶(理财专家)。
然后四点多的时候去买了点食材，到家八点多了吧，然后温故了红宝石第四版。

## 2020-04-23

思考了一下怎么样在React中将
```javascript
<switch>
    <Router>
        <Route component/>
        <Route component/>
        <Route component/>
        <Route component/>
    </Router>
</switch>
```
的形式转换为vue当中的
```javascript
const routes = [
    {
        name: '',
        component: Vue.Component | Promise<Vue.Component>,
        path: ''
    }
]
```
形式，参考了我原有的经验完成(小小的不足，不能实现Promise)
 
## 消失的时间

中间跳了一段，我也忘记我中间干了啥了

## 2020-04-20
### 上午
一到公司就非常难受了，为什么难受呢，因为我搭建的github与travis两者的分支不能进行同步，
所以我昨儿晚上写的东西就没办法更新到GitHub的分支上面，还好公司网络面向全球，于是乎我就
打开了面向程序员[Google](https://www.google.com)可是无果，并没有遇到我这种情况的人，
于是我又又又厚着脸皮去找了昨儿加的老哥，以后都简称俊劫了。 可是估计他也在忙，并没有鸟我😯，
然后我就自个捣鼓，因为travis现在有两个网站 ，一个是[travis-ci.org](https://www.travis-ci.org/),
一个是[travis-ci.com](https://www.travis-ci.com/), 而我关联的是[travis-ci.org](https://www.travis-ci.org/) 
并且我在[travis-ci.com](https://www.travis-ci.com/) 上没有看见我GitHub上面的博客的仓库，我就想会不会和这个有关系，
然后英语不好的我就打开了Chrome的Google翻译软件把整个页面翻译了一遍，发现了一个迁移入口，从[travis-ci.org](https://www.travis-ci.org/)
迁移到[travis-ci.com](https://www.travis-ci.com/) 上面，我尝试了一下，你猜怎么着，哎好了，我就是玩儿。然后呢俊劫中午吃饭的时候给我发了一句
```理论上来说应该是同步的```我直接🙄🙄🙄。

### 下午
紧接着在上午的时候解决了travis和GitHub不同步的问题，写了力扣上剑指offer的两道题目吧，一道关于双指针问题，一道关于十进制最大边界值的问题，两道题目就目前对于我来说还算挺简单的

### 晚上
日常的晚点下班，回到家日常怀疑人生。
## 2020-04-19

### 日常不要脸

可以说非常的巧合吧，翻阅掘金的时候无意间看到一个老哥也在有赞上班，
于是非常不要脸的加上了他的微信，然后请教了他一些问题
