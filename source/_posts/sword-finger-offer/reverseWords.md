---
title: '剑指 Offer 58 - I. 翻转单词顺序'
tags:
- 剑指 Offer
- 中等难度

categories:
- 算法

date: '2021-5-9'

cover: https://raw.githubusercontent.com/HyoukaM/hyoukam.github.io/master/assets/image/%E5%89%91%E6%8C%87offer.jpeg
---

输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student. "，则输出"student. a am I"。

示例 1：

```javascript
输入: "the sky is blue"
输出: "blue is sky the"
```

示例 2：

```javascript
输入: " hello world! "
输出:"world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
```


```javascript
var reverseWords = function(s) {
  let stringSplit = s.split(' ');
  let string = '';
  for (let i = stringSplit.length - 1; i >= 0; i--) {
    if (stringSplit[i] !== '') {
      string += ' ' + stringSplit[i];
    }
  }
  return string.trim()
};
```
