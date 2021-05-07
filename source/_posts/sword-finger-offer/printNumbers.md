---
title: '剑指 Offer 17. 打印从 1 到最大的 n 位数' 
date: 2021-04-20
tags:
- 剑指 Offer
- 简单难度

categories:
- 算法
---

> 十进制

输入数字 ```n```，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。

示例 1:

```javascript
输入: n = 1
输出: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

这其实就是10, 100, 1000十进制问题，我们可以初始一个n = 1; n = n * 10;即可得出最大边界值

```javascript
const printNumbers = (n) => {
    let number = 1;
    for (let i = 0; i < n; i++) {
        number *= 10;
    }
    const array = [];
    for (let i = 1; i < number; i++) {
        array.push(i);
    }
    return array;
}
```
