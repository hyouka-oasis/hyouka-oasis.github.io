---
title: '剑指 Offer 53 - I. 在排序数组中查找数字 I'
tags:
- 剑指 Offer
- 简单难度

categories:
- 算法

date: '2021-4-26'
---

统计一个数字在排序数组中出现的次数。

示例 1:

```javascript
输入: nums = [5,7,7,8,8,10], target = 8
输出: 2
```

示例 2:

```javascript
输入: nums = [5,7,7,8,8,10], target = 6
输出: 0
```

简单的思路设定一个初始值0，循环数组，如果target === i; count ++则可得出答案

```javascript
const search = function(nums, target) {
    let count = 0;
    for(let i of nums) {
        if(target === i) {
            count++;
        }
    }
    return count;
};
```

二分查找思路

```javascript
const search = (nums, target) => {
  const difference = (nums, target) => {
    //0, 5
    let left = 0, right = nums.length - 1;
    while (left <= right) {
      //5/2 = 2;
      // 8/2 = 4;
      // 10/2 = 5;
      let mid = parseInt((left + right) / 2);
      //7>8; left = 2 + 1;
      //8>8; left = 4 + 1;
      //10>8; right = 5 - 1;
      if (nums[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }
  //分别取target的最大边界值和target-1的最大边界值相减就可得出
  return difference(nums, target) - difference(nums, target - 1);
};
```
