---
title: '剑指 Offer 21. 调整数组顺序使奇数位于偶数前面'
tags:
- 剑指 Offer
- 简单难度

categories:
- 算法

date: '2021-4-21'

cover: https://raw.githubusercontent.com/HyoukaM/hyoukam.github.io/master/assets/image/%E5%89%91%E6%8C%87offer.jpeg
---

> 二分查找

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。

示例：
```javascript
输入：nums = [1,2,3,4]
输出：[1,3,2,4] 
注：[3,1,2,4] 也是正确的答案之一。
```

提示：

```javascript
0.<= nums.length <= 50000
1.<= nums[i] <= 10000
```

解题思路一:

对数组里面每一个值进行奇偶判断，将奇偶数进行分割，然后重新拼接

```javascript
const exchange = (nums) => {
    const a = [];
    const b = [];
    for (let i = 0; i < nums.length; i++) {
        if(nums[i] % 2 !== 0) {
            a.push(nums[i]);
        }else {
            b.push(nums[i]);
        }
    }
    return a.concat(b);
}
```

解题思路二：
投机取巧法，使用数组方法直接进行排序

```javascript
const exchange = (nums) => {
    return nums.sort((a, b) => b % 2 - a % 2);
}
```

解题思路三：
利用双指针进行比较，定义前指针为偶数，后指针为奇数，定位到两者数值进行替换

过程:
```javascript
1.初始化start = 0，end = nums.length - 1;
2.如果start < end，则代表还处于最大边界之中，继续进行比较；
3.如果nums[start] % 2 === 1（奇数）,则start ++；直到找不到奇数下标;
4.如果nums[end] % 2 === 0(偶数)，则end--; 直到找不到偶数下标；
5.交换nums[start]和nums[end]的位置
```

```javascript
const exchange = (nums) => {
  //1，2，3，4
  let start = 0;
  let end = nums.length - 1;
  for (let i = start; i < end; i++) {
    //1
    while (start < end && (nums[start] % 2 === 1)) {
      //2
      start++;
    }
    //4
    while (start < end && (nums[end] % 2 === 0)) {
      //3
      end--;
    }
    //将2，3替换位置
    let startNumber = nums[start];
    nums[start] = nums[end];
    nums[end] = startNumber;
  }
  return nums;
}
```
