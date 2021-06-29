---
title: '深度拷贝工具类'
date: 2021-06-29
tags:
- 深度拷贝

categories:
- 前端工具类

sticky:
- 2

---

```javascript
class DeepCopy{
    /**
     * @param obj 需要拷贝的对象
     * @param to(?any) 拷贝的目标
     * @param copyEmptyValue(boolean) 是否拷贝空值
     * @param fiexd(?boolean) 是否保留小数点
     * @param replaceArray(?boolean)
     * @returns {{}}
     */
    static deepCopy(obj, to, copyEmptyValue = true, fiexd, replaceArray){
        if (!obj) return {};
        if (Array.isArray(to) && replaceArray) {
            this.deepCopy(obj, [], copyEmptyValue);
        }
        const objClone = to ? to : (Array.isArray(obj) ? [] : {});
        if (obj && typeof obj === 'object') {
            const keys = Object.keys(obj);
            let key: string;
            for (let i = 0; i < keys.length; i++) {
                key = keys[i];
                if (obj[key] && typeof obj[key] === 'object' && !(obj[key] instanceof Element)) {
                    //判断ojb子元素是否为对象，且不是 dom ，如果是，递归复制
                    objClone[key] = this.deepCopy(obj[key], objClone[key], copyEmptyValue, replaceArray);
                } else if (copyEmptyValue || (obj[key] != undefined && obj[key] != null)) {
                    objClone[key] = obj[key];
                }
            }
        }
        return objClone;
    }
}
```