---
title: '继🔥Vue 转 React不完全指北(俊劫)'
sidebar: 'auto' 
date: 2021-04-21
tags:
- vue和react

categories:
- 前端

---

> 和我面基(还没)的俊劫发表了一篇这样的文章，地址：[掘金](https://juejin.cn/post/6953482028188860424)
> 虽然我的个人经验没有俊劫多，但其不然我也提提我对于两者之间的看法

## 一、vue和react

作为目前前端最流行的两大框架，两者之间肯定是存在差异性的，不然两者双剑合璧得了(其实我也挺想的，毕竟现在要学的东西太多了)， 而差异性无非就体现在两个框架对于自己是怎么定义的。

### vue

[vue](https://cn.vuejs.org/) 其官网豁然开亮的几行大字，渐进式框架，灵活，易用，高效，所以在vue当中开发者只需要关注你的试图即可，通过getter，setter，不用去
特意的去优化就能够达到很好的效果，并且有一套官方维护的生态系统。

### react

[react](https://react.docschina.org/) 作为Facebook的亲儿子一样，虽然这个亲儿子是由社区维护，且其生态也是社区维护，但也很难取代他的地位。
在 [react](https://react.docschina.org/) 当中其实可以把任何的东西都看作是组件，整个页面都是由一个个组件拼接而成。

像俊劫说的vue只适合开发小中型项目，而大型项目的话只能用react来开发，其实并不然。其实就一个项目选择开发框架而言来说，
这个项目后期的维护性难度大不大，以及这个项目的可迭代问题完全取决于开发这个项目的人愿不愿意去好好写了🐶保命，虽然react在代码颗粒度上确实要比
vue来的要好，但是两者框架内部的原理其实都是大同小异的。所以说我认为并没有什么vue只能开发小中型项目，而react适合开发大型项目之类的。毕竟存在即合理🐶🐶🐶。

## 二、核心概念

核心概念就不讲了可以去看[俊劫](https://juejin.cn/post/6953482028188860424) 的掘金

## 三、组件定义

### 1、vue
    个人写vue通常使用的是jsx,所以写起来两者区别并不是很大
```javascript
//jsx 
// 父组件
const SonComponent = {
    name: 'SomComponent',
    inject: ['fatherDescription'],
    props: {
        fatherProp: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            description: 'i am son'
        }
    },
    methods: {
        buttonClick() {
            const {description} = this;
            this.$emit('sonClick', description)
        }
    },
    render() {
        const {description, buttonClick} = this;
        const {fatherProp} = this.$props;
        const {default: slots} = this.$slots;
        const {default: defaultSlot, mySlotName} = this.$scopedSlots;
        console.log(this.fatherDescription);
        return (
            <div>
                {description}
                {slots}
                {defaultSlot()}
                {mySlotName()}
                {fatherProp}
                <button onClick={buttonClick}>子组件传递信息至父组件</button>
            </div>
        )
    }
};
const ParentComponent = {
    name: 'ParentComponent',
    components: {
        SonComponent,
    },
    data() {
        return {
            description: 'i am father'
        }
    },
    //多层级组件嵌套可以用provide/inject获取到祖父级别的信息
    provide() {
        return {
            fatherDescription: this.description
        }
    },
    render() {
        const {description} = this;
        return (
            <div>
                {description}
                <son-component
                    // 默认插槽和具名插槽
                    scopedSlots={{
                        default: () => {
                            return (
                                <div>
                                    这也是默认插槽
                                </div>
                            )
                        },
                        mySlotName: () => {
                            return (
                                <div>
                                    这是具名插槽
                                </div>
                            )
                        }
                    }}
                    fatherProp={description}
                    onsonClick={(description) => {
                        console.log(description);
                    }}
                >
                    {/*  默认插槽  */}
                    <div>
                        这是插槽
                    </div>
                </son-component>
            </div>
        )
    }
};
//函数式组件

const SonComponent_1 = () => {
    return(
        <div>
            函数式组件
        </div>
    )
}

//template
// 父组件
<template>
    <div>
        {{description}}
        <son :fatherDescription="description" @sonClick="sonClick">
        <div>
            我是默认插槽
        </div>
        <div slot="mySlot">
            我是具名插槽
        </div>
    </son>
</div>
</template>

import Son from 'Son.vue';

export default {
    name: "Father",
    components: {
        //子组件
        Son,
        //或
        SonComponent: {
            name: 'SonComponent',
            data() {
                return {
                    description: 'i am son',
                }
            },
            render() {
                const {description} = this;
                return (
                    <div>
                        {description}
                    </div>
                )
            }
        }
    },
    data() {
        return {
            description: 'i am father',
        }
    },
    methods: {
        sonClick(description) {
            console.log(description);
        }
    }
}

// Son
<template>
    <div>
        {{description}}
        <button @click="buttonClick">子组件传递至父组件</button>
        {{fatherDescription}}
        <slot/>
        <slot name="mySlot"/>
    </div>
</template>

export default {
    name: "Son",
    props: {
        fatherDescription: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            description: 'i am son'
        }
    },
    methods: {
        buttonClick() {
            const {description} = this;
            this.$emit('sonClick', description);
        }
    }
}
```

vue函数式组件具体可以参考[函数式组件](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)

### 2、react
```javascript
// calss
import React from 'react';
import {Button} from 'antd';

class SonComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            description: 'i am son'
        };
    }
    clickButton() {
        console.log('点击事件');
    }
    render() {
        const {description} = this.state;
        const {clickButton} = this;
        return (
            <div>
                {description}
                <Button onClick={clickButton}>点击我</Button>
            </div>
        )
    }
}

class FatherComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            description: 'i am Father'
        };
    }
    render() {
        const {description} = this.state;
        return(
            <div>
                {description}
                <SonComponent/>
            </div>
        )
    }
}

//FunctionComponent
import React, {useState, createContext, useContext} from 'react';
import {Button} from 'antd';

const ParentContext: React.Context<{
    fatherClick?: (dispath: React.Dispatch<React.SetStateAction<string>>) => void;
}> = createContext({})

//React.FunctionComponent<props类型> = React.FC;
const SonComponent: React.FunctionComponent<{
    //子组件接受父组件参数
    fatherClick: (diapatch: React.Dispatch<React.SetStateAction<string>>) => void;
    children: React.ReactNode
}> = ({
          // fatherClick
          children
      }) => {
    const [description, changeDescription] = useState<string>('i am son');
    const {fatherClick} = useContext(ParentContext);
    const clickButton = () => {
        //通过props进行父子级通讯
        // fatherClick(changeDescription);
        //通过context进行父子级通讯
        fatherClick&&fatherClick(changeDescription);
        // changeDescription('点击事件');
    };
    return (
        <div>
            <ParentContext.Consumer>
                {
                    ({
                         fatherClick
                     }) => (
                        <>
                            {description}
                            <Button onClick={() => fatherClick&&fatherClick(changeDescription)}>点击事件</Button>
                            <Button onClick={clickButton}>点击事件</Button>
                            {children}
                        </>
                    )
                }
            </ParentContext.Consumer>

        </div>
    )
};

const FatherComponent: React.FC<{}> = () => {
    const [description] = useState<string>('i am father');
    const fatherClick = (dispatch: React.Dispatch<React.SetStateAction<string>>) => {
        //改变子组件里面的description
        dispatch('点击事件');
    }
    return (
        <div>
            <ParentContext.Provider
                value={
                    {
                        fatherClick
                    }
                }

            >
                {description}
                <SonComponent fatherClick={fatherClick}>
                    <div>
                        我是插槽
                    </div>
                </SonComponent>
            </ParentContext.Provider>
        </div>
    )
};
```
## 四、组件通讯
### vue
1.props/$emit;

2.provide/inject;

3.vuex;

4.localstorage;

5.event bus

### react

1.props

2.redux

3.context

4.event bus(库);

以上除了vuex, redux, localstorage, event bus 基本上都写了一遍

## 五、我的总体感受
* 就像[俊劫](https://juejin.cn/post/6953482028188860424) 说的一样vue更加的能上手，开箱即用并且能够灵活的配置webpack，不像react一样需要eject一下将配置文件全部抛出来，并且还是不可逆的，虽然多多少少有一些插件可以重构webpack
但还是vue直接添加一个vue.config.js来的香。
  
* 其实在我写vue和react来说其实并没有太大的区别感受，可能和我都是写jsx语法有关系吧，但是vue+ts,和react+ts，emm两者区别还是挺大的，但是没关系噢，vue3已经灰度测试了，并且引入了组件API(Composition API)，能够更好的支持ts，虽然我还没用过🐶保命，
但是我还是挺期待vue3的(尤大🐂🍺);
  
## 六、资源分享

[俊劫](https://juejin.cn/post/6953482028188860424) 直接去他掘金地址里面找吧，我反正找不到🐶🐶🐶。
