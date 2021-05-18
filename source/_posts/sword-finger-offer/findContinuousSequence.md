---
title: '剑指 Offer 57 - II. 和为 s 的连续正数序列'
tags:
- 剑指 Offer
- 中等难度
  categories:
- 算法

date: '2021-5-18'

cover: https://raw.githubusercontent.com/HyoukaM/hyoukam.github.io/master/assets/image/%E5%89%91%E6%8C%87offer.jpeg
---

题目描述
输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

示例 1：
```javascript
输入：target = 9
输出：[[2,3,4],[4,5]]
```

示例 2：
```javascript
输入：target = 15
输出：[[1,2,3,4,5],[4,5,6],[7,8]]
```

限制：
```javascript
1 <= target <= 10^5
```

```javascript
由题可知target是大于等于1，并且小于等于target+1所以我们可以设定最小值为1，
最大值为2，1<= target <= 2;
通过循环我们一直在left < right当中找，
并且我们需要找到left---right的和
也就是1-100的和为5050，其公式为(1+100)*(100-1+1)/2
也就是sum = (left+right) * (right - left + 1) / 2;
如果sum===target则left---right之间的值就是我们需要的值
如果sum<target则我们最大边界小于我们的长度所以要使right++；
则left++；
const findContinuousSequence = (target = 9) => {
  let left = 1, right = 2, nums = [];
  while (left < right) {
    let sum = (left + right) * (right - left + 1) / 2;
    if (sum === target) {
      let sku = [];
      for (let i = left; i <= right; i++) {
        sku[i - left] = i;
      }
      nums.push(sku);
      left++;
    } else if (nums > target) {
      left++;
    } else {
      right++;
    }
  }
  return nums;
}
```
