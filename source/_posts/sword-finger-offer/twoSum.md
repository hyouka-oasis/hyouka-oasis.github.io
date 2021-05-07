---
title: '剑指 Offer 57. 和为 s 的两个数字'
tags:
- 剑指 Offer
- 简单难度
  
categories:
- 算法

date: '2021-4-28'
---

输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。

示例 1：

```javascript
输入：nums = [2,7,11,15], target = 9
输出：[2,7] 或者 [7,2]
```
示例 2：

```javascript
输入：nums = [10,26,30,31,47,60], target = 40
输出：[10,30] 或者 [30,10]
```

话不多说直接暴力

```javascript
const twoSum = (nums = [2, 7, 11, 15], target = 9) => {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [nums[i], nums[j]];
            }
        }
    }
}
```

这种方法确实可行但是会超时于是我们换一种思路


```javascript
const twoSum = (nums = [2, 7, 11, 15], target = 9) => {
    /**
     * 思路定义最小值，最大边界，如果nums[left] + nums[right]一直不等于target
     * 我们就一直找
     * 其中如果nums[left] + nums[right] > target
     * 则正确答案在left - right之间排除right;
     * 否则正确答案在left - right之间排除left
     * @type {number}
     */
    let left = 0, right = nums.length - 1;
    while (nums[left] + nums[right] !== target) {
        if(nums[left] + nums[right] > target) {
            right --;
        }else {
            left ++;
        }
    }
    return [nums[left], nums[right]];
}
```
