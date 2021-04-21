---
title: 剑指 Offer 04. 二维数组中的查找
sidebar: 'auto'
date: 2021-04-17
tags:
- 剑指 Offer
  
categories:
- 算法
---

在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

示例:

现有矩阵 matrix 如下：
```
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
```
给定 target = 5，返回 ``true``。

给定 target = 20，返回 ``false``。

限制：

````
0 <= n <= 1000
0 <= m <= 1000
````

首先这道题目首先抛去什么优化性问题的话其实挺简单的,只需要最简单的for循环即可
````javascript
const findNumberIn2DArray = function (matrix, target) {
  if (!matrix.length) return false;
  let isFind = false;
  //二维数组
  for (let i = 0; i < matrix.length; i++) {
    //二维数组中的一维数组
    for (let j = 0; j < matrix[i].length; j++) {
      if(matrix[i][j] === target) {
        isFind = true;
      }
    }
  }
  return isFind;
};
findNumberIn2DArray([
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], 5);
````

![findNumberIn2DArray](https://raw.githubusercontent.com/HyoukaM/HyoukaM.github.io/docs/docs/.vuepress/public/findNumberIn2DArray/findNumberIn2DArray.png)

但是呵呵，显然题目表达的意思并不是想让你暴力破解，所以我们可以找到题目当中的关键字
从上到下，从左到右，于是乎

![](https://raw.githubusercontent.com/HyoukaM/HyoukaM.github.io/docs/docs/.vuepress/public/findNumberIn2DArray/img.png)
![](https://raw.githubusercontent.com/HyoukaM/HyoukaM.github.io/docs/docs/.vuepress/public/findNumberIn2DArray/img_1.png)
![](https://raw.githubusercontent.com/HyoukaM/HyoukaM.github.io/docs/docs/.vuepress/public/findNumberIn2DArray/img_2.png)

从左下角作为原始起点(x)，左下角的上方数字比x要小，左下角的右方数字比x要大
由此规律便可得出从x开始进行比较,如果x > target, 则将x = x上方的数字，
如果x < target 则将x = x右方的数字;

``` javascript
const findNumberIn2DArray = function (matrix, target) {
  if (!matrix.length) return false;
  let x = 0;
  let y = matrix.length - 1;
  //x作为每个一维数组长度的限制条件，y作为二位数组长度的限制条件
  while (x < matrix[0].length && y >= 0) {
    //[4][0] = 18 < 20 ? true; x = 1;
    //[3][1] = 13 < 20 ? true; x = 2;
    //[3][2] = 14 < 20 ? true; x = 3;
    if (matrix[y][x] < target) {
      x++;
    //[4][1] = 21 > 20 ? true; x = 1; y = 3; 
    } else if (matrix[y][x] > target) {
      y--;
    } else {
      return true
    }
  }
  return false;
};
findNumberIn2DArray([
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], 20);
```
