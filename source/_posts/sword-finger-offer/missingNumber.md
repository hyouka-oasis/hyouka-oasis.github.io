---
title: '剑指 Offer 53 - II. 0～n-1 中缺失的数字'
tags:
- 剑指 Offer
- 简单难度

categories:
- 算法

date: '2021-4-26'

cover: https://raw.githubusercontent.com/HyoukaM/hyoukam.github.io/master/assets/image/%E5%89%91%E6%8C%87offer.jpeg
---

一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

示例 1:

```javascript
输入: [0,1,3]
输出: 2
```

示例 2:

```javascript
输入: [0,1,2,3,4,5,6,7,9]
输出: 8
```

这道题目其实就是二分查找


```javascript
const missingNumber = (nums = [0, 1, 2, 3, 4, 5, 6, 7, 9]) => {
  //0, 8;
  //5, 8;
  //5, 7;
  let left = 0, right = nums.length - 1;
  while (left < right) {
    // mid = 4;
    // mid = 4;
    // mid = 6;
    const mid = parseInt((left + right) / 2);
    console.log(left, right, left + right);
    console.log(mid);

    // 5 === 4 : right = mid - 1 = 3;
    // 6 === 6 ? left = mid + 1 = 7;
    if (nums[mid] === mid) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
  // console.log(left);
};
```
