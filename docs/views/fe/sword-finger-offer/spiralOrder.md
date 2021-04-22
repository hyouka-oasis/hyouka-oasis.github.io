---
title: '剑指 Offer 29. 顺时针打印矩阵'
tags:
- 剑指 Offer

categories:
- 算法

sidebar: 'auto'
date: '2021-4-22'
---

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

示例 1：
```javascript
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
```

示例 2：
```javascript
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
```
说实话第一眼看到这道题目的时候确实没啥思路于是我就画了一个草稿

```markdown
    [
                                     top = 0; right ++;
    left=0;                          [0][0],[0][1],[0][2],
    bottom=2,排除bottom2,bottom--;    [1][0],[1][1],[1][2],    right = 2, 排除top0 top自加1 top++;
                                     [2][0],[2][1],[2][2],
                               right = 2; 排除right2; right自减1 right--;
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ]
```
这样子看过以后其实思路就比较清晰了

思路，首先我们从题可以得出它是一个从左上角-右上角-右下角-左下角-往里循环直至最后一个时停止
所以
```javascript
1.首先确定好上下左右的初始值由左上-左下分别为top=0;right=array[0].length-1;bottom=array.length-1;left=0;
2.先进行从左往右的递增取到1，2，3也就是从左上0，0开始到右上0，2，对应top=0；left++；
3.从右上角开始往右下角递增取3，6，9，由于3重复所以我们需要将3给排除掉让top先自增1，然后进行top++；
4.从右下角开始往左下角递减取9，8，7，同上排除9先让right自减1；然后进行right--；
5.从左下角开始往左上角递减取7，4，1，这里有点不同，在碰到1时我们需要让他拐个弯，也就是我们需要让他从top=1重复以上操作
```

```javascript
const spiralOrder = (matrix) => {
  /*
    [
                                     top = 0; right ++;
    left=0;                          [0][0],[0][1],[0][2],
    bottom=2,排除bottom2,bottom--;   [1][0],[1][1],[1][2],    right = 2, 排除top0 top自加1 top++;
                                    [2][0],[2][1],[2][2],
                               right = 2; 排除right2; right自减1 right--;
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ]
  * */
  let left = 0,//从左到右
      top = 0, //从上到下
      right = matrix[0].length - 1,//从右到左
      bottom = matrix.length - 1,//从下到上
      x = 0; //螺旋下标
  const res = [];
  //定义一个死循环，当我们围绕完最后一个值的时候跳出死循环
  while (true) {
      //对应第二步
    for (let i = left; i <= right; i++) {
      res[x++] = matrix[top][i];
    }
    if (++top > bottom) break;
    //对应第三步
    for (let i = top; i <= bottom; i++) {
      res[x++] = matrix[i][right];
    }
    if (--right < left) break;
    //对应第四步
    for (let i = right; i >= left; i--) {
      res[x++] = matrix[bottom][i];
    }
    if (--bottom < top) break;
    //对应第五步
    for (let i = bottom; i >= top; i--) {
      res[x++] = matrix[i][left];
    }
    if(right < ++left) break;
    /*
    由测试用例可以得到当第一次循环到这结束时，top+1，right-1，bottom-1，left+1后
    四者的值分别为1，1，1，1，当我们进行第二次循环体的时候
    首先会走1<=1这一步取到1，1的值也就是最后的值，
    然后进行if判断2>1 = true;break;跳出死循环
    * */
  }
  return res;
};
spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]);
```
