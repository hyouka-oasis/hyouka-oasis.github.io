---
title: '剑指 Offer 58 - II. 左旋转字符串'
tags:
- 剑指 Offer
- 简单难度

categories:
- 算法

date: '2021-5-9'

cover: https://raw.githubusercontent.com/HyoukaM/hyoukam.github.io/master/assets/image/%E5%89%91%E6%8C%87offer.jpeg
---

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

示例 1：

```javascript
输入: s = "abcdefg", k = 2
输出: "cdefgab"
```

示例 2：

```javascript
输入: s = "lrloseumgh", k = 6
输出: "umghlrlose"
```


```javascript
const reverseLeftWords = (s = "abcdefg", k = 2) => {
  const stringSlice = s.slice(0, k);
  const prveSlice = s.slice(k, s.length);
  return prveSlice + stringSlice;
}
```
