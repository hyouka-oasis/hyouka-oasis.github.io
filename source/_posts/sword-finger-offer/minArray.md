---
title: 剑指 Offer 11. 旋转数组的最小数字 
date: 2021-04-20 
tags:
- 剑指 Offer
- 简单难度

categories:
- 算法

cover: https://raw.githubusercontent.com/HyoukaM/hyoukam.github.io/master/assets/image/%E5%89%91%E6%8C%87offer.jpeg
---

>二分查找

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组[3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。

示例 1：

```javascript
输入：[3,4,5,1,2]
输出：1
```

示例 2：

```javascript
输入：[2,2,2,0,1]
输出：0
```

解题思路:

首先示例1旋转数组后为[1, 2, 3, 4, 5],

示例2旋转数组后为[0, 1, 2, 2, 2],

由此可以看出两个数组都是由小到大从左至右排序，并且最小值往往靠近最左侧，

所以

```markdown
numbers = [3, 4, 5, 1, 2];

1.初始化最小边界left = 0，初始化最大边界right = numbers.length - 1;

2.取numbers中间值middle = parseInt((left + right) / 2); 因为这里可能产生小数，所以我们要对他进行取整数操作；

3.如果numbers[mid] < numbers[right], 则我们可知最小值在[left, mid]之间，我们将最大边界right = mid；
接着进行比较操作。

4.如果numbers[mid] > numbers[right], 则可知最小值存在于[mid + 1, right]之间，我们将最小边界left = mid + 1;

5.如果number[mid] === numbers[right], 
例如[1, 2, 2, 2, 2], 
left = 0; right = 4; mid = 2;
numbers[mid] = 2;
number[right] = 2;
number[mid] === number[right];
此时如果通过left++的话，可以得出 mid = 4 + 1 / 2 = 2;
mid = 4 + 2 / 2 = 3;
mid = 4 + 3 / 2 = 3;
到此为止left < right 一直找不出numbers的最小值;
所以只能通过right --，来减少数组长度然后进行比较取出最小值，因为最小值永远是靠左的而不是靠右的；
```

```javascript

const minArray = (numbers) => {
    let left = 0 ;
    let right = numbers.length - 1;
    while(left < right) {
        const mid = parseInt((left + right) / 2);
        if(numbers[mid] < numbers[right]) {
            right = mid;
        }else if (numbers[mid] > numbers[right]) {
            left = mid + 1;
        }else {
            right --;
        }
    }
    return numbers[left];
};

minArray([3, 4, 5, 1, 2]);

```
