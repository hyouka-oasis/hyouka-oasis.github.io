<template>
  <div class="middle-center">
    <div></div>
  </div>
</template>

<style lang="less">
//这是第一种方法不常见，将父元素改成table形式然后将子元素改成行内块
//.middle-center {
//  width: 600px;
//  height: 600px;
//  background: aquamarine;
//  display: table-cell;
//  vertical-align: middle;
//  text-align: center;
//
//  > div {
//    width: 200px;
//    height: 200px;
//    background: red;
//    display: inline-block;
//  }
//}

// 通过绝对定位加上位移

//.middle-center {
//  display: block;
//  position: relative;
//  width: 600px;
//  height: 600px;
//  background: aquamarine;
//  > div {
//    position: absolute;
//    left: 50%;
//    top: 50%;
//    transform: translate(-50%, -50%);
//  }
//}

// 通过绝对定位加上margin: auto

//.middle-center {
//  display: block;
//  position: relative;
//  width: 600px;
//  height: 600px;
//  background: aquamarine;
//
//  > div {
//    position: absolute;
//    left: 0;
//    right: 0;
//    bottom: 0;
//    top: 0;
//    margin: auto;
//    width: 200px;
//    height: 200px;
//    background: red;
//  }
//}

//通过弹性布局

.middle-center {
  display: flex;
  width: 600px;
  height: 600px;
  background: aquamarine;
  align-items: center;
  justify-content: center;
  > div {
    width: 200px;
    height: 200px;
    background: red;
  }
}
</style>
