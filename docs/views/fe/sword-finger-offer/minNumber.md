---
title: '剑指 Offer 45. 把数组排成最小的数'
tags:
- 剑指 Offer

categories:
- 算法

sidebar: 'auto'
date: '2021-4-26'
---

输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

示例 1:

```javascript
输入: [10,2]
输出: "102"
```

示例 2:

```javascript
输入: [3,30,34,5,9]
输出: "3033459"
```


这道题就是a+b > b+a ? a = b; b = a : a = a; b = b;

首先利用内置函数sort进行快速排序

```javascript
const minNumber = (nums = [3, 30, 34, 5, 9]) => {
  return nums.sort((a, b) => ('' + a + b) - ('' + b + a)).join('');
};
```

这是我能想到最快的方法，能力有限
其实就是快速排序
这里参考[落落落洛克](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/solution/song-gei-qian-duan-de-tong-xue-kan-bu-do-4fko/) 的题解
```javascript/**
 * @param {number[]} nums
 * @return {string}
 */
// 理解题意 可以发现
// 把数字a b拼接成字符串 比较a+b b+a
// a+b b+a
// var minNumber = function(nums) {
//   return nums.sort((a, b) => ('' + a + b) - ('' + b + a)).join('');
// }


function minNumber(nums) {
    //[3,30,34,5,9], 0, 4;
	quickSort(nums, 0, nums.length - 1);
	return nums.join('');
}
// ! 该题其实考查的就是排序 但是对比大小的条件变了  数字的话根据大小来比
// ! 把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个  满足这种对比是根据 a+b 和 b+a的比较 决定排序位置
function quickSort(nums, l, r) {
	if (l >= r) return
	let i = l,
		j = r
	tmp = nums[i]
	const pivot = l
	while (i < j) {
		while ('' + nums[j] + nums[pivot] - ('' + nums[pivot] + nums[j]) >= 0 && i < j) j--
		while ('' + nums[i] + nums[pivot] - ('' + nums[pivot] + nums[i]) <= 0 && i < j) i++
		tmp = nums[i]
		nums[i] = nums[j]
		nums[j] = tmp
	}
	nums[i] = nums[pivot]
	nums[pivot] = tmp
	quickSort(nums, l, i - 1)
	quickSort(nums, i + 1, r)
}

```
