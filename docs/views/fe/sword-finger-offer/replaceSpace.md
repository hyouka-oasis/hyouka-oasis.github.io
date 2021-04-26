---
title: 剑指 Offer 05. 替换空格
sidebar: 'auto'
date: 2021-04-18
tags:
- 剑指 Offer
- 简单难度
categories:
- 算法
---

请实现一个函数, 把字符串 s 中的每个空格替换成"%20"。

示例 1：

````javascript

输入：s = "We are happy."
输出："We%20are%20happy."

````

这道题目的话相对于来说是比较简单的可以直接简单一点使用正则

```javascript
const replaceSpace = function(s) {
    return s.replace(/ /g, '%20');
};
```

第二种

使用字符串特性，截取到每个字符串如果string[index] === ''
则进行处理

```javascript
const replaceSpace = function(s) {
    const StringLength = s.length;
    let string = '';
    for (let i = 0; i < StringLength; i++) {
        if(s[i] === ' ') {
            string += '%20'
        }else {
            string += s[i];
        }
    }
    return string;
};
```
